from app import db, authorize
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class AuthorizationCodes(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    secret_hash = db.Column(db.String(128))

    def set_secret(self, secret):
        self.secret_hash = generate_password_hash(secret)

    def check_secret(self, secret):
        return check_password_hash(self.secret_hash, secret)

    def __repr__(self):
        return '<Authorization id {}>'.format(self.id)


class Surprises(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(140))
    released = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<Surprises {}>'.format(self.body)


@authorize.user_loader
def load_user(id):
    return AuthorizationCodes.query.get(int(id))
