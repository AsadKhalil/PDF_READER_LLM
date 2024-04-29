from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

# Register your models here.
User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    list_display = [
        "username",
        "email",
    ]
    search_fields = ["email"]
