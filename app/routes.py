from flask import render_template, flash, redirect, url_for, request
from app import app
from app.forms import VerificationForm
from flask_login import current_user, login_user, login_required
from app.models import AuthorizationCodes
from werkzeug.urls import url_parse


@app.route('/')
@app.route('/index')
@login_required
def index():
    return render_template('index.html', title='#kiselekovy')


@app.route('/enter', methods=['GET', 'POST'])
def enter():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = VerificationForm()
    if form.validate_on_submit():
        id = AuthorizationCodes.query.filter_by(id=1).first()
        if not id.check_secret(form.secret.data):
            flash('Invalid secret word')
            return redirect(url_for('enter'))
        login_user(id)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('enter.html', title='#kiselekovy', form=form)
