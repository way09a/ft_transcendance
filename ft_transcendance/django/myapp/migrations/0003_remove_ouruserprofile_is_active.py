# Generated by Django 4.2.16 on 2024-09-11 14:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_remove_chatmessage_channel_remove_chatmessage_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ouruserprofile',
            name='is_active',
        ),
    ]
