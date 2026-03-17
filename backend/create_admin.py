import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User

username = 'siloo'
email = 'silasngetich2030@gmail.com'
first_name = 'silas'
# Use environment variable for password, fallback to a secure-ish default if not set
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin123')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(
        username=username, 
        email=email, 
        password=password, 
        role='admin',
        first_name=first_name
    )
    print(f"Superuser {username} created successfully.")
else:
    user = User.objects.get(username=username)
    user.role = 'admin'
    user.first_name = first_name
    user.save()
    print(f"Superuser {username} updated with admin role.")
