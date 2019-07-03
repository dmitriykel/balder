from flask import request, jsonify, make_response, abort
from api import app, db
from config import Config
from api.models import AuthorizationCodes, Gifts
from datetime import datetime
from flask_cors import cross_origin


def check_authorization(token):
    if not AuthorizationCodes.query.filter_by(user=Config.APP_USER).first().check_token(token):
        return False
    return True


@app.errorhandler(403)
def forbidden(error):
    return make_response(jsonify({'error': "Invalid or no secret word"}), 403)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.errorhandler(406)
def not_acceptable(error):
    return make_response(jsonify({'error': 'Incorrect data format'}), 406)


@app.errorhandler(423)
def locked(error):
    return make_response(jsonify({'error': "Wrong token or expired"}), 423)


@app.errorhandler(500)
def server_error(error):
    return make_response(jsonify({'error': "Problems on server"}), 500)


@app.route('/api/v1.0/gifts', methods=['GET'])
def get_gifts():
    if request.headers is not None and 'Authorization' in request.headers:
        if check_authorization(request.headers['Authorization']):
            gifts_json = []
            gifts_list = Gifts.query.all()
            for gift in gifts_list:
                gift_obj = {
                    "id": gift.id,
                    "type": gift.type,
                    "data": gift.data,
                    "img_url": gift.img_url,
                    "open_date": gift.open_date
                }
                gifts_json.append(gift_obj)
            return jsonify({"gifts": gifts_json})
    abort(423)


@app.route('/api/v1.0/gift/<int:gift_id>', methods=['GET'])
def get_gift(gift_id):
    if request.headers is not None and 'Authorization' in request.headers:
        if check_authorization(request.headers['Authorization']):
            gift = Gifts.query.get(gift_id)
            if gift is None:
                abort(404)
            else:
                gift_obj = {
                    "id": gift.id,
                    "type": gift.type,
                    "data": gift.data
                }
                return jsonify({"gift": gift_obj})
    abort(423)


@app.route('/api/v1.0/gift/add/', methods=['POST'])
def create_gift():
    if request.headers is not None and 'Authorization' in request.headers:
        if check_authorization(request.headers['Authorization']):
            if not request.json \
                    or 'type' not in request.json \
                    or 'data' not in request.json \
                    or 'img_url' not in request.json:
                abort(406)

            gift = Gifts(type=request.json['type'], data=request.json['data'], img_url=request.json['img_url'])
            db.session.add(gift)
            db.session.commit()
            return make_response(jsonify({'success': f'Gift {gift.id} with type {gift.type} was added'}), 200)
    abort(423)


@app.route('/api/v1.0/gift/<int:gift_id>/open', methods=['PUT'])
@cross_origin()
def open_gift(gift_id):
    if request.headers is not None and 'Authorization' in request.headers:
        if check_authorization(request.headers['Authorization']):
            if not request.json or not gift_id or 'open_date' not in request.json:
                abort(406)

            open_date = datetime.fromtimestamp(request.json['open_date'])
            Gifts.query.filter_by(id=gift_id).update({'open_date': open_date})
            db.session.commit()
            return make_response(jsonify({'success': f'Gift {gift_id} opened at {open_date}'}), 200)
    abort(423)


@app.route('/api/v1.0/check_secret', methods=['POST'])
def check_secret():
    secret = AuthorizationCodes.query.filter_by(user=Config.APP_USER).first()

    if not request.json or 'secret' not in request.json:
        abort(403)

    if secret is None or not secret.check_secret(request.json['secret'].lower()):
        abort(403)

    secret.set_token(request.json['secret'])
    db.session.add(secret)
    db.session.commit()

    return make_response(jsonify({'token': secret.token}), 200)
