from django.db import models

def exhibition_image_path(instance, filename):
    return f"studio/{filename}"

class Exhibition(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField(blank=True, null=True)
    date=models.DateField()
    image=models.ImageField(upload_to=exhibition_image_path,blank=True, null=True)

    
class StudioPolicy(models.Model):
    text = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def save(self, *args, **kwargs):
        if not self.order:
            max_order = StudioPolicy.objects.aggregate(
                models.Max("order")
            )["order__max"] or 0
            self.order = max_order + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.text


class StudioHours(models.Model):
    content = models.CharField(max_length=255)

    def __str__(self):
        return "Studio Hours"

