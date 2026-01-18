from django.contrib import admin
from .models import CorporateInquiry


@admin.register(CorporateInquiry)
class CorporateInquiryAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "company")

