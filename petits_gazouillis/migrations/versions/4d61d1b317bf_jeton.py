"""jeton

Revision ID: 4d61d1b317bf
Revises: 037cdb862031
Create Date: 2020-10-26 20:34:41.767303

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d61d1b317bf'
down_revision = '037cdb862031'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('utilisateur', sa.Column('jeton', sa.String(length=32), nullable=True))
    op.add_column('utilisateur', sa.Column('jeton_expiration', sa.DateTime(), nullable=True))
    op.create_index(op.f('ix_utilisateur_jeton'), 'utilisateur', ['jeton'], unique=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_utilisateur_jeton'), table_name='utilisateur')
    op.drop_column('utilisateur', 'jeton_expiration')
    op.drop_column('utilisateur', 'jeton')
    # ### end Alembic commands ###