from rest_framework.authentication import BaseAuthentication
from firebase_admin import auth as firebase_auth
from .models import User


class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        header = request.headers.get("Authorization")

        if not header or not header.startswith("Bearer "):
            return None

        id_token = header.split(" ")[1]

        try:
            decoded = firebase_auth.verify_id_token(id_token)
        except Exception:
            return None

        uid = decoded.get("uid")

        try:
            user = User.objects.get(firebase_uid=uid)
        except User.DoesNotExist:
            # 🔥 VERY IMPORTANT: don't crash
            return None

        return (user, None)
