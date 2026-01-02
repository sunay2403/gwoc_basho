from django.db import models

class Experience(models.Model):
    title = models.CharField(max_length=200)
    story = models.TextField()
    author = models.CharField(max_length=100)
    image = models.ImageField(upload_to='experiences/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class TextTestimonial(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    category = models.CharField(max_length=50) # e.g., Philosophy, Experience, etc.
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author} - {self.category}"

class GalleryImage(models.Model):
    image = models.ImageField(upload_to='gallery/')
    caption = models.CharField(max_length=255)
    type = models.CharField(max_length=50) # e.g., product, workshop, studio
    likes = models.IntegerField(default=0)
    post_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.caption

class VideoTestimonial(models.Model):
    thumbnail = models.ImageField(upload_to='videos/thumbnails/')
    duration = models.CharField(max_length=20) # e.g., "0:42"
    author = models.CharField(max_length=100)
    quote = models.TextField()
    video_url = models.URLField(blank=True) # Optional link to full video
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Video by {self.author}"
