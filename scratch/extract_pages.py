import pypdf

reader = pypdf.PdfReader('doc/RESEARCH_PAPER.pdf')
for i in [3, 4]:  # 0-indexed: pages 4 and 5
    print(f"=== PAGE {i+1} ===")
    print(reader.pages[i].extract_text()[:600])
