with open('doc/generate_pdf.py', 'r', encoding='utf-8') as f:
    code = f.read()

old_sec = '''    authors_data = [
        [
            Paragraph("Chennuboina Mounika<sup>1</sup>", author_name_style),
            Paragraph("Arepalli Kalpana<sup>2</sup>", author_name_style),
            Paragraph("Achi Pavan Kumar<sup>3</sup>", author_name_style)
        ],
        [
            Paragraph("<i>B.Tech Student, Dept. of Computer<br/>Science and Engineering, NRI Institute<br/>of Technology, Agiripalli-521212,<br/>Vijayawada, Andhra Pradesh, India.<br/>chmounikaxyz@gmail.com</i>", author_inst_style),
            Paragraph("<i>B.Tech Student, Dept. of Computer<br/>Science and Engineering, NRI Institute<br/>of Technology, Agiripalli-521212,<br/>Vijayawada, Andhra Pradesh, India.<br/>kalpanaarepalli295@gmail.com</i>", author_inst_style),
            Paragraph("<i>B.Tech Student, Dept. of Computer<br/>Science and Engineering, NRI Institute<br/>of Technology, Agiripalli-521212,<br/>Vijayawada, Andhra Pradesh, India.<br/>pavankumarachioo7@gmail.com</i>", author_inst_style)
        ],
        [
            Paragraph("Dr. G. Shobana<sup>4,*</sup>", author_name_style),
            Paragraph("Dr. G. Shobana<sup>4,*</sup>", author_name_style),
            Paragraph("Dr. G. Shobana<sup>4,*</sup>", author_name_style)
        ],
        [
            Paragraph("<i>Professor, Dept. of Computer Science and Engineering, NRI Institute of Technology,<br/>Agiripalli-521212, Vijayawada, Andhra Pradesh, India. drgshobana@gmail.com</i>", author_inst_style),
            Paragraph("<i>Professor, Dept. of Computer Science and Engineering, NRI Institute of Technology,<br/>Agiripalli-521212, Vijayawada, Andhra Pradesh, India. drgshobana@gmail.com</i>", author_inst_style),
            Paragraph("<i>Professor, Dept. of Computer Science and Engineering, NRI Institute of Technology,<br/>Agiripalli-521212, Vijayawada, Andhra Pradesh, India. drgshobana@gmail.com</i>", author_inst_style)
        ]
    ]
    
    author_table = Table(authors_data, colWidths=[content_width/3.0]*3)
    author_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('SPAN', (0,2), (2,2)),
        ('SPAN', (0,3), (2,3)),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))'''

new_sec = '''    col_w = content_width / 6.0
    authors_data = [
        # Row 1: 3 authors
        [
            Paragraph("Chennuboina Mounika<sup>1</sup>", author_name_style), '',
            Paragraph("Arepalli Kalpana<sup>2</sup>", author_name_style), '',
            Paragraph("Achi Pavan Kumar<sup>3</sup>", author_name_style), ''
        ],
        [
            Paragraph("<i>B.Tech Student, Dept. of Computer<br/>Science and Engineering, NRI Institute<br/>of Technology, Agiripalli-521212,<br/>Vijayawada, Andhra Pradesh, India.<br/>chmounikaxyz@gmail.com</i>", author_inst_style), '',
            Paragraph("<i>B.Tech Student, Dept. of Computer<br/>Science and Engineering, NRI Institute<br/>of Technology, Agiripalli-521212,<br/>Vijayawada, Andhra Pradesh, India.<br/>kalpanaarepalli295@gmail.com</i>", author_inst_style), '',
            Paragraph("<i>B.Tech Student, Dept. of Computer<br/>Science and Engineering, NRI Institute<br/>of Technology, Agiripalli-521212,<br/>Vijayawada, Andhra Pradesh, India.<br/>pavankumarachioo7@gmail.com</i>", author_inst_style), ''
        ],
        # Row 2: 2 authors centered
        [
            '',
            Paragraph("Fifth Author Name<sup>4</sup>", author_name_style), '',
            Paragraph("Dr. G. Shobana<sup>5,*</sup>", author_name_style), '',
            ''
        ],
        [
            '',
            Paragraph("<i>B.Tech Student, Dept. of Computer<br/>Science and Engineering, NRI Institute<br/>of Technology, Agiripalli-521212,<br/>Vijayawada, Andhra Pradesh, India.<br/>fifthauthor@gmail.com</i>", author_inst_style), '',
            Paragraph("<i>Professor, Dept. of Computer<br/>Science and Engineering, NRI Institute<br/>of Technology, Agiripalli-521212,<br/>Vijayawada, Andhra Pradesh, India.<br/>drgshobana@gmail.com</i>", author_inst_style), '',
            ''
        ]
    ]
    
    author_table = Table(authors_data, colWidths=[col_w]*6)
    author_table.setStyle(TableStyle([
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
    ]))'''

if old_sec in code:
    test_code = code.replace(old_sec, new_sec).replace('RESEARCH_PAPER.pdf', 'TEST_PAPER.pdf')
    with open('scratch/test_gen.py', 'w', encoding='utf-8') as f:
        f.write(test_code)
    print('test_gen.py written successfully!')
else:
    print('Error: old_sec not found in code!')
