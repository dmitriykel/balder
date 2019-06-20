FROM python:3.7-alpine

WORKDIR /balder

COPY config.py /balder/config.py
COPY balder_app.py /balder/balder_app.py
COPY requirements.txt /balder/requirements.txt
COPY migrations /balder/migrations
COPY app/__init__.py /balder/app/__init__.py
COPY app/models.py /balder/app/models.py
COPY app/routes.py /balder/app/routes.py

RUN pip install -r requirements.txt
RUN flask db upgrade
ENV FLASK_APP balder_app.py

EXPOSE 3000
CMD ["flask", "run", "--port=3000"]