from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from rest_framework.authtoken.models import Token
from django.conf import settings
from myapp.models import OurUserProfile
from rest_framework import generics, permissions, status
from urllib.parse import urlencode
from rest_framework.views import APIView
import logging
import requests
from django.contrib.auth import authenticate
from myapp.serializers import User_Serializer
from django.contrib.auth import get_user_model



logger = logging.getLogger(__name__)


class Register_View(generics.CreateAPIView):
    queryset = OurUserProfile.objects.all()
    serializer_class = User_Serializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = OurUserProfile.objects.get(username=response.data['username'])
        my_token, created = Token.objects.get_or_create(user=user)
        response.data['token'] = my_token.key
        return response

class Login_View(APIView):
    def post(self, request, *args, **kwargs):
        user_email = request.data.get('email')
        user_password = request.data.get('password')
        user = authenticate(request, username=user_email, password=user_password)
        if user:
            my_token, created = Token.objects.get_or_create(user=user)
            return Response({'token': my_token.key})
        return Response({'error': 'Invalid Credential'}, status=400)

class Logout_View(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = User_Serializer
    def post(self, request):
        request.user.auth_token.delete()
        return Response({'message': 'Logout successful'},status=status.HTTP_200_OK)


class Check_AuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'authenticated': True}, status=status.HTTP_200_OK)

def intra_login(request):
    try:
        intra_auth_url = 'https://api.intra.42.fr/oauth/authorize'
        client_id = settings.API_CLIENT_ID
        callback_url = 'http://localhost/callback'
        response_type = 'code'

        params = {
            'client_id': client_id,
            'redirect_uri': callback_url,
            'response_type': response_type,
        }

        login_url = f"{intra_auth_url}?{urlencode(params)}"
        logger.info(f"Redirecting to {login_url}")
        return redirect(login_url)
    except Exception as login_error:
        logger.error(f"Error in intra_login: {login_error}")
        return HttpResponse("An error occurred in intra_login", status=500)

def intra_callback(request):
    try:
        authorization_code = request.GET.get('code')
        if not authorization_code:
            logger.error("No authorization code returned")
            return HttpResponse('Error: No authorization code returned', status=400)

        access_token_url = 'https://api.intra.42.fr/oauth/token'

        response = requests.post(access_token_url, data={
            'grant_type': 'authorization_code',
            'code': authorization_code,
            'redirect_uri': 'http://localhost/callback',
            'client_id': settings.API_CLIENT_ID,
            'client_secret': settings.API_CLIENT_SECRET,
        })

        token_data = response.json()
        logger.info(f"Token response: {token_data}")

        if response.status_code != 200 or 'access_token' not in token_data:
            logger.error(f"Unable to retrieve access token: {token_data}")
            return HttpResponse('Unable to retrieve access token', status=400)

        access_token = token_data.get('access_token')

        profile_endpoint = 'https://api.intra.42.fr/v2/me'
        profile_response = requests.get(profile_endpoint, headers={
            'Authorization': f'Bearer {access_token}',
        })
        profile_data = profile_response.json()
        logger.info(f"Profile data received: {profile_data}")

        if profile_response.status_code != 200:
            logger.error(f"Failed to retrieve profile information: {profile_data}")
            return HttpResponse('Failed to retrieve profile information', status=400)
        # Check if the user is already registered
        User = get_user_model()
        try:
            # First, try to find the user by username
            user = User.objects.get(username=profile_data['login'])
            logger.info(f"User found by username: {profile_data['login']}")
        except User.DoesNotExist:
            try:
                # If not found by username, try finding by email
               user = User.objects.get(email=profile_data['email'])
               logger.info(f"User found by email: {profile_data['email']}")
            except User.DoesNotExist:
                # If not found by email either, create a new user
                user = User.objects.create_user(
                    username=profile_data['login'],
                    first_name=profile_data['first_name'],
                    last_name=profile_data['last_name'],
                    user_email=profile_data['email'],
                )
                user.save()
                logger.info(f"New user created: {profile_data['login']}")

        # Authenticate and generate token
        token, created = Token.objects.get_or_create(user=user)

        callback_redirect_url = f"{settings.LOGIN_REDIRECT_URL}?token={token.key}"
        return redirect(callback_redirect_url)
    except Exception as callback_error:
        logger.error(f"Error in intra_callback: {callback_error}")
        return HttpResponse("An error occurred in intra_callback", status=500)
