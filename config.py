import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'data/db_data.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    APP_USER = os.environ.get('APP_USER') or 'balder'
