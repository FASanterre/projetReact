"""partisans

Revision ID: 037cdb862031
Revises: db0092c9485d
Create Date: 2020-10-18 14:36:09.427876

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '037cdb862031'
down_revision = 'db0092c9485d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('partisans',
    sa.Column('partisan_id', sa.Integer(), nullable=True),
    sa.Column('utilisateur_qui_est_suivi_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['partisan_id'], ['utilisateur.id'], ),
    sa.ForeignKeyConstraint(['utilisateur_qui_est_suivi_id'], ['utilisateur.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('partisans')
    # ### end Alembic commands ###
