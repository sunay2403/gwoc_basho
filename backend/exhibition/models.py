from django.db import models

def exhibition_image_path(instance, filename):
    return f"studio/{filename}"

class Exhibition(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField(blank=True, null=True)
    date=models.DateField()
    image=models.ImageField(upload_to=exhibition_image_path,blank=True, null=True)

