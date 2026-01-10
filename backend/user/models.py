from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)


class UserManager(BaseUserManager):
    def create_user(
        self,
        email,
        password=None,
        firebase_uid=None,
        full_name="",
        phone=None,
        **extra_fields,
    ):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            firebase_uid=firebase_uid,
            full_name=full_name,
            phone=phone,
            **extra_fields,
        )

        # ✅ Django password for admin / staff
        # ❌ Firebase users can have unusable password
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Django Admin superuser
        - MUST have a usable password
        - Firebase UID NOT required
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("role", "admin")

        return self.create_user(
            email=email,
            password=password,
            firebase_uid=None,  # 👈 IMPORTANT
            **extra_fields,
        )


class User(AbstractBaseUser, PermissionsMixin):
    # Firebase UID only for API users
    firebase_uid = models.CharField(
        max_length=128,
        unique=True,
        null=True,
        blank=True,
    )

    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150, blank=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    role = models.CharField(
        max_length=20,
        choices=[
            ("customer", "Customer"),
            ("staff", "Staff"),
            ("admin", "Admin"),
        ],
        default="customer",
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []  # 👈 CRITICAL (no firebase_uid required)

    def __str__(self):
        return self.email


class Address(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="addresses",
    )

    address_line = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    country = models.CharField(max_length=50, default="India")

    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.city}"
