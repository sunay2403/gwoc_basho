from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, firebase_uid, full_name="", phone=None, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        if not firebase_uid:
            raise ValueError("Users must have a firebase uid")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            firebase_uid=firebase_uid,
            full_name=full_name,
            phone=phone,
            **extra_fields
        )

        # Password is NOT used (Firebase handles auth)
        # But Django requires this method to exist
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)
        return user

    def create_superuser(self, email, firebase_uid="admin", password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")

        return self.create_user(
            email=email,
            firebase_uid=firebase_uid,
            password=password,
            **extra_fields
        )


class User(AbstractBaseUser, PermissionsMixin):
    firebase_uid = models.CharField(max_length=128, unique=True)

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=15, blank=True, null=True)

    role = models.CharField(
        max_length=20,
        choices=[
            ("customer", "Customer"),
            ("staff", "Staff"),
            ("admin", "Admin"),
        ],
        default="customer"
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["firebase_uid"]

    def __str__(self):
        return self.email

    
    
class Address(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="addresses"
    )

    address_line = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    country = models.CharField(max_length=50, default="India")

    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.city}"