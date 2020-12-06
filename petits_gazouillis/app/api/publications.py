from app.api import bp
from app import db, socketio
from app.modeles import Publication, Utilisateur
from flask import jsonify
from flask import request
from flask_login import login_required
from app.api.auth import token_auth
from flask_cors import cross_origin
from flask_login import current_user

@bp.route('/publications2', methods=['GET'])
def get_publications2():
    return "publications2"

@bp.route('/publications/<int:id>', methods=['GET'])
@token_auth.login_required
def get_publication(id):
    return jsonify(Publication.query.get_or_404(id).to_dict())

@bp.route('/publications', methods=['GET'])
@cross_origin()
@token_auth.login_required
def get_publications():
    page = request.args.get('page',1,type=int)
    par_page = min(request.args.get('par_page',10,type=int), 100)
    data= Publication.to_collection_dict(Publication.query, page, par_page, 'api.get_publications', "publications")

    return jsonify(data)


@bp.route('/publications/<int:id>',methods=['PUT'])
def modifier_publication(id):
    return "modifier"

@bp.route('/publications/<int:id>',methods=['DELETE'])
def supprimer_publication(id):
    return "supprimer"



@bp.route('/publicationsCreer/<id>', methods=['POST'])
@cross_origin()
@token_auth.login_required
def cree_publication(id):
    current_user = token_auth.current_user()
    publication = Publication(corps=id.replace("\"",""), auteur=current_user)
    db.session.add(publication)
    db.session.commit()
    return ("OK")

@bp.route('/publications', methods=['POST'])
@cross_origin()
@token_auth.login_required
def creer_publication():
    jeton= request.json["jeton"]
    corps= request.json["corps"]

    print(jeton)
    print(corps)
    print("publier un nouveau message: " + corps)
    u = Utilisateur.query.filter_by(jeton=jeton).first_or_404()
    publication = Publication(corps=corps, auteur=u)
    db.session.add(publication)
    db.session.commit()

    id = publication.utilisateur_id
    socketio.emit('nouvelle_publication', {'id': id, 'corps': publication.corps}, namespace='/chat')

    return jsonify(publication.to_dict())