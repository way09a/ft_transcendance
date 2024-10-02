#!/bin/sh

set -e

echo "Waiting for postgres..."
while ! nc -z $POSTGRES_HOST 5432; do
  sleep 0.1
done
echo "Postgres is up"


python manage.py makemigrations myapp
python manage.py migrate

exec uvicorn web.asgi:application --host 0.0.0.0 --port 8000