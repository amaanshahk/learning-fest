from chunking import (
    load_documents,
    fixed_size_chunks,
    paragraph_chunks
)

documents = load_documents()

fixed_chunks = fixed_size_chunks(documents)
section_chunks = paragraph_chunks(documents)

print("Documents:", len(documents))
print("Fixed-size chunks:", len(fixed_chunks))
print("Section-based chunks:", len(section_chunks))

print("\nSample fixed-size chunk:")
print(fixed_chunks[0])

print("\nSample section-based chunk:")
print(section_chunks[0])