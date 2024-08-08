// can fetch from our db backend however if we wanted to fetch from external api using js:
// https://www.npmjs.com/package/yahoo-finance
// https://medium.com/justinctollison/using-javascript-fetch-to-grab-yahoo-finance-api-949fd24876c9


from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text
import yfinance as yf
from .stocks_ticker_list import iSharesRussell3000ETF

def seed_stocks():
    stocks = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'META']

    for i in stocks:
        stock = yf.Ticker(i)
        new_stock = Stock(

            ticker_symbol=stock.get_info()['symbol'] if 'symbol' in stock.get_info() else 'unavailable',
            one_day_micrograph
            current_price=stock.history()['Close'].iloc[-1] if 'Close' in stock.history() else -1,
        )
