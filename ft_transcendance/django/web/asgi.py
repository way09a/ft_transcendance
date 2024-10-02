import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings')
django.setup()  # Make sure Django is initialized

# Defining WebSocket routing
def get_websocket_urlpatterns():
    from django.urls import re_path
    from myapp.onlineConsumer import online_status

    return [
        re_path(r'ws/status/(?P<user_id>\d+)/$', online_status.as_asgi()),
    ]

# Configuring the ASGI application
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            get_websocket_urlpatterns()
        )
    ),
})
