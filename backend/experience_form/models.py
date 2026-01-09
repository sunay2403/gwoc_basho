from django.db import models

class ExperienceRegistration(models.Model):
    EXPERIENCE_CHOICES = [
        ("couple", "Couple Pottery Dates"),
        ("birthday", "Birthday Celebrations"),
        ("farm", "Farm & Garden Mini Parties"),
        ("studio", "Studio-based Experiences"),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    experience = models.CharField(
        max_length=20,
        choices=EXPERIENCE_CHOICES
    )

    date = models.DateField()
    participants = models.PositiveIntegerField()

    extra_data = models.JSONField(blank=True, null=True)
    message = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.experience}"
