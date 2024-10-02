from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Game_History
from ..serializers import Game_History_Serializer
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Game_History_CreateView(request):
    try:
        user = request.user
        data = request.data.copy()  # Creates a copy of the request data
        data['user'] = user.id  # Adds the authenticated user ID to the data
        serializer = Game_History_Serializer(data=data)
        if serializer.is_valid():
            serializer.save(user=user)
            logger.debug(f"Saved game history for the user: {user}")
            return Response(serializer.data, status=201)
        logger.error(f"Validation error: {serializer.errors}")
        return Response(serializer.errors, status=400)
    except Exception as e:
        logger.error(f"Error saving game history: {str(e)}")
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_Game_History(request, user_id):
    try:
        logger.debug(f"Receiving request to list game history for User with ID: {user_id}")
        game_history = Game_History.objects.filter(user_id=user_id)
        serializer = Game_History_Serializer(game_history, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Error listing game history: {str(e)}")
        return Response({'error': str(e)}, status=400)
