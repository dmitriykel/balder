from api import app, db
from api.models import AuthorizationCodes, Gifts


@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'AuthorizationCodes': AuthorizationCodes, 'Gifts': Gifts}
