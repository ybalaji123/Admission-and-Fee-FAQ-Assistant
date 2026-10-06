"""
Kalasalingam Academy of Research and Education (KARE / KLU)
GenAI Admission and Fee FAQ Assistant - Flask REST API & Web Server
Run using: python server.py
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json

app = Flask(__name__, static_folder='.')
CORS(app)

# Load Knowledge Base Data
def load_kb_data():
    kb_path = os.path.join(os.path.dirname(__file__), 'klu_kb_data.js')
    try:
        with open(kb_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract JSON portion from JS file
            json_str = content.split('const KLU_DATA =')[1].split('if (typeof module')[0].strip().rstrip(';')
            return json.loads(json_str)
    except Exception as e:
        print(f"Error loading KLU_DATA: {e}")
        return {}

KLU_DATA = load_kb_data()

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/info', methods=['GET'])
def get_info():
    return jsonify(KLU_DATA.get('university', {}))

@app.route('/api/programs', methods=['GET'])
def get_programs():
    return jsonify(KLU_DATA.get('programs', []))

@app.route('/api/faqs', methods=['GET'])
def get_faqs():
    return jsonify(KLU_DATA.get('faqs', []))

@app.route('/api/ask', methods=['POST'])
def ask_ai():
    data = request.json or {}
    query = data.get('query', '').lower()

    if not query:
        return jsonify({"answer": "Please enter a valid admission query."})

    # Rule-based intent matching & fallback
    if "fee" in query or "tuition" in query or "cost" in query:
        answer = "💰 **KLU Fee Details**: B.Tech CSE: ₹1,95,000/yr, ECE/Biotech: ₹1,60,000/yr, Mech/Civil: ₹1,50,000/yr. Misc Fee: ₹12,000/yr. Hostel: ₹95,000 to ₹1,45,000/yr."
    elif "scholarship" in query or "waiver" in query or "jee" in query:
        answer = "🎁 **Scholarships**: 100% Tuition waiver for JEE Ranks 1-25k; 75% for 25k-50k; PCM 95%+ fee capped at ₹1,50,000/yr; PCM 80-89.9% fee capped at ₹1,00,000/yr; GATE M.Tech stipend ₹12,500/mo."
    elif "eligibility" in query or "criteria" in query:
        answer = "📋 **Eligibility**: B.Tech needs 50% in 10+2 PCM/PCB. B.Arch needs 50% in PCM + NATA score. Law needs 50% + CLAT/KLSAT. MCA needs 60% in degree with Maths."
    elif "contact" in query or "phone" in query or "email" in query:
        answer = "📞 **Contact Admissions**: Mobile +91 7397760760 / 04563 289042 | Email: admission@klu.ac.in | Address: Anand Nagar, Krishnankoil-626126, Tamil Nadu."
    else:
        answer = f"🤖 **GenAI Response**: Thank you for your question regarding '{query}'. Kalasalingam University admissions for 2026-2027 are OPEN. Visit https://apply.kalasalingam.ac.in/ or call +91 7397760760 for direct counselling."

    return jsonify({"answer": answer})

if __name__ == '__main__':
    print("🚀 Starting Kalasalingam University GenAI Admission Server on http://localhost:5000 ...")
    app.run(host='0.0.0.0', port=5000, debug=True)
