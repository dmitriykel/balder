from flask import request, jsonify, make_response, abort
from app import app, db
from app.models import AuthorizationCodes, Gifts


@app.errorhandler(403)
def forbidden():
    return make_response(jsonify({'error': 'Invalid or no secret word.'}), 403)


@app.errorhandler(404)
def not_found():
    return make_response(jsonify({'error': 'Not found.'}), 404)


@app.errorhandler(406)
def not_acceptable():
    return make_response(jsonify({'error': 'Incorrect data format'}), 406)


@app.route('/balder/api/v1.0/gifts', methods=['GET'])
def get_gifts():
    gifts_json = []
    gifts_list = Gifts.query.all()
    for gift in gifts_list:
        gift_obj = {
            "id": gift.id,
            "type": gift.type,
            "data": gift.data
        }
        gifts_json.append(gift_obj)
    return jsonify({"gifts": gifts_json})


@app.route('/balder/api/v1.0/gift/<int:gift_id>', methods=['GET'])
def get_gift(gift_id):
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


@app.route('/balder/api/v1.0/gift/add/', methods=['POST'])
def create_gift():
    if not request.json or 'type' not in request.json or 'data' not in request.json:
        abort(406)

    gift = Gifts(type=request.json['type'], data=request.json['data'])
    db.session.add(gift)
    db.session.commit()
    return make_response(jsonify({'success': f'Gift {gift.id} with type {gift.type} has added'}), 200)


@app.route('/balder/api/v1.0/check_secret', methods=['POST'])
def check_secret():
    secret_hash = AuthorizationCodes.query.get(1)

    if not request.json or 'secret' not in request.json:
        abort(403)

    if not secret_hash.check_secret(request.json['secret']):
        abort(403)

    return make_response(jsonify({'success': 'Welcome on board!'}), 200)
