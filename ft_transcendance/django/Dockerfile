FROM python:3.9-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    DJANGO_SETTINGS_MODULE=web.settings

WORKDIR /app_django

COPY . /app_django/

RUN apt-get update && apt-get install -y netcat-traditional

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./entrypoint.sh /app_django/entrypoint.sh
RUN chmod +x /app_django/entrypoint.sh

RUN python manage.py collectstatic --noinput


ENTRYPOINT ["/app_django/entrypoint.sh"]
