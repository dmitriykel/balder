from api import db
from datetime import datetime, timedelta
from config import Config
from werkzeug.security import generate_password_hash, check_password_hash


class AuthorizationCodes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(16), default=Config.APP_USER)
    secret_hash = db.Column(db.String(128))
    token = db.Column(db.String(128))
    expiration_date = db.Column(db.DateTime)

    def set_secret(self, secret):
        self.secret_hash = generate_password_hash(secret)

    def set_token(self, secret):
        self.token = generate_password_hash(secret + datetime.now().strftime('%m-%d-%Y,%H:%M:%S'))
        self.expiration_date = datetime.now() + timedelta(days=7)

    def check_token(self, token):
        if token == self.token and datetime.now() < self.expiration_date:
            return True
        else:
            return False

    def check_secret(self, secret):
        return check_password_hash(self.secret_hash, secret)

    def __repr__(self):
        return f'<Authorization ({self.id} {self.user})>'


class Gifts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(16))
    data = db.Column(db.String(256))
    img_url = db.Column(db.String(128))
    open_date = db.Column(db.DateTime, index=True)

    def __repr__(self):
        return f'<Gift ({self.id} {self.type} {self.data})>'
