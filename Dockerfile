FROM python:3.7-alpine

WORKDIR /api

COPY . /api

RUN pip install -r requirements.txt && pip install gunicorn
ENV FLASK_APP balder:app

CMD ["gunicorn", "-b", ":5000", "--access-logfile -", "--error-logfile -", "balder:app"]