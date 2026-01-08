import firebase_admin
from firebase_admin import auth as firebase_auth
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import User

class FirebaseAuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        id_token = request.data.get("idToken")

        if not id_token:
            return Response({"error": "Token required"}, status=400)

        try:
            decoded = firebase_auth.verify_id_token(id_token)
        except Exception:
            return Response({"error": "Invalid token"}, status=401)

        uid = decoded["uid"]
        email = decoded.get("email", "")
        name = decoded.get("name", "")
        phone = decoded.get("phone_number", "")

        user, created = User.objects.update_or_create(
            firebase_uid=uid,
            defaults={
                "email": email,
                "full_name": name or email.split("@")[0],
                "phone": phone,
            },
        )

        return Response({
            "id": user.id,
            "firebase_uid": user.firebase_uid,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
        })
