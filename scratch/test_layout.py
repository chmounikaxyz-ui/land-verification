import sys
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER

styles = getSampleStyleSheet()
name_style = ParagraphStyle('Name', fontName='Times-Bold', fontSize=9, leading=11, alignment=TA_CENTER)
inst_style = ParagraphStyle('Inst', fontName='Times-Italic', fontSize=7.2, leading=9.0, alignment=TA_CENTER)

content_width = 540.0
col_w = content_width / 6.0

affil_full = "<i>B.Tech Student, Dept. of Computer<br/>Science and Engineering, NRI Institute<br/>of Technology, Agiripalli-521212,<br/>Vijayawada, Andhra Pradesh, India.<br/>email@gmail.com</i>"
prof_affil = "<i>Professor, Dept. of Computer<br/>Science and Engineering, NRI Institute<br/>of Technology, Agiripalli-521212,<br/>Vijayawada, Andhra Pradesh, India.<br/>drgshobana@gmail.com</i>"

authors_data = [
    [
        Paragraph("Chennuboina Mounika<sup>1</sup>", name_style), '',
        Paragraph("Arepalli Kalpana<sup>2</sup>", name_style), '',
        Paragraph("Achi Pavan Kumar<sup>3</sup>", name_style), ''
    ],
    [
        Paragraph(affil_full, inst_style), '',
        Paragraph(affil_full, inst_style), '',
        Paragraph(affil_full, inst_style), ''
    ],
    [
        '',
        Paragraph("Fifth Author Name<sup>4</sup>", name_style), '',
        Paragraph("Dr. G. Shobana<sup>5,*</sup>", name_style), '',
        ''
    ],
    [
        '',
        Paragraph(affil_full, inst_style), '',
        Paragraph(prof_affil, inst_style), '',
        ''
    ]
]

t = Table(authors_data, colWidths=[col_w]*6)
t.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('SPAN', (0,0), (1,0)),
    ('SPAN', (2,0), (3,0)),
    ('SPAN', (4,0), (5,0)),
    ('SPAN', (0,1), (1,1)),
    ('SPAN', (2,1), (3,1)),
    ('SPAN', (4,1), (5,1)),
    ('SPAN', (1,2), (2,2)),
    ('SPAN', (3,2), (4,2)),
    ('SPAN', (1,3), (2,3)),
    ('SPAN', (3,3), (4,3)),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ('TOPPADDING', (0,0), (-1,-1), 1),
]))

w, h = t.wrap(content_width, 200)
print(f"Full 5-line height: {h} pt")
