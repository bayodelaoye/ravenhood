from flask.cli import AppGroup
from .users import seed_users, undo_users
from .stocks import seed_stocks, undo_stocks
from .portfolios import seed_portfolios, undo_portfolios
from .watch_lists import seed_watch_lists, undo_watch_lists
from .transactions import seed_transactions, undo_transactions
from .portfolio_stocks import seed_portfolio_stocks, undo_portfolio_stocks
from .watch_list_stocks import seed_watch_list_stocks, undo_watch_list_stocks
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_watch_list_stocks()
        undo_portfolio_stocks()
        undo_transactions()
        undo_watch_lists()
        undo_portfolios()
        undo_stocks()
        undo_users()
    seed_users()
    seed_stocks()
    seed_portfolios()
    seed_watch_lists()
    seed_transactions()
    seed_portfolio_stocks()
    seed_watch_list_stocks()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_watch_list_stocks()
    undo_portfolio_stocks()
    undo_transactions()
    undo_watch_lists()
    undo_portfolios()
    undo_stocks()
    undo_users()
    # Add other undo functions here
