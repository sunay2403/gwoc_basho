import os
import django
import sys

# Add the project root to the python path
sys.path.append(os.getcwd())

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

def create_or_reset_admin():
    User = get_user_model()
    username = 'admin'
    password = 'password123'
    email = 'admin@basho.com'

    try:
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            user.set_password(password)
            user.save()
            print(f"I have reset the password for the existing user '{username}'.")
            print(f"Username: {username}")
            print(f"Password: {password}")
        else:
            User.objects.create_superuser(username, email, password)
            print(f"I have created a new superuser.")
            print(f"Username: {username}")
            print(f"Password: {password}")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    create_or_reset_admin()
