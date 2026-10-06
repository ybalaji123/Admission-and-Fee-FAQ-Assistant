/**
 * Kalasalingam Academy of Research and Education (KARE / KLU)
 * Official Admission & Fee Helpdesk Assistant JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof KLU_DATA === 'undefined') {
    console.error("KLU_DATA not loaded properly.");
    return;
  }

  // App State
  const state = {
    chatHistory: [
      {
        sender: 'klu',
        text: `Welcome to **Kalasalingam Academy of Research and Education (KARE)** Admissions Inquiry Helpdesk!

I am trained on the official university admission guidelines for the **2026–2027 Academic Year**.

How can I assist you today? You can inquire about:
* 🎓 **Academic Programs** (B.Tech, B.Arch, Law, Allied Health, Agriculture, BBA/BCA, MBA, MCA, M.Tech, Ph.D)
* 💰 **Tuition Fees & 15+ Scholarship Slabs** (Up to 100% Fee Waivers for JEE rankers & 80%+ PCM scorers)
* 🏠 **Hostel Accommodation & Mess Charges** (2/4/5-Bedded Rooms)
* 📝 **Entrance Examinations** (KUEE, JEE Main, NATA, CLAT, GATE)
* 📞 **Admission Office Contact & Campus Visit Information**`,
        time: getCurrentTime()
      }
    ],
    isListening: false
  };

  // DOM Elements
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const micBtn = document.getElementById('micBtn');
  const clearBtn = document.getElementById('clearBtn');
  const exportBtn = document.getElementById('exportBtn');

  // Setup Navigation Tabs
  setupTabs();

  // Render Initial Chat Messages
  renderChat();

  // Event Listeners
  if (sendBtn) sendBtn.addEventListener('click', handleUserQuery);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserQuery();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.chatHistory = [state.chatHistory[0]];
      renderChat();
    });
  }

  if (exportBtn) exportBtn.addEventListener('click', exportChatHistory);
  if (micBtn) micBtn.addEventListener('click', toggleVoiceInput);

  // Quick Topic Buttons
  document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const promptText = btn.getAttribute('data-prompt') || btn.innerText;
      chatInput.value = promptText;
      handleUserQuery();
    });
  });

  // Setup Calculators & Catalog
  setupCalculator();
  setupCourseDirectory();
  renderFaqAccordion();

  // Helper: Format Current Time
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Navigation Tabs Setup
  function setupTabs() {
    const tabButtons = document.querySelectorAll('.nav-tab-item button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
  }

  // Handle Chat Input
  function handleUserQuery() {
    const query = chatInput.value.trim();
    if (!query) return;

    // Add user message to history
    state.chatHistory.push({
      sender: 'user',
      text: query,
      time: getCurrentTime()
    });

    chatInput.value = '';
    renderChat();

    // Show indicator
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const botResponse = computeUniversityResponse(query);
      state.chatHistory.push({
        sender: 'klu',
        text: botResponse,
        time: getCurrentTime()
      });
      renderChat();
    }, 400);
  }

  function renderChat() {
    if (!chatBody) return;
    chatBody.innerHTML = '';

    state.chatHistory.forEach(msg => {
      const wrapper = document.createElement('div');
      wrapper.className = `msg-wrapper ${msg.sender === 'user' ? 'user' : 'klu'}`;

      const avatar = document.createElement('div');
      avatar.className = 'msg-avatar-klu';
      avatar.innerText = msg.sender === 'user' ? 'YOU' : 'KARE';

      const content = document.createElement('div');
      content.className = 'msg-content';
      content.innerHTML = formatMarkdownText(msg.text);

      const timeStamp = document.createElement('span');
      timeStamp.className = 'msg-timestamp';
      timeStamp.innerText = msg.time;
      content.appendChild(timeStamp);

      wrapper.appendChild(avatar);
      wrapper.appendChild(content);

      chatBody.appendChild(wrapper);
    });

    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'typingIndicator';
    indicator.className = 'msg-wrapper klu';
    indicator.innerHTML = `
      <div class="msg-avatar-klu">KARE</div>
      <div class="msg-content" style="padding:10px 14px; font-size:13px; color:var(--text-muted);">
        Checking official Kalasalingam University records...
      </div>
    `;
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTypingIndicator() {
    const ind = document.getElementById('typingIndicator');
    if (ind) ind.remove();
  }

  function formatMarkdownText(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:var(--klu-crimson); font-weight:700;">$1</a>')
      .replace(/\n\* (.*)/g, '<br>• $1')
      .replace(/\n/g, '<br>');
  }

  // UNIVERSITY RESPONSE ENGINE
  function computeUniversityResponse(userQuery) {
    const q = userQuery.toLowerCase();

    // Fees & Tuition queries
    if (q.includes('fee') || q.includes('cost') || q.includes('tuition') || q.includes('how much') || q.includes('charge')) {
      if (q.includes('btech') || q.includes('b.tech') || q.includes('cse') || q.includes('engineering')) {
        return `💰 **Kalasalingam University B.Tech Fee Structure (2026–2027)**:

* **B.Tech CSE / AI & DS / Cyber Security**: Base Tuition Fee = **₹1,95,000 / year**
* **B.Tech ECE & Bio-stream (Biotech/Food Tech)**: Base Tuition Fee = **₹1,60,000 / year**
* **B.Tech Mechanical / Civil / EEE**: Base Tuition Fee = **₹1,50,000 / year**
* **Soft Skills & Library (Misc Fees)**: **₹12,000 / year**

🎁 **Tuition Fee Scholarships**:
* **95%+ in 10+2 PCM**: Fee reduced to **₹1,50,000 / year**!
* **80%–89.9% in 10+2 PCM**: Fee reduced to **₹1,00,000 / year**!
* **JEE Main Rank 1–25,000**: **100% Tuition Fee Waiver!**

👉 Check our **Fee & Scholarship Calculator** tab to generate an exact fee estimate for your score!`;
      }

      if (q.includes('hostel') || q.includes('mess') || q.includes('room') || q.includes('stay')) {
        return `🏠 **Hostel Accommodations & Mess Charges**:

KARE provides separate, secure hostels for boys and girls with modern civic amenities:
* **5-Bedded Room (Non-AC)**: **₹95,000 / year** (Mess Included)
* **4-Bedded Room (Non-AC)**: **₹1,10,000 / year** (Mess Included)
* **2-Bedded Room (Non-AC)**: **₹1,25,000 / year** (Mess Included)
* **2-Bedded Room (Air-Conditioned)**: **₹1,45,000 / year** (Mess Included)

*Note: Hostel rooms fill up quickly and are allotted on a strictly First-Come, First-Served basis upon seat reservation.*`;
      }

      if (q.includes('law') || q.includes('llb')) {
        return `⚖️ **Law Programs Fee Structure**:
* **B.A. L.L.B. (Hons) / B.Com L.L.B. (Hons) (5 Years)**: ₹1,20,000 / year + ₹12,000 Misc Fee.
* **L.L.B. (Hons) (3 Years)**: ₹1,00,000 / year + ₹12,000 Misc Fee.`;
      }

      if (q.includes('mba') || q.includes('mca') || q.includes('mtech') || q.includes('m.tech') || q.includes('pg')) {
        return `🎓 **Postgraduate (PG) Fee Structure**:
* **MBA**: ₹1,50,000 / year (+ ₹12,000 Misc Fee)
* **MCA**: ₹1,00,000 / year (+ ₹12,000 Misc Fee)
* **M.Tech**: ₹90,000 / year (+ ₹12,000 Misc Fee) *(GATE Qualified candidates receive ₹12,500/month stipend!)*
* **M.Sc (Data Science / CS / Physics / Chemistry)**: ₹45,000 / year (+ ₹5,000 Misc Fee)`;
      }

      return `💰 **KARE Fee Structure Summary (2026–2027)**:

* **UG Engineering (B.Tech)**: ₹1,50,000 to ₹1,95,000 / year (before scholarship)
* **B.Arch**: ₹1,75,000 / year
* **B.Sc Allied Health Sciences**: ₹1,10,000 / year
* **B.Sc Agriculture / Horticulture**: ₹1,40,000 / year
* **BBA / BCA**: ₹75,000 / year
* **B.Com / B.Sc Arts & Science**: ₹60,000 to ₹65,000 / year
* **Application Fee**: ₹600 (Resident Indian) / $50 USD (NRI/Foreign)`;
    }

    // Scholarship queries
    if (q.includes('scholarship') || q.includes('stipend') || q.includes('waiver') || q.includes('discount') || q.includes('jee')) {
      return `🎁 **Kalasalingam University Scholarship Schemes (2026–2027)**:

KARE offers **15+ Scholarship Categories** to reward academic and extra-curricular excellence:

1. 🏆 **JEE Main Rank 1–25,000**: **100% Tuition Fee Waiver** for 4 years!
2. 🥇 **JEE Main Rank 25,001–50,000**: **75% Tuition Fee Waiver**.
3. 🥇 **10+2 PCM 95%+**: Tuition Fee capped at **₹1,50,000 / year**.
4. 🥈 **10+2 PCM 80%–89.9%**: Tuition Fee capped at **₹1,00,000 / year**.
5. ⚽ **Sports Excellence**: 50% to 100% Tuition Waiver + Free Hostel for State/National level players.
6. 🎓 **GATE Qualified (M.Tech)**: **₹12,500 / month Stipend** awarded via AICTE / KARE.
7. 📜 **Polytechnic Lateral Entry**: Concessions up to 50% for 75%+ diploma marks.`;
    }

    // Eligibility queries
    if (q.includes('eligibility') || q.includes('criteria') || q.includes('qualification') || q.includes('requirements')) {
      if (q.includes('btech') || q.includes('b.tech') || q.includes('engineering')) {
        return `📋 **B.Tech Admissions Eligibility**:
* Pass in Higher Secondary (10+2 / Intermediate / State Board / CBSE / NIOS).
* Minimum **50% aggregate** in Physics, Chemistry, and Mathematics (PCM).
* For Bio-Stream (Biotech / Food Tech): BPC (Biology) students eligible if Maths was not studied.
* Lateral Entry: 60% average in pre-final and final semesters of 3-year Polytechnic Diploma.`;
      }

      if (q.includes('bca') || q.includes('computer application')) {
        return `📋 **BCA Admissions Eligibility**:
* Pass in 10+2 / 12th standard with minimum 50% aggregate marks.
* **Mathematics** is a compulsory subject in 10+2.`;
      }

      return `📋 **General Admissions Eligibility Overview**:
* **UG Engineering / Sciences / Law**: 10+2 pass with min 50% aggregate in relevant stream.
* **PG Degree (MBA, MCA, M.Tech, M.Sc)**: Bachelor's degree with 50%–60% aggregate.
* **Ph.D**: Master's degree with minimum 55% marks.`;
    }

    // Entrance Exams
    if (q.includes('entrance') || q.includes('exam') || q.includes('keee') || q.includes('kuee') || q.includes('nata') || q.includes('clat')) {
      return `📝 **Entrance Examinations Accepted**:

* **KUEE / KEEE**: Kalasalingam University Engineering Entrance Exam for B.Tech & M.Tech admissions.
* **JEE Main**: Valid score accepted for direct entry & up to 100% scholarships!
* **NATA**: Mandatory for B.Arch degree.
* **CLAT / KLSAT**: For 5-Year Integrated BA LLB / B.Com LLB and 3-Year LLB.
* **GATE**: Mandatory for M.Tech ₹12,500/mo stipend.
* **CAT / MAT / TANCET**: Accepted for MBA.`;
    }

    // How to Apply
    if (q.includes('apply') || q.includes('application') || q.includes('register') || q.includes('process') || q.includes('link')) {
      return `🚀 **Official Step-by-Step Application Guide (2026–2027)**:

1. Visit the online application portal: [apply.kalasalingam.ac.in](https://apply.kalasalingam.ac.in/)
2. Register with your Mobile Number and Email ID.
3. Select your desired program and fill in your academic details.
4. Upload scanned 10+2 / UG marksheets and identity proof.
5. Pay Application Fee of **₹600** (Resident Indian) or **$50 USD** (NRI/Foreign).
6. Book your entrance exam slot or upload national entrance scorecards (JEE/NATA/GATE/CLAT).

Admissions Helpdesk Helpline: **+91 7397760760** / **04563 289042**.`;
    }

    // Contact Information
    if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('location') || q.includes('where')) {
      return `📞 **KARE Admission Desk Contact Information**:

📍 **Address**: 
Kalasalingam Academy of Research and Education (KARE),
Anand Nagar, Krishnankoil-626126, Srivilliputtur (via), Tamil Nadu, India.

📱 **Helpline Numbers**:
* **+91 7397760760**
* **04563 289042**

📧 **Email**: admission@klu.ac.in / coe@klu.ac.in
⏰ **Working Hours**: 9:00 AM to 5:00 PM (Monday to Saturday)
🌐 **Official Portal**: [www.kalasalingam.ac.in/admissions/](https://www.kalasalingam.ac.in/admissions/)`;
    }

    // Default Fallback
    return `ℹ️ **KARE Admissions Helpdesk Info**:

Thank you for your query regarding "**${userQuery}**".

* **Admissions 2026–2027**: Applications are currently OPEN. You can apply online at [apply.kalasalingam.ac.in](https://apply.kalasalingam.ac.in/).
* **Engineering & Degree Programs**: Tuition fees start from ₹60,000/yr up to ₹1,95,000/yr with generous merit scholarships.
* **Hostel Accommodation**: 2/4/5-bedded rooms available from ₹95,000/yr (mess included).

For personalized counseling, please call our Admission Office at **+91 7397760760** or **04563 289042**.`;
  }

  // Voice Input Logic
  function toggleVoiceInput() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.interimResults = false;

    if (!state.isListening) {
      recognition.start();
      state.isListening = true;
      micBtn.style.background = '#DC3545';
      micBtn.style.color = '#FFFFFF';

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        chatInput.value = transcript;
        stopListening();
        handleUserQuery();
      };

      recognition.onerror = () => stopListening();
      recognition.onend = () => stopListening();
    } else {
      stopListening();
    }

    function stopListening() {
      state.isListening = false;
      micBtn.style.background = '#E9ECEF';
      micBtn.style.color = '';
    }
  }

  // Export History
  function exportChatHistory() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.chatHistory, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `KARE_Admission_Inquiry_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  }

  // FEE CALCULATOR
  function setupCalculator() {
    const calcProgram = document.getElementById('calcProgram');
    const calcMarks = document.getElementById('calcMarks');
    const calcMarksVal = document.getElementById('calcMarksVal');
    const calcJee = document.getElementById('calcJee');
    const calcHostel = document.getElementById('calcHostel');

    if (!calcProgram) return;

    // Populate Program options
    calcProgram.innerHTML = KLU_DATA.programs.map(p => 
      `<option value="${p.code}">${p.name} (Base Tuition: ₹${p.baseFeePerYear.toLocaleString()}/yr)</option>`
    ).join('');

    calcProgram.addEventListener('change', updateFeeResult);
    calcMarks.addEventListener('input', () => {
      calcMarksVal.innerText = `${calcMarks.value}%`;
      updateFeeResult();
    });
    calcJee.addEventListener('input', updateFeeResult);
    calcHostel.addEventListener('change', updateFeeResult);

    updateFeeResult();

    function updateFeeResult() {
      const selectedCode = calcProgram.value;
      const prog = KLU_DATA.programs.find(p => p.code === selectedCode) || KLU_DATA.programs[0];
      const marks = parseFloat(calcMarks.value) || 0;
      const jeeRank = parseInt(calcJee.value) || 0;
      const hostelType = calcHostel.value;

      let baseTuition = prog.baseFeePerYear;
      let miscFee = prog.miscFeePerYear;
      let scholarshipText = "No Merit Slab Applied";
      let netTuition = baseTuition;

      if (prog.category.includes('Engineering') || prog.code.startsWith('btech')) {
        if (jeeRank > 0 && jeeRank <= 25000) {
          scholarshipText = "CAT-01: JEE Main Top Rank (1-25k) - 100% Waiver";
          netTuition = 0;
        } else if (jeeRank > 25000 && jeeRank <= 50000) {
          scholarshipText = "CAT-02: JEE Main Rank (25k-50k) - 75% Waiver";
          netTuition = baseTuition * 0.25;
        } else if (marks >= 95) {
          scholarshipText = "CAT-03: PCM 95%+ Merit Slab (Fee capped at ₹1,50,000)";
          netTuition = 150000;
        } else if (marks >= 90) {
          scholarshipText = "CAT-04: PCM 90-94.9% Merit Slab (Fee capped at ₹1,50,000)";
          netTuition = 150000;
        } else if (marks >= 80) {
          scholarshipText = "CAT-05: PCM 80-89.9% Merit Slab (Fee capped at ₹1,00,000)";
          netTuition = 100000;
        }
      } else if (prog.level === "Postgraduate" && marks >= 80) {
        scholarshipText = "CAT-09: PG Merit Concession (25% Waiver)";
        netTuition = baseTuition * 0.75;
      }

      let hostelFee = 0;
      if (hostelType === '5bed') hostelFee = 95000;
      else if (hostelType === '4bed') hostelFee = 110000;
      else if (hostelType === '2bed') hostelFee = 125000;
      else if (hostelType === '2bed-ac') hostelFee = 145000;

      const totalAnnual = netTuition + miscFee + hostelFee;

      document.getElementById('resBaseFee').innerText = `₹${baseTuition.toLocaleString()}`;
      document.getElementById('resScholarship').innerText = scholarshipText;
      document.getElementById('resNetTuition').innerText = `₹${netTuition.toLocaleString()}`;
      document.getElementById('resMiscFee').innerText = `₹${miscFee.toLocaleString()}`;
      document.getElementById('resHostelFee').innerText = hostelFee > 0 ? `₹${hostelFee.toLocaleString()}` : "Day Scholar";
      document.getElementById('resTotalFee').innerText = `₹${totalAnnual.toLocaleString()} / year`;
    }
  }

  // COURSE DIRECTORY
  function setupCourseDirectory() {
    const courseSearchInput = document.getElementById('courseSearchInput');
    const levelFilter = document.getElementById('levelFilter');
    const coursesGrid = document.getElementById('coursesGrid');

    if (!coursesGrid) return;

    function renderCatalog() {
      const q = (courseSearchInput.value || '').toLowerCase();
      const level = levelFilter.value;

      const filtered = KLU_DATA.programs.filter(p => {
        const matchesQ = p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.eligibility.toLowerCase().includes(q);
        const matchesLevel = level === 'all' || p.level.toLowerCase() === level.toLowerCase();
        return matchesQ && matchesLevel;
      });

      if (filtered.length === 0) {
        coursesGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:30px; color:var(--text-muted);">No academic programs matching your query. Please try searching another term.</div>`;
        return;
      }

      coursesGrid.innerHTML = filtered.map(p => `
        <div class="university-course-card">
          <div class="course-card-head">${p.name}</div>
          <div class="course-badge-list">
            <span class="badge-tag badge-tag-gold">${p.level}</span>
            <span class="badge-tag">${p.duration}</span>
            <span class="badge-tag">${p.category}</span>
          </div>
          <div style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;">
            <strong>Eligibility:</strong> ${p.eligibility}<br><br>
            <strong>Entrance Exam:</strong> ${p.entrance}<br>
            <strong>Base Tuition Fee:</strong> ₹${p.baseFeePerYear.toLocaleString()} / year (+ ₹${p.miscFeePerYear.toLocaleString()} misc)
          </div>
          <div style="margin-top:15px; display:flex; justify-content:space-between; align-items:center;">
            <a href="${KLU_DATA.university.applyUrl}" target="_blank" style="background:var(--klu-navy); color:#fff; padding:6px 12px; border-radius:4px; text-decoration:none; font-size:12px; font-weight:700;">Apply Online</a>
            <span style="font-size:11px; color:var(--text-muted);">${p.highlights}</span>
          </div>
        </div>
      `).join('');
    }

    if (courseSearchInput) courseSearchInput.addEventListener('input', renderCatalog);
    if (levelFilter) levelFilter.addEventListener('change', renderCatalog);
    renderCatalog();
  }

  // FAQ ACCORDION
  function renderFaqAccordion() {
    const faqContainer = document.getElementById('faqListContainer');
    if (!faqContainer) return;

    faqContainer.innerHTML = KLU_DATA.faqs.map(faq => `
      <div class="accordion-item" id="faq-${faq.id}">
        <div class="accordion-header">
          <span>${faq.question}</span>
          <span style="font-size:11px; background:#E9ECEF; padding:2px 6px; border-radius:3px;">${faq.category}</span>
        </div>
        <div class="accordion-body">
          ${formatMarkdownText(faq.answer)}
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
      });
    });
  }

});
