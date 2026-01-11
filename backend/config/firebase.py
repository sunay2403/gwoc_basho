# config/firebase.py

import os
import json
import firebase_admin
from firebase_admin import credentials

if not firebase_admin._apps:
    firebase_creds = os.environ.get("FIREBASE_SERVICE_ACCOUNT")

    if not firebase_creds:
        raise Exception("FIREBASE_SERVICE_ACCOUNT environment variable not set")

    cred = credentials.Certificate(json.loads(firebase_creds))
    firebase_admin.initialize_app(cred)
