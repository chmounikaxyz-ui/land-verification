import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

def generate_perfect_size_confusion_matrix():
    # 2x2 matrix: [[TN=144, FP=6], [FN=7, TP=143]]
    cm = np.array([[144, 6], [7, 143]])
    
    # 4.5 x 4.0 inches at 300 dpi gives crystal clarity and perfect column scaling
    fig, ax = plt.subplots(figsize=(4.5, 4.0), dpi=300)
    
    cmap = plt.cm.Blues
    im = ax.imshow(cm, interpolation='nearest', cmap=cmap, vmin=0, vmax=150)
    
    classes = ['Non-Encroached', 'Encroached']
    tick_marks = np.arange(len(classes))
    
    ax.set_xticks(tick_marks)
    ax.set_xticklabels(classes, fontsize=9.5, fontweight='bold', family='sans-serif')
    ax.set_yticks(tick_marks)
    ax.set_yticklabels(classes, fontsize=9.5, fontweight='bold', family='sans-serif', rotation=90, va='center')
    
    # Text inside each cell: small descriptor + large bold count
    cells = [
        # row 0: TN (144), FP (6)
        [
            {"sub": "True Negative\n144", "val": "144", "color": "white"},
            {"sub": "False Positive\n6",   "val": "6",   "color": "#0a2540"}
        ],
        # row 1: FN (7), TP (143)
        [
            {"sub": "False Negative\n7",   "val": "7",   "color": "#0a2540"},
            {"sub": "True Positive\n143", "val": "143", "color": "white"}
        ]
    ]
    
    for i in range(2):
        for j in range(2):
            c = cells[i][j]
            # Small top text
            ax.text(j, i - 0.18, c["sub"], ha="center", va="center",
                    color=c["color"], fontsize=8.5, fontweight='bold', family='sans-serif')
            # Large center value
            ax.text(j, i + 0.14, c["val"], ha="center", va="center",
                    color=c["color"], fontsize=18, fontweight='bold', family='sans-serif')
            
    ax.set_ylabel('True Label', fontsize=10.5, fontweight='bold', family='sans-serif', labelpad=6)
    ax.set_xlabel('Predicted Label', fontsize=10.5, fontweight='bold', family='sans-serif', labelpad=6)
    
    for spine in ax.spines.values():
        spine.set_edgecolor('#94a3b8')
        spine.set_linewidth(1.0)
        
    plt.tight_layout()
    
    output_path = r"c:\Users\HP\Desktop\mypro\land verification\doc\images\fig_confusion_matrix.png"
    desktop_path = r"C:\Users\HP\Desktop\fig_confusion_matrix.png"
    public_path = r"c:\Users\HP\Desktop\mypro\land verification\public\fig_confusion_matrix.png"
    
    plt.savefig(output_path, bbox_inches='tight', dpi=300)
    plt.savefig(desktop_path, bbox_inches='tight', dpi=300)
    plt.savefig(public_path, bbox_inches='tight', dpi=300)
    plt.close()
    print("Generated perfectly scaled confusion matrix image!")

if __name__ == '__main__':
    generate_perfect_size_confusion_matrix()
