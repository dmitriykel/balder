from api import app, db
from api.models import AuthorizationCodes, Gifts


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'AuthorizationCodes': AuthorizationCodes, 'Gifts': Gifts}


@app.cli.command()
def make_secret():
    import random
    import string
    secret = ''.join(random.sample(string.ascii_letters, 6))

    m = AuthorizationCodes()
    m.set_secret(secret)

    db.session.add(m)
    db.session.commit()

    print(f'Your secret code: {secret}')
