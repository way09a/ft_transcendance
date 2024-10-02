from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings

class UserManager(BaseUserManager):
    def create_user(self, user_email, user_password=None, **extra_field):
        if not user_email:
            raise ValueError('You must set the Email field')
        user_email = self.normalize_email(user_email)
        user = self.model(email=user_email, **extra_field)
        user.set_password(user_password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_email, user_password=None, **extra_field):
        extra_field.setdefault('is_staff', True)
        extra_field.setdefault('is_superuser', True)
        return self.create_user(user_email, user_password, **extra_field)

class OurUserProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email address', unique=True)
    
    username = models.CharField(max_length=60, blank=True)
    first_name = models.CharField(max_length=60, blank=True)
    last_name = models.CharField(max_length=60, blank=True)
    
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)

    is_staff = models.BooleanField(default=False)
    is_online = models.BooleanField(default=False)


    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

class UserPreferences(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='preferences', on_delete=models.CASCADE)
   # Add fields for User Preferences here
    preference1 = models.CharField(max_length=128, blank=True, null=True)
    preference2 = models.CharField(max_length=128, blank=True, null=True)
    preference3 = models.CharField(max_length=128, blank=True, null=True)
    preference4 = models.CharField(max_length=128, blank=True, null=True)
    preference5 = models.CharField(max_length=128, blank=True, null=True)
    # Other preference fields

    def __str__(self):
        return f"My {self.user.username} Preferences"

from django.db import models
from django.conf import settings

class Friendship(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='friends', on_delete=models.CASCADE)
    friend = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='friends_de', on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    created_in = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'friend')

    def __str__(self):
        return f"{self.user} is a friend of {self.friend}"

class Game_History(models.Model):
    CHOICES_RESULT = [
        ('win', 'Win'),
        ('loss', 'Loss'),
        ('draw', 'Draw'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='gamess')
    game = models.CharField(max_length=100)
    description = models.TextField()
    score = models.CharField(max_length=50)
    result = models.CharField(max_length=10, choices=CHOICES_RESULT)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.game} on this date {self.date} - {self.result}"