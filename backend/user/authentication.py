from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from firebase_admin import auth as firebase_auth
from .models import User


class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        header = request.headers.get("Authorization")

        if not header:
            return None

        if not header.startswith("Bearer "):
            raise AuthenticationFailed("Invalid Authorization header")

        token = header.split(" ")[1]

        try:
            decoded = firebase_auth.verify_id_token(token)
        except Exception:
            raise AuthenticationFailed("Invalid Firebase token")

        uid = decoded.get("uid")
        if not uid:
            raise AuthenticationFailed("Invalid Firebase payload")

        user, _ = User.objects.get_or_create(
            firebase_uid=uid,
            defaults={
                "email": decoded.get("email", ""),
            },
        )

        return (user, None)
