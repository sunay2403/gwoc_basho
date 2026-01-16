from django.db import models

def exhibition_image_path(instance, filename):
    return f"studio/{filename}"

class Exhibition(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField(blank=True, null=True)
    date=models.DateField()
    image=models.ImageField(upload_to=exhibition_image_path,blank=True, null=True)

    
class StudioPolicy(models.Model):
    text=models.CharField(max_length=255)
    order=models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        ordering=["order","id"]

    def save(self,*args,**kwargs):
        if self.order is None:
            max_order=(
                StudioPolicy.objects.aggregate(models.Max("order"))["order__max"]
            )
            self.order=(max_order or 0)+1
        super().save(*args,**kwargs)

    def __str__(self):
        return self.text


class StudioHours(models.Model):
    content = models.CharField(
        max_length=255,
        help_text="e.g. Mon–Fri: 10:00–17:00 | Weekends: Open during scheduled pop-ups"
    )

    def __str__(self):
        return "Studio Hours"

