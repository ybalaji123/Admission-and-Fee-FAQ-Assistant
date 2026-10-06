"""
Kalasalingam Academy of Research and Education (KARE / KLU)
GenAI Admission and Fee FAQ Assistant - Streamlit Application
Run using: streamlit run app_streamlit.py
"""

import streamlit as st
import json
import time

st.set_page_config(
    page_title="KLU Admission & Fee GenAI Assistant",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for Sleek University Styling
st.markdown("""
<style>
    .main-title {
        font-family: 'Outfit', sans-serif;
        font-size: 2.2rem;
        font-weight: 800;
        color: #60A5FA;
        margin-bottom: 0px;
    }
    .sub-title {
        color: #94A3B8;
        font-size: 1.0rem;
        margin-bottom: 20px;
    }
    .stChatMessage {
        border-radius: 12px;
    }
    .metric-card {
        background-color: #0F172A;
        border: 1px solid rgba(255,255,255,0.1);
        padding: 15px;
        border-radius: 10px;
        text-align: center;
    }
</style>
""", unsafe_allow_html=True)

# KLU Data Knowledge Base
KLU_DATA = {
    "university": "Kalasalingam Academy of Research and Education (KARE)",
    "accreditation": "NAAC A++ Grade | NIRF Ranked | AICTE & UGC Approved",
    "location": "Anand Nagar, Krishnankoil-626126, Tamil Nadu, India",
    "contact": "+91 7397760760 / 04563 289042 | admission@klu.ac.in",
    "apply_link": "https://apply.kalasalingam.ac.in/"
}

# FAQ Knowledge Base Dictionary
FAQ_KNOWLEDGE_BASE = {
    "fee": """💰 **Kalasalingam University Fee Structure (2026–2027)**:
- **B.Tech (CSE / AI & DS / Cyber Security)**: ₹1,95,000 / year
- **B.Tech (ECE / Bio-stream / Mech / Civil)**: ₹1,50,000 – ₹1,60,000 / year
- **Miscellaneous Fee (Library & Softskills)**: ₹12,000 / year (₹5,000 for Arts & Science)
- **Hostel Accommodation**: ₹95,000 – ₹1,45,000 / year (Mess Included)
- **MBA**: ₹1,50,000 / year | **MCA**: ₹1,00,000 / year | **M.Tech**: ₹90,000 / year""",

    "scholarship": """🎁 **Scholarship Slabs (Up to 100% Fee Waiver)**:
1. **JEE Main Rank 1–25,000**: **100% Tuition Fee Waiver**
2. **JEE Main Rank 25,001–50,000**: **75% Tuition Fee Waiver**
3. **10+2 PCM 95%+**: Tuition Fee reduced to **₹1,50,000 / year**
4. **10+2 PCM 80%–89.9%**: Tuition Fee reduced to **₹1,00,000 / year**
5. **Sports (State/National)**: 50%–100% Waiver + Free Hostel
6. **GATE Qualified (M.Tech)**: **₹12,500 / month Stipend**!""",

    "eligibility": """📋 **Eligibility Criteria Overview**:
- **B.Tech**: Pass 10+2 with 50% aggregate in Physics, Chemistry, and Mathematics (PCM/PCB).
- **B.Arch**: Pass 10+2 with 50% in PCM + valid NATA score.
- **Law (BA LLB / BCom LLB)**: Pass 10+2 with 50% aggregate + CLAT / KLSAT score.
- **BCA**: Pass 10+2 with 50% marks and Mathematics as a compulsory subject.
- **M.Tech**: B.E/B.Tech with 50% or 5.5 CGPA + GATE / KUEE score.""",

    "hostel": """🏠 **Hostel & Mess Amenities**:
- 2-Bedded, 4-Bedded, and 5-Bedded rooms (AC and Non-AC available)
- 24/7 Security, High-Speed Wi-Fi, Hygienic Dining Hall
- Fee ranges from ₹95,000 to ₹1,45,000 per year (including mess charges)
- Allotment on First-Come, First-Served basis upon admission seat confirmation.""",

    "contact": """📞 **Admissions Contact & Location**:
- **Address**: Anand Nagar, Krishnankoil-626126, Tamil Nadu, India.
- **Helpline**: +91 7397760760 / 04563 289042
- **Email**: admission@klu.ac.in / coe@klu.ac.in
- **Timings**: 9:00 AM to 5:00 PM (Monday to Saturday)"""
}

# Sidebar Navigation
with st.sidebar:
    st.image("https://www.kalasalingam.ac.in/wp-content/uploads/2022/04/logo.png", width=220) if False else None
    st.title("🎓 KLU Admissions")
    st.caption("2026–2027 Official Assistant")
    
    st.markdown("---")
    st.markdown(f"📍 **Location**: {KLU_DATA['location']}")
    st.markdown(f"📞 **Phone**: {KLU_DATA['contact']}")
    st.markdown(f"⭐ **Accreditation**: {KLU_DATA['accreditation']}")
    
    st.markdown("---")
    st.link_button("🚀 Apply Online 2026", KLU_DATA["apply_link"], use_container_width=True)

# App Header
st.markdown('<p class="main-title">Kalasalingam University GenAI Assistant</p>', unsafe_allow_html=True)
st.markdown('<p class="sub-title">Instant Answers for Admissions, Eligibility, Fees, Scholarships & Hostels</p>', unsafe_allow_html=True)

# Top Stat Metrics
col1, col2, col3, col4 = st.columns(4)
col1.metric("NAAC Rating", "A++ Grade")
col2.metric("Max Scholarship", "100% Waiver")
col3.metric("GATE Stipend", "₹12,500 / mo")
col4.metric("Application Fee", "₹600")

# Tabs
tab1, tab2, tab3 = st.tabs(["💬 GenAI Chat Assistant", "🧮 Fee Calculator", "📖 Admission FAQs"])

with tab1:
    st.subheader("Ask your Admission & Fee Queries")
    
    # Initialize chat history
    if "messages" not in st.session_state:
        st.session_state.messages = [
            {"role": "assistant", "content": "👋 Welcome! I am your Kalasalingam University GenAI Assistant. Ask me anything about courses, fees, scholarships, or hostels!"}
        ]

    # Render previous messages
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.markdown(msg["content"])

    # User Input
    if user_prompt := st.chat_input("Type your question here (e.g., What is B.Tech fee?, Scholarship details)..."):
        # Display user message
        st.session_state.messages.append({"role": "user", "content": user_prompt})
        with st.chat_message("user"):
            st.markdown(user_prompt)

        # Generate response logic
        q = user_prompt.lower()
        response_text = ""

        if "fee" in q or "tuition" in q or "cost" in q:
            response_text = FAQ_KNOWLEDGE_BASE["fee"]
        elif "scholarship" in q or "waiver" in q or "jee" in q:
            response_text = FAQ_KNOWLEDGE_BASE["scholarship"]
        elif "eligibility" in q or "criteria" in q or "requirement" in q:
            response_text = FAQ_KNOWLEDGE_BASE["eligibility"]
        elif "hostel" in q or "mess" in q or "room" in q:
            response_text = FAQ_KNOWLEDGE_BASE["hostel"]
        elif "contact" in q or "phone" in q or "address" in q or "location" in q:
            response_text = FAQ_KNOWLEDGE_BASE["contact"]
        else:
            response_text = f"🤖 **GenAI Response for '{user_prompt}'**:\n\n* **Admissions**: Open for 2026-2027 cycle.\n* **Key Details**: Kalasalingam University offers UG & PG courses with tuition fees starting from ₹60,000/yr up to ₹1,95,000/yr.\n* **Scholarships**: Available for JEE rankers, PCM 80%+ scorers, sports candidates, and GATE qualified M.Tech students.\n* **Contact**: Call +91 7397760760 for direct guidance."

        with st.chat_message("assistant"):
            st.markdown(response_text)
            st.session_state.messages.append({"role": "assistant", "content": response_text})

with tab2:
    st.subheader("Fee & Scholarship Calculator")
    
    col_a, col_b = st.columns(2)
    with col_a:
        course = st.selectbox("Select Course", ["B.Tech CSE / AI-DS (₹1,95,000)", "B.Tech ECE / Biotech (₹1,60,000)", "B.Tech Mech / Civil (₹1,50,000)", "MBA (₹1,50,000)", "MCA (₹1,00,000)", "BBA / BCA (₹75,000)"])
        marks = st.slider("10+2 PCM / PCB Percentage (%)", 50, 100, 85)
        jee_rank = st.number_input("JEE Main Rank (Optional)", min_value=0, max_value=200000, value=0)
        hostel = st.selectbox("Hostel Type", ["Day Scholar (No Hostel)", "5-Bedded Room (₹95,000/yr)", "4-Bedded Room (₹1,10,000/yr)", "2-Bedded Room (₹1,25,000/yr)", "2-Bedded AC Room (₹1,45,000/yr)"])

    with col_b:
        base_tuition = 195000 if "CSE" in course else (160000 if "ECE" in course else 150000)
        waiver_name = "None"
        net_tuition = base_tuition

        if jee_rank > 0 and jee_rank <= 25000:
            waiver_name = "CAT-01: 100% JEE Rank Waiver"
            net_tuition = 0
        elif marks >= 95:
            waiver_name = "CAT-03: PCM 95%+ Slab (Fee capped at ₹1,50,000)"
            net_tuition = 150000
        elif marks >= 80:
            waiver_name = "CAT-05: PCM 80-89.9% Slab (Fee capped at ₹1,00,000)"
            net_tuition = 100000

        hostel_fee = 0
        if "5-Bedded" in hostel: hostel_fee = 95000
        elif "4-Bedded" in hostel: hostel_fee = 110000
        elif "2-Bedded Room" in hostel: hostel_fee = 125000
        elif "2-Bedded AC" in hostel: hostel_fee = 145000

        total_annual = net_tuition + 12000 + hostel_fee

        st.info(f"**Base Tuition Fee**: ₹{base_tuition:,}")
        st.success(f"**Scholarship Scheme**: {waiver_name}")
        st.warning(f"**Net Tuition Fee**: ₹{net_tuition:,}")
        st.subheader(f"Total Estimated Fee: ₹{total_annual:,} / year")

with tab3:
    st.subheader("Official FAQs & Guidelines")
    for category, content in FAQ_KNOWLEDGE_BASE.items():
        with st.expander(f"📌 FAQ Topic: {category.upper()}"):
            st.markdown(content)
