import fitz  # PyMuPDF
import os
import json

pdf_path = r"c:/Users/mehul/OneDrive/Pictures/Desktop/SELF/basobyshingiGWOC/basho photobook (5).pdf"
output_dir = r"c:/Users/mehul/OneDrive/Pictures/Desktop/SELF/basobyshingiGWOC/bashobyshivangi/backend/media/extracted"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

doc = fitz.open(pdf_path)
data = {
    "text_by_page": [],
    "images": []
}

for page_index in range(len(doc)):
    page = doc[page_index]
    text = page.get_text()
    data["text_by_page"].append({
        "page": page_index + 1,
        "content": text
    })
    
    image_list = page.get_images(full=True)
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        image_filename = f"page_{page_index + 1}_img_{img_index + 1}.{image_ext}"
        image_path = os.path.join(output_dir, image_filename)
        
        with open(image_path, "wb") as f:
            f.write(image_bytes)
        
        data["images"].append({
            "page": page_index + 1,
            "filename": image_filename,
            "path": f"extracted/{image_filename}"
        })

with open(os.path.join(output_dir, "metadata.json"), "w", encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"Extraction complete. {len(data['images'])} images saved to {output_dir}")
