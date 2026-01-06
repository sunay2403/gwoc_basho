import os
import json
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from experiences.models import GalleryImage, TextTestimonial, VideoTestimonial

metadata_path = r"c:/Users/mehul/OneDrive/Pictures/Desktop/SELF/basobyshingiGWOC/bashobyshivangi/backend/media/extracted/metadata.json"

with open(metadata_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 1. Update Story/Testimonial from PDF
story_content = ""
for page in data["text_by_page"]:
    if "OUR STORY" in page["content"]:
        story_content = page["content"]
        break

if story_content:
    # Clean up the story text
    clean_story = story_content.replace("OUR STORY", "").strip()
    TextTestimonial.objects.get_or_create(
        text=clean_story,
        author="Shivangi",
        location="Surat",
        category="Founder Story"
    )
    print("Added Founder Story to TextTestimonial.")

# 2. Add extracted images to GalleryImage
for img in data["images"]:
    GalleryImage.objects.get_or_create(
        image=img["path"],
        defaults={
            'caption': f"Handcrafted piece from Basho - {img['filename']}",
            'type': "product" if "img_1" in img["filename"] else "lifestyle",
            'likes': 0
        }
    )

# 3. Add Video Testimonials
v1, _ = VideoTestimonial.objects.get_or_create(
    author='Ananya',
    defaults={
        'quote': 'I never thought I could create something this beautiful',
        'thumbnail': 'extracted/page_2_img_1.jpeg',
        'duration': '0:42'
    }
)
v2, _ = VideoTestimonial.objects.get_or_create(
    author='Ravi',
    defaults={
        'quote': 'Every meal feels like a ceremony now',
        'thumbnail': 'extracted/page_4_img_1.jpeg',
        'duration': '0:38'
    }
)

print(f"Added {len(data['images'])} images to GalleryImage and video testimonials.")
