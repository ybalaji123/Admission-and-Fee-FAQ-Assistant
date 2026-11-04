const chatForm = document.querySelector('#chatForm');
const messageInput = document.querySelector('#messageInput');
const messages = document.querySelector('#messages');
const sendButton = document.querySelector('#sendButton');
const statusText = document.querySelector('#statusText');
const clearButton = document.querySelector('#clearButton');

const history = [];
let busy = false;

function scrollToLatest() {
  messages.scrollTop = messages.scrollHeight;
}

function appendInlineText(parent, text) {
  const pattern = /\*\*([^*]+)\*\*/g;
  let cursor = 0;
  let match;
  while ((match = pattern.exec(text)) !== null) {
    parent.append(document.createTextNode(text.slice(cursor, match.index)));
    const strong = document.createElement('strong');
    strong.textContent = match[1];
    parent.append(strong);
    cursor = pattern.lastIndex;
  }
  parent.append(document.createTextNode(text.slice(cursor)));
}

function tableCells(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((cell) => cell.replace(/\\\|/g, '|').trim());
}

function isTableSeparator(line) {
  const cells = tableCells(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function appendTable(parent, lines, start) {
  const wrapper = document.createElement('div');
  wrapper.className = 'answer-table-wrap';
  const table = document.createElement('table');
  table.className = 'answer-table';
  const headers = tableCells(lines[start]);
  const head = document.createElement('thead');
  const headRow = document.createElement('tr');
  headers.forEach((label) => {
    const cell = document.createElement('th');
    appendInlineText(cell, label);
    headRow.append(cell);
  });
  head.append(headRow);
  table.append(head);

  const body = document.createElement('tbody');
  let index = start + 2;
  while (index < lines.length && lines[index].includes('|') && lines[index].trim()) {
    const values = tableCells(lines[index]);
    const row = document.createElement('tr');
    headers.forEach((_, column) => {
      const cell = document.createElement('td');
      appendInlineText(cell, values[column] || '');
      row.append(cell);
    });
    body.append(row);
    index += 1;
  }
  table.append(body);
  wrapper.append(table);
  parent.append(wrapper);
  return index;
}

function renderAnswer(container, content) {
  const lines = String(content).replace(/\r\n?/g, '\n').split('\n');
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }

    if (line.includes('|') && lines[index + 1] && isTableSeparator(lines[index + 1])) {
      index = appendTable(container, lines, index);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const element = document.createElement(heading[1].length === 1 ? 'h3' : 'h4');
      appendInlineText(element, heading[2]);
      container.append(element);
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const list = document.createElement('ul');
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        const item = document.createElement('li');
        appendInlineText(item, lines[index].replace(/^\s*[-*]\s+/, '').trim());
        list.append(item);
        index += 1;
      }
      container.append(list);
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !/^#{1,3}\s+/.test(lines[index].trim()) &&
      !(lines[index].includes('|') && lines[index + 1] && isTableSeparator(lines[index + 1]))) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    const paragraph = document.createElement('p');
    appendInlineText(paragraph, paragraphLines.join(' '));
    container.append(paragraph);
  }
}

function addMessage(role, content, sources = [], isTyping = false) {
  const article = document.createElement('article');
  article.className = `message ${role === 'user' ? 'user-message' : 'assistant-message'}${isTyping ? ' typing' : ''}`;

  if (role !== 'user') {
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    const logo = document.createElement('img');
    logo.src = '/static/klu-logo.png';
    logo.alt = '';
    avatar.append(logo);
    article.append(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = 'message-content';
  if (role === 'assistant' && !isTyping) {
    renderAnswer(bubble, content);
  } else {
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    bubble.append(paragraph);
  }

  if (sources.length) {
    const sourceLine = document.createElement('div');
    sourceLine.className = 'sources';
    const uniqueSheets = [...new Set(sources.map((source) => source.sheet).filter(Boolean))];
    sourceLine.textContent = `From KLU workbook: ${uniqueSheets.join(', ')}`;
    bubble.append(sourceLine);
  }

  article.append(bubble);
  messages.append(article);
  scrollToLatest();
  return article;
}

async function ask(question) {
  const message = question.trim();
  if (!message || busy) return;

  busy = true;
  sendButton.disabled = true;
  messageInput.disabled = true;
  addMessage('user', message);
  const pending = addMessage('assistant', 'Looking through the KLU information…', [], true);
  const context = history.slice(-8);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: context }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.detail || 'The assistant could not answer right now.');

    pending.remove();
    addMessage('assistant', payload.answer, payload.sources || []);
    history.push({ role: 'user', content: message }, { role: 'assistant', content: payload.answer });
  } catch (error) {
    pending.remove();
    addMessage('assistant', error.message || 'I could not connect to the assistant. Please try again.');
  } finally {
    busy = false;
    sendButton.disabled = false;
    messageInput.disabled = false;
    messageInput.focus();
  }
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = messageInput.value;
  messageInput.value = '';
  messageInput.style.height = 'auto';
  ask(question);
});

messageInput.addEventListener('input', () => {
  messageInput.style.height = 'auto';
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 120)}px`;
});

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

document.querySelectorAll('[data-question]').forEach((button) => {
  button.addEventListener('click', () => ask(button.dataset.question || ''));
});

clearButton.addEventListener('click', () => {
  if (busy) return;
  history.length = 0;
  messages.replaceChildren();
  addMessage('assistant', 'Hi! I can help you explore KLU admissions. What would you like to know?');
});

fetch('/api/health')
  .then((response) => response.json())
  .then((state) => {
    statusText.textContent = state.ready ? 'Ready to help' : 'Setup needed';
    if (!state.ready) statusText.title = state.message;
  })
  .catch(() => { statusText.textContent = 'Currently unavailable'; });
