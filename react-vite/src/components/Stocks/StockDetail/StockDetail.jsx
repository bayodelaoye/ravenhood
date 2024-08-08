// can fetch from our db backend however if we wanted to fetch from external api using js:
// https://www.npmjs.com/package/yahoo-finance
// https://medium.com/justinctollison/using-javascript-fetch-to-grab-yahoo-finance-api-949fd24876c9

from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text
import yfinance as yf
from stocks_ticker_list import iSharesRussell3000ETF

# Adds a demo user, you can add other users here if you want
def seed_stocks():
    stocks = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'META']

    for i in stocks:
        stock = yf.Ticker(i)
        new_stock = Stock(
            company_name=stock.get_info()['shortName'] if 'shortName' in stock.get_info() else 'unavailable',
            ticker_symbol=stock.get_info()['symbol'] if 'symbol' in stock.get_info() else 'unavailable',
            current_price=stock.history()['Close'].iloc[-1] if 'Close' in stock.history() else -1,
            description=stock.get_info()['longBusinessSummary'] if 'longBusinessSummary' in stock.get_info() else 'unavailable',
            ceo=stock.get_info()['companyOfficers'][0]['name'] if 'companyOfficers' in stock.get_info() else 'unavailable',
            employees=stock.get_info()['fullTimeEmployees'] if 'fullTimeEmployees' in stock.get_info() else -1,
            headquarters=stock.get_info()['city'] + stock.get_info()['state'] if 'city' in stock.get_info() and 'state' in stock.get_info() else 'unavailable',
            founded=1,
            market_cap_billions=stock.get_info()['marketCap'] if 'marketCap' in stock.get_info() else -1,
            price_earnings_ratio=stock.get_info()['trailingPE'] if 'trailingPE' in stock.get_info() else -1,
            dividend_yield=round(stock.get_info()['dividendYield'] * 100, 2) if 'dividendYield' in stock.get_info() else -1,
            average_volume=stock.get_info()['averageVolume'] if 'averageVolume' in stock.get_info() else -1,
            high_today=stock.get_info()['dayHigh'] if 'dayHigh' in stock.get_info() else -1,
            low_today=stock.get_info()['dayLow'] if 'dayLow' in stock.get_info() else -1,
            open_price=stock.get_info()['open'] if 'open' in stock.get_info() else -1,
            volume=stock.get_info()['volume'] if 'volume' in stock.get_info() else -1,
            fifty_two_week_high=stock.get_info()['fiftyTwoWeekHigh'] if 'fiftyTwoWeekHigh' in stock.get_info() else -1,
            fifty_two_week_low=stock.get_info()['fiftyTwoWeekLow'] if 'fiftyTwoWeekLow' in stock.get_info() else -1,
            )
