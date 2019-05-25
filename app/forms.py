from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class VerificationForm(FlaskForm):
    secret = StringField('Secret', validators=[DataRequired()])
    submit = SubmitField('Sign In')