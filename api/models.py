from api import db
from werkzeug.security import generate_password_hash, check_password_hash


class AuthorizationCodes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    secret_hash = db.Column(db.String(128))

    def set_secret(self, secret):
        self.secret_hash = generate_password_hash(secret)

    def check_secret(self, secret):
        return check_password_hash(self.secret_hash, secret)

    def __repr__(self):
        return f'<Authorization ({self.id} {self.secret_hash})>'


class Gifts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(16))
    data = db.Column(db.String(256))
    img_url = db.Column(db.String(128))
    open_date = db.Column(db.DateTime, index=True)

    def __repr__(self):
        return f'<Gift ({self.id} {self.type} {self.data})>'