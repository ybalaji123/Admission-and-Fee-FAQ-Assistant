import chromadb

client = chromadb.PersistentClient(path="data/chroma_db")
collection = client.get_collection("klu_admissions")

print("Chunks:", collection.count())

records = collection.get(limit=5, include=["documents", "metadatas"])
for document, metadata in zip(records["documents"], records["metadatas"]):
    print(f"\nSheet: {metadata['sheet']} | Row: {metadata['row']}")
    print(document)