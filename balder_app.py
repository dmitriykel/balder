from api import app, db
import click
from api.models import AuthorizationCodes, Gifts


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'AuthorizationCodes': AuthorizationCodes, 'Gifts': Gifts}


@app.cli.command()
@click.argument('secret_word')
def make_secret(secret_word):
    if not secret_word:
        import random
        import string
        secret_word = ''.join(random.sample(string.ascii_letters, 6))

    m = AuthorizationCodes()
    m.set_secret(secret_word)

    db.session.add(m)
    db.session.commit()

    print(f'Your secret code: {secret_word}')
