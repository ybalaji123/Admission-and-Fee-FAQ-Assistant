"""Manually build or resume the local ChromaDB index from the KLU workbook.

Run from the project root with:
    python -m model_performing.index_workbook

The API also prepares this index automatically when the backend starts.
"""

from backend.rag import KLUAssistant


if __name__ == "__main__":
    assistant = KLUAssistant()
    chunk_count = assistant.ensure_index()
    print(f"Indexed {chunk_count} workbook chunks in data/chroma_db")
