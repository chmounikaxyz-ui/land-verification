import fitz

doc = fitz.open('MY_PAPER.pdf')
page = doc.load_page(0)
pix = page.get_pixmap(dpi=150)
pix.save('scratch/page1_preview.png')
print('Page 1 rendered to scratch/page1_preview.png')
