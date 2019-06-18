from app import app, db
from app.models import AuthorizationCodes, Gifts


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'AuthorizationCodes': AuthorizationCodes, 'Gifts': Gifts}
