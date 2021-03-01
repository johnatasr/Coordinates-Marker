FROM python:3.8-slim

ENV PYTHONUNBUFFERED 1

RUN groupadd user && useradd --create-home --home-dir /home/user -g user user
WORKDIR /var/www/app/backend


RUN apt-get update && apt-get install gcc build-essential python3-psycopg2 libpq-dev -y && \
    python3 -m pip install --no-cache-dir pip-tools

COPY ./requirements.txt /var/www/app/backend

RUN pip install psycopg2-binary
RUN pip install -r requirements.txt


RUN apt-get purge libpq-dev -y && apt-get autoremove -y && \
    rm /var/lib/apt/lists/* rm -rf /var/cache/apt/*

COPY . /var/www/app/backend/

USER user

CMD ["sh","-c", \
    "sleep 4s && \
     python manage.py makemigrations && \
     python manage.py migrate && \
     gunicorn cni.wsgi --log-file - -b 0.0.0.0:8000 --reload"]


