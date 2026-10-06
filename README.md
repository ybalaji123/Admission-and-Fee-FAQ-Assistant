# 🎓 Kalasalingam University (KARE) - Admission & Fee GenAI Assistant

An AI-powered Admission and Fee FAQ Assistant designed for students willing to learn about **Kalasalingam Academy of Research and Education (Deemed to be University)**.

---

## 🌟 Key Features

1. **🤖 GenAI Chat Assistant**:
   - Natural language search and AI intent reasoning.
   - Handles queries on B.Tech, Law, Allied Health, Agriculture, PG programs, entrance exams, fees, scholarships, and hostels.
   - Quick prompt pills, voice query (speech-to-text), clear conversation, and JSON/Summary chat export.

2. **🧮 Interactive Fee & Scholarship Calculator**:
   - Compute exact tuition fees after scholarship waivers based on 10+2 PCM/PCB percentage, JEE Main rank, or PG CGPA.
   - Select hostel room types (2-bedded AC/non-AC, 4-bedded, 5-bedded) to get the total annual fee breakdown.

3. **🎓 Course & Eligibility Finder**:
   - Filter programs by stream (MPC, BPC, Commerce, Arts) and academic level (UG, PG, Ph.D).
   - View course duration, eligibility criteria, entrance exam requirements, and direct application links.

4. **📌 FAQ Explorer**:
   - Accordion view of doubts on application procedure, KUEE/NATA/CLAT/GATE entrance tests, hostelling amenities, and contact info.

5. **📱 Dual Interface Support**:
   - **Modern Web App Interface**: Built with HTML5, CSS3 (Glassmorphism & Dark/Light themes), and JavaScript (`index.html`).
   - **Streamlit Python Application**: Interactive python web app (`app_streamlit.py`).

---

## 📂 Project Structure

```
GenAI_project/
├── index.html          # Main Web Interface (HTML5)
├── styles.css          # Custom Glassmorphic Dark/Light CSS Theme
├── app.js              # Client-Side AI Reasoning Engine & Event Handlers
├── klu_kb_data.js      # Structured KLU Admission Knowledge Base (2026-2027)
├── app_streamlit.py    # Python Streamlit Web Application
├── server.py           # Python Flask REST API & Web Server
└── README.md           # Documentation
```

---

## 🚀 How to Run the Project

### Option 1: Direct Web Interface (No Server Required)
Simply double click or open `index.html` in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Run via Flask Server (Python)
```bash
python server.py
```
Open your browser and navigate to `http://localhost:5000`.

### Option 3: Run via Streamlit (Python)
```bash
python -m streamlit run app_streamlit.py
```
Open the Streamlit URL provided in the terminal output (typically `http://localhost:8501`).

---

## 📞 Admissions Desk Info

- **University**: Kalasalingam Academy of Research and Education (KARE)
- **Location**: Anand Nagar, Krishnankoil-626126, Tamil Nadu, India
- **Helpline**: +91 7397760760 / 04563 289042
- **Email**: `admission@klu.ac.in` / `coe@klu.ac.in`
- **Application Portal**: [apply.kalasalingam.ac.in](https://apply.kalasalingam.ac.in/)
- **Data Source**: [https://www.kalasalingam.ac.in/admissions/](https://www.kalasalingam.ac.in/admissions/)
