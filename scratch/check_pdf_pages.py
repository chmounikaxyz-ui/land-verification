import os
from reportlab.pdfgen import canvas
import pypdf

reader = pypdf.PdfReader('doc/RESEARCH_PAPER.pdf')
print('Number of pages:', len(reader.pages))
for i, p in enumerate(reader.pages):
    text = p.extract_text()
    matches = []
    if 'Confusion' in text: matches.append('Confusion')
    if 'Fig. 4' in text or 'Fig 4' in text: matches.append('Fig 4')
    if 'TABLE III' in text: matches.append('TABLE III')
    if 'TABLE II' in text: matches.append('TABLE II')
    print(f'Page {i+1}: {matches}')
