from app.api import bp
from app import db
from app.modeles import Utilisateur
from flask import jsonify
from flask import request
from flask_cors import cross_origin
from app.api.auth import token_auth
from flask_login import current_user

@bp.route('/utilisateurs2', methods=['GET'])
def get_utilisateurs2():
    return "utilisateurs2"

@bp.route('/utilisateurs/<int:id>', methods=['GET'])
def get_utilisateur(id):
    return jsonify(Utilisateur.query.get_or_404(id).to_dict())

@bp.route('/utilisateurs', methods=['GET'])
@cross_origin()
@token_auth.login_required
def get_utilisateurs():
    page = request.args.get('page',1,type=int)
    par_page = min(request.args.get('par_page',10,type=int), 100)
    data= Utilisateur.to_collection_dict(Utilisateur.query, page, par_page, 'api.get_utilisateurs', "utilisateurs")

    return jsonify(data)

@bp.route('/suivre/<id>', methods=['POST'])
@cross_origin()
@token_auth.login_required
def suivre(id):
    current_user = token_auth.current_user()
    user = Utilisateur.query.filter_by(id=id).first()
    print(user.id)
    if user is None:
        return jsonify({'erreur': "utilisateur inexistant"})
    if user.id == current_user.id:
         return jsonify({'erreur': "utilisateur ne peut se suivre"})
    current_user.devenir_partisan(user)
    db.session.commit()
    return  jsonify({'suivre':'suivre'})

@bp.route('/ne_plus_suivre/<id>', methods=['POST'])
@cross_origin()
@token_auth.login_required
def ne_plus_suivre(id):
    current_user = token_auth.current_user()
    user = Utilisateur.query.filter_by(id=id).first()
    print(user.id)
    if user is None:
        return jsonify({'erreur': "utilisateur inexistant"})
    if user.id == current_user.id:
        return jsonify({'erreur': "utilisateur ne peut pas ne plus se suivre"})
    current_user.ne_plus_etre_partisan(user)
    db.session.commit()
    return jsonify({'suivre':'ne_plus_suivre'})

@bp.route('/utilisateurs',methods=['POST'])
def creer_utilisateur():
    return "creer"

@bp.route('/utilisateurs/<int:id>',methods=['PUT'])
def modifier_utilisateur(id):
    return "modifier"

@bp.route('/utilisateurs/<int:id>',methods=['DELETE'])
def supprimer_utilisateur(id):
    return "supprimer"