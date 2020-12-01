from datetime import datetime, timedelta
import unittest
from app import app, db
from app.modeles import Utilisateur, Publication

class CasModeleUtilisateur(unittest.TestCase):
    def setUp(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_mot_de_passe_hashing(self):
        u = Utilisateur(nom='patate')
        u.enregistrer_mot_de_passe('Password1')
        self.assertFalse(u.valider_mot_de_passe('Mot de passe invalide'))
        self.assertTrue(u.valider_mot_de_passe('Password1'))

    def test_partisans(self):
        u1 = Utilisateur(nom='patate', courriel='patate@example.com')
        u2 = Utilisateur(nom='tomate', courriel='tomate@example.com')
        db.session.add(u1)
        db.session.add(u2)
        db.session.commit()

        self.assertEqual(u1.les_partisans.all(), [])
        self.assertEqual(u1.partisans.all(), [])

        u1.devenir_partisan(u2)
        db.session.commit()

        self.assertTrue(u1.est_partisan(u2))
        self.assertEqual(u1.les_partisans.count(), 1)

        self.assertTrue(u1.est_partisan(u2))
        self.assertEqual(u1.les_partisans.count(), 1)
        self.assertEqual(u1.les_partisans.first().nom, 'tomate')
        self.assertEqual(u2.partisans.count(), 1)
        self.assertEqual(u2.partisans.first().nom, 'patate')

        u1.ne_plus_etre_partisan(u2)
        db.session.commit()

        self.assertFalse(u1.est_partisan(u2))
        self.assertEqual(u1.les_partisans.count(), 0)
        self.assertEqual(u2.partisans.count(), 0)

    def test_publications_suivies(self):
        # create four users
        u1 = Utilisateur(nom='patate', courriel='patate@example.com')
        u2 = Utilisateur(nom='tomate', courriel='tomate@example.com')
        u3 = Utilisateur(nom='salade', courriel='salade@example.com')
        u4 = Utilisateur(nom='radis', courriel='radis@example.com')
        db.session.add_all([u1, u2, u3, u4])

        # create four posts
        maintenant = datetime.utcnow()
        p1 = Publication(corps="publication from patate", auteur=u1,
                  horodatage=maintenant + timedelta(seconds=1))
        p2 = Publication(corps="publication from tomate", auteur=u2,
                  horodatage=maintenant + timedelta(seconds=4))
        p3 = Publication(corps="publication from salade", auteur=u3,
                  horodatage=maintenant + timedelta(seconds=3))
        p4 = Publication(corps="publication from radis", auteur=u4,
                  horodatage=maintenant + timedelta(seconds=2))
        db.session.add_all([p1, p2, p3, p4])
        db.session.commit()

        # setup the followers
        u1.devenir_partisan(u2)  # john follows susan
        u1.devenir_partisan(u4)  # john follows david
        u2.devenir_partisan(u3)  # susan follows mary
        u3.devenir_partisan(u4)  # mary follows david
        db.session.commit()

        # check the followed posts of each user
        f1 = u1.liste_publications_dont_je_suis_partisan().all()
        f2 = u2.liste_publications_dont_je_suis_partisan().all()
        f3 = u3.liste_publications_dont_je_suis_partisan().all()
        f4 = u4.liste_publications_dont_je_suis_partisan().all()
        self.assertEqual(f1, [p2, p4, p1])
        self.assertEqual(f2, [p2, p3])
        self.assertEqual(f3, [p3, p4])
        self.assertEqual(f4, [p4])

if __name__ == '__main__':
    unittest.main(verbosity=2)