import os
import shutil

src = 'MY_PAPER.pdf'
home = os.path.expanduser('~')
downloads = os.path.join(home, 'Downloads')

if os.path.exists(downloads):
    dest = os.path.join(downloads, 'MY_PAPER.pdf')
    shutil.copy(src, dest)
    print(f"Copied to: {dest}")
else:
    print(f"Downloads folder not found at {downloads}")
