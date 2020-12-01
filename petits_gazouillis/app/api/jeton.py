from flask import jsonify
from app import db
from app.api import bp
from app.api.auth import basic_auth
from app.api.auth import token_auth
from flask_cors import cross_origin

@bp.route('/jeton', methods=['GET'])
@cross_origin()
@basic_auth.login_required
def get_jeton():
    jeton = basic_auth.current_user().get_jeton()
    db.session.commit()
    return jsonify({'jeton': jeton})

@bp.route('/jeton', methods=['DELETE'])
@token_auth.login_required
def effcaer_jeton():
    token_auth.current_user().revoquer_jeton()
    db.session.commit()
    return '', 204