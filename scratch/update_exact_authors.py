with open('doc/generate_pdf.py', 'r', encoding='utf-8') as f:
    code = f.read()

authors_data_snippet = '''    col_w = content_width / 6.0
    authors_data = [
        # Row 1: 3 authors
        [
            Paragraph("Venugopal Boppana<sup>1,*</sup>", author_name_style), '',
            Paragraph("Bonagiri Lavanya<sup>2</sup>", author_name_style), '',
            Paragraph("Challa Eswar<sup>3</sup>", author_name_style), ''
        ],
        [
            Paragraph("<i>Faculty Guide / Project Supervisor<br/>Dept. of Computer Science and Engineering<br/>NRI Institute of Technology<br/>Agiripalli, Andhra Pradesh, India<br/>srees.boppana@gmail.com</i>", author_inst_style), '',
            Paragraph("<i>Student Author<br/>Dept. of Computer Science and Engineering<br/>NRI Institute of Technology<br/>Agiripalli, Andhra Pradesh, India<br/>lavanyabonagiri37@gmail.com</i>", author_inst_style), '',
            Paragraph("<i>Student Author<br/>Dept. of Computer Science and Engineering<br/>NRI Institute of Technology<br/>Agiripalli, Andhra Pradesh, India<br/>eswarc440@gmail.com</i>", author_inst_style), ''
        ],
        # Row 2: 2 authors centered
        [
            '',
            Paragraph("Budigi Lavanya<sup>4</sup>", author_name_style), '',
            Paragraph("A Rahul Sanjay<sup>5</sup>", author_name_style), '',
            ''
        ],
        [
            '',
            Paragraph("<i>Student Author<br/>Dept. of Computer Science and Engineering<br/>NRI Institute of Technology<br/>Agiripalli, Andhra Pradesh, India<br/>11lavanya2678@gmail.com</i>", author_inst_style), '',
            Paragraph("<i>Student Author<br/>Dept. of Computer Science and Engineering<br/>NRI Institute of Technology<br/>Agiripalli, Andhra Pradesh, India<br/>[Email ID]</i>", author_inst_style), '',
            ''
        ]
    ]'''

# Let's find where col_w = content_width / 6.0 starts up to author_table = Table
import re
pattern = r"    col_w = content_width / 6\.0.*?(?=    author_table = Table)"
new_code = re.sub(pattern, authors_data_snippet + "\n    \n", code, flags=re.DOTALL)

with open('scratch/test_gen.py', 'w', encoding='utf-8') as f:
    f.write(new_code)
print("scratch/test_gen.py written successfully!")
