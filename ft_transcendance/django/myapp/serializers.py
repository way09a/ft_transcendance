from rest_framework import serializers
from .models import UserPreferences
from .models import Friendship, OurUserProfile
from .models import Game_History
from django.db import models

class User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = OurUserProfile
        fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name', 'is_online', 'profile_image')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, data_validated):
        password = data_validated.pop('password', None)
        instance = self.Meta.model(**data_validated)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class User_Preferences_Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        fields = '__all__'

class Friendship_Serializer(serializers.ModelSerializer):
    user = User_Serializer()

    class Meta:
        model = Friendship
        fields = ['id', 'user', 'friend', 'accepted']

class Friendship_Sent_Serializer(serializers.ModelSerializer):
    friend = User_Serializer()

    class Meta:
        model = Friendship
        fields = ['id', 'friend', 'accepted', 'created_in']

class Game_History_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Game_History
        fields = ['id', 'user', 'game', 'description', 'score', 'result', 'date']

from rest_framework import serializers
from .models import OurUserProfile, Friendship

from rest_framework import serializers
from .models import OurUserProfile, Friendship

class friend_List_Serializer(serializers.ModelSerializer):
    class Meta:
        model = OurUserProfile
        fields = ('id', 'username', 'email', 'profile_image', 'is_online')
