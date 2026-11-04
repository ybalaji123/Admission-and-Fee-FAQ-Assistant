# KLU Admission and Fee Assistance

A student-facing chatbot for Kalasalingam Academy of Research and Education (KLU/KARE). The frontend is built with HTML, CSS, and JavaScript. FastAPI serves the page and API. Gemini and ChromaDB power the answers.

## How a chat answer is made

The project uses **RAG**, short for retrieval-augmented generation. It looks up relevant college information first, then asks Gemini to write an answer from that information.

1. **Read the source data.** The backend opens `data/KLU_Admission_Data.xlsx` and reads every sheet.
2. **Make chunks.** Each non-empty spreadsheet row becomes one chunk: a small, labeled piece of information. For example, a hostel row keeps its room type, annual fee, deposit, and amenities together. This workbook is already organized into short records, so the project does not split rows into arbitrary word or token lengths.
3. **Create embeddings.** Gemini turns each chunk into a list of numbers called an embedding. Text with related meaning tends to have embeddings that are close together.
4. **Save and search with ChromaDB.** ChromaDB stores each embedding with its original text and source metadata, such as sheet name and row number. The local persistent database is stored in `data/chroma_db/`.
5. **Retrieve matching chunks.** The student's question is embedded with Gemini too. ChromaDB compares it with stored vectors using cosine distance and returns up to five close matches. Lower cosine distance means a closer match; weak matches are filtered out.
6. **Generate a grounded answer.** The backend sends the question, recent conversation, and retrieved chunks to Gemini. Gemini is instructed to answer from the workbook, format comparable details as tables, and say when the workbook does not contain enough information.

In one line:

```text
Excel rows → chunks → Gemini embeddings → ChromaDB search → Gemini answer
```

### What does “chunk” mean here?

A chunk is the unit that gets embedded and searched. In this project, one Excel data row is one chunk, labeled with its sheet name and column names. Row-based chunks are a good fit because the workbook already keeps each program, FAQ, scholarship, and hostel option in a separate row. It also makes it easy to tell where a retrieved fact came from.

### Why use ChromaDB?

ChromaDB is the local vector database. It saves vectors between launches, searches them by meaning, and returns the matching text plus its metadata. The app uses one collection named `klu_admissions` and cosine distance for ranking.

## Code map

```text
frontend/
  index.html                 Chatbot page
  styles.css                 Page layout and typography
  app.js                     Chat input, API calls, and formatted answers
  klu-banner.png             Full university wordmark for the page header
  klu-logo.png               Crest shown beside chat messages

backend/
  main.py                    FastAPI routes and startup setup
  rag.py                     Workbook chunks, embeddings, retrieval, and answers

data/
  KLU_Admission_Data.xlsx    College information used by the chatbot
  chroma_db/                 Generated, persistent ChromaDB index

model_performing/
  index_workbook.py          Optional command to build/resume the index manually
```

`backend/main.py` serves the page at `/`, reports readiness at `/api/health`, and accepts questions at `/api/chat`. On startup it prepares the vector index before chat requests are handled. `backend/rag.py` contains the RAG steps described above. `model_performing/index_workbook.py` runs the same indexing step manually; it is not required for normal use.

## Run locally

Use Python 3.10 or newer. From the project root:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Add the Gemini key to the root `.env` file. Keep the key private; it is read by the backend and is never sent to the browser.

```env
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-3.5-flash-lite
GEMINI_EMBEDDING_MODEL=gemini-embedding-001
```

Start the app:

```powershell
uvicorn backend.main:app --reload
```

Open <http://127.0.0.1:8000>. On the first start, the workbook is embedded and saved in `data/chroma_db/`. Later starts reuse the index unless the workbook changes. If Gemini reports an embedding rate limit, indexing waits for the retry time and can resume missing rows on the next launch.

## Review questions to prepare for

- **What is RAG?** Retrieve relevant facts from a knowledge source, then use a language model to write an answer grounded in those facts.
- **What is an embedding?** A list of numbers that represents the meaning of a piece of text, so similar questions and facts can be matched.
- **What is a chunk in this project?** One non-empty row from the Excel workbook, with its column labels and source sheet attached.
- **What does ChromaDB do?** Saves the chunks' embeddings and searches for the closest matches to a student's question.
- **How does the answer stay traceable?** Each retrieved chunk includes its sheet and row metadata, which the API returns as sources.

## Workbook sheets

The Excel file contains university details, programs, scholarships, hostel options, FAQs, and Q&A training pairs. The index includes rows from all sheets.
