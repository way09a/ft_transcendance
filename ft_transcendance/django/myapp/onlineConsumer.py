from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model

class online_status(AsyncWebsocketConsumer):
    async def connect(self):
        self.account_id = self.scope['url_route']['kwargs']['user_id']
        account = await self.user_get(self.account_id)
        if account:
            await self.accept()
            await self.user_statu_set(account_id=self.account_id, online=True)
            await self.send(text_data=json.dumps({
                'message': f'{account.username} connected'
            }))
        else:
            await self.send(text_data=json.dumps({
                'error': 'User not found'
            }))
            await self.close()

    async def disconnect(self, close_code):
        Account = await self.user_get(self.account_id)
        if Account:
            await self.user_statu_set(account_id=self.account_id, online=False)

    async def receive(self, text_data):
        pass

    @database_sync_to_async
    def user_get(self, account_id):
        Account = get_user_model()  # Call within function
        try:
            return Account.objects.get(pk=account_id)
        except Account.DoesNotExist:
            print(f"User with ID {account_id} not found.")
            return None

    @database_sync_to_async
    def user_statu_set(self, account_id, online):
        Account = get_user_model()  # Call within function
        Account.objects.filter(pk=account_id).update(is_online=online)
