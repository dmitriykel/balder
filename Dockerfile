FROM python:3.7-alpine

WORKDIR /api

COPY requirements.txt /api

RUN pip install -r requirements.txt && pip install gunicorn

COPY . /api

ENV FLASK_APP balder_app:app