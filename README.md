# Ravenhood

Ravenhood is a financial application that displays over 500 stocks and provides information about a company. The application allows users to create, read, update and delete portfolios as well as make transactions in the form of buys and sells. 

# Live Link
https://ravenhood-project.onrender.com

## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
  
 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Index

[Feature List](https://github.com/bayodelaoye/ravenhood/wiki/Feature-List) | [Database Schema](https://github.com/bayodelaoye/ravenhood/wiki/Database-Schema) | [User Stories](https://github.com/bayodelaoye/ravenhood/wiki/User-Stories) | [Tasks](https://github.com/bayodelaoye/ravenhood/wiki/Tasks)

# Landing Page
<img width="600px" src="https://github.com/bayodelaoye/ravenhood/blob/main/react-vite/public/home-page.png" />

 # Stock Details Page
<img width="600px" src="https://github.com/bayodelaoye/ravenhood/blob/main/react-vite/public/stock-details-page.png" />

# Portfolio Page
<img width="600px" src="https://github.com/bayodelaoye/ravenhood/blob/main/react-vite/public/portfolio-page.png" />

# Endpoints

## Auth Routes

### Current User
##
* Purpose: This fetch is sent upon initial app load and on subsequent refreshes and navigations. It returns an object representing the current user, if user is logged in.
* Method: ```POST```
* URL: ```/api/auth/```
* Successful Response: HTTP Status Code 200
```python
{
     "id": self.id,
     "first_name": self.first_name,
     "last_name": self.last_name,
     "email": self.email,
     "username": self.username,
     "address": self.address,
     "city": self.city,
     "state": self.state,
     "zip": self.zip,
     "phone": self.phone,
     "ssn": self.ssn,
     "birthday": self.birthday,
     "citizenship": self.citizenship,
     "image": self.image,
     "created_at": self.created_at,
}
```
* Error Response: HTTP Status Code 401
```python
{
  'errors': 'Unauthorized'
}
```
### Unauthorized (from @login_required)
##
* Purpose: This endpoint will be routed to in the case that a protected route does not pass validations for the current user.
* Method ```POST```
* URL: ```/api/auth/unauthorized```
* Successful Response: NA 
* Error Response: HTTP Status Code 401
```python
{
  'errors': 'Unauthorized'
}
```
### Sign Up
##
* Purpose: This fetch sends the signup form data to the backend to process the creation of a new user.
* Method: ```POST```
* URL: ```/api/auth/signup```
* Successful Response: HTTP Status 201
```python
{
     "id": self.id,
     "first_name": self.first_name,
     "last_name": self.last_name,
     "email": self.email,
     "username": self.username,
     "address": self.address,
     "city": self.city,
     "state": self.state,
     "zip": self.zip,
     "phone": self.phone,
     "ssn": self.ssn,
     "birthday": self.birthday,
     "citizenship": self.citizenship,
     "image": self.image,
     "created_at": self.created_at,
}
```
* Error Response: HTTP Status 400
```python
{
   'errors': ARRAY_OF_STRINGS
}
```
### Login
##
* Purpose: This fetch attempts to login a user with the provided credentials.
* Method: ```POST```
* URL: ```/api/auth/login```
* Successful Response: HTTP Status 200
```python
{
     "id": self.id,
     "first_name": self.first_name,
     "last_name": self.last_name,
     "email": self.email,
     "username": self.username,
     "address": self.address,
     "city": self.city,
     "state": self.state,
     "zip": self.zip,
     "phone": self.phone,
     "ssn": self.ssn,
     "birthday": self.birthday,
     "citizenship": self.citizenship,
     "image": self.image,
     "created_at": self.created_at,
}
```
* Error Response: HTTP Status 400
```python
{
   'errors': ARRAY_OF_STRINGS
}
```
### Logout
##
* Purpose: This fetch will logout the current user.
* Method: ```POST```
* URL: ```/api/auth/logout```
* Successful Response: HTTP Status 200
```python
{
   'message': 'User logged Out'
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'No session'
}
```

## Portfolio Routes

### Create new Portfolio
##
* Purpose: This fetch is sent to create a new portfolio.
* Method: ```POST```
* URL: ```/api/portfolios/```
* Body:
```python
{
   'portfolio_name': "New Portfolio",
   'cash_balance': 100,
   'total_amount': 500,
   'is_active': true,
}
```
* Successful Response: HTTP Status 201
```python
{
     "id": self.id,
     "user_id": self.user_id,
     "portfolio_name": self.portfolio_name,
     "cash_balance": self.cash_balance,
     "total_amount": self.total_amount,
     "is_active": self.is_active,
     "updated_at": self.updated_at,
}
```
* Error Response: HTTP Status 400
```python
{
   'error': "Invalid data"
}
```

### Update Portfolio
##
* Purpose: This fetch is sent to update the name and or the cash balance of a portfolio.
* Method: ```PUT```
* URL: ```/api/portfolios/<int:id>```
* Body:
```python
{
   'portfolio_name': "Updated Portfolio name",
   'cash_balance': 600,
}
```
* Successful Response: HTTP Status 200
```python
{
     "message": "Updated portfolio"
}
```
* Error Response1: HTTP Status 404
```python
{
   'errors': 'Portfolio not found'
}
```
* Error Response2: HTTP Status 400
```python
{
   'errors': ARRAY_OF_STRINGS
}
```

### Delete Portfolio
##
* Purpose: This fetch is sent to delete a portfolio.
* Method: ```DELETE```
* URL: ```/api/portfolios/<int:id>```
* Successful Response: HTTP Status 200
```python
{
   'message': 'Portfolio deleted'
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Portfolio with given id Not Found'
}
```

## User Routes

### Get User Portfolios
##
* Purpose: This fetch is sent to retrieve all the portfolios for a user.
* Method: ```GET```
* URL: ```/api/users/<int:id>/portfolios```
* Successful Response: HTTP Status 200
```python
[
   {
        "id": self.id,
        "user_id": self.user_id,
        "portfolio_name": self.portfolio_name,
        "cash_balance": self.cash_balance,
        "total_amount": self.total_amount,
        "is_active": self.is_active,
        "updated_at": self.updated_at,
   }
]
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Get User Transactions
##
* Purpose: This fetch is sent to retrieve all the transactions for a user.
* Method: ```GET```
* URL: ```/api/users/<int:user_id>/transactions```
* Success Response: HTTP Status 200
```python
[
   {
         "id": self.id,
         "portfolio_id": self.portfolio_id,
         "type": self.type,
         "date": self.date,
         "stock": self.stock,
         "quantity": self.quantity,
         "transaction_price": self.transaction_price,
         "created_at": self.created_at,
   }
]
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

## Transaction Routes

### Create new a Transaction Record
* Purpose: This fetch is sent to add a new entry to the transactions table.
* Method: ```POST```
* URL: ```/api/transactions/```
* Body:
```python
{
     portfolio_id: 1,
     type: "BUY",
     quantity: 10,
     ticker: "AAPL",
}
```
* Successful Response: HTTP 201
```python
{
     "id": self.id,
     "portfolio_id": self.portfolio_id,
     "type": self.type,
     "date": self.date,
     "stock": self.stock,
     "quantity": self.quantity,
     "transaction_price": self.transaction_price,
     "created_at": self.created_at,
}
```
* Error Response1: HTTP Status 400
```python
{
   'errors': ARRAY_OF_STRINGS
}
```
* Error Response2: HTTP Status 404
```python
{
   'errors': 'Portfolio with given id Not Found'
}
```

## Stock Routes

### Get Stocks
##
* Purpose: This fetch is sent to retrieve a stock by its id.
* Method: ```GET```
* URL: ```/api/stocks/<int:stock_id>```
* Successful Response: HTTP Status 200
```python
{
     "id": self.id,
     "company_name": self.company_name,
     "ticker_symbol": self.ticker_symbol,
     "current_price": self.current_price,
     "description": self.description,
     "ceo": self.ceo,
     "employeee": self.employees,
     "headquarters": self.headquarters,
     "founded": self.founded,
     "market_cap_billions": self.market_cap_billions,
     "price_earnings_ratio": self.price_earnings_ratio,
     "divident_yield": self.dividend_yield,
     "average_volume": self.average_volume,
     "high_today": self.high_today,
     "low_today": self.low_today,
     "open_price": self.open_price,
     "volume": self.volume,
     "fifty_two_week_high": self.fifty_two_week_high,
     "fifty_two_week_low": self.fifty_two_week_low
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

## Watchlist Routes

### Get Watchlists
##
* Purpose: This fetch is sent to retrieve all the Watchlists.
* Method: ```GET```
* URL: ```/api/watch_lists/```
* Successful Response: HTTP Status 200
```python
[
   {
        "id": self.id,
        "name": self.name,
        "updated_at": self.updated_at,
        "stocks": [stock.to_dict() for stock in self.watch_list_watch_list_stocks]
   }
]
```
* Error Response: HTTP Status 401
```python
{
   'errors': 'Unauthorized'
}
```

### Create a WatchList
##
* Purpose: This fetch is sent to add a new watch list to the watch lists table.
* Method: ```POST```
* URL: ```/api/watch_lists/```
* Body:
```python
   {
      "name": "New Watch List"  
   }
```
* Success Response: HTTP Status 201
```python
{
     "id": self.id,
     "user_id": self.user_id,
     "name": self.name,
     "updated_at": self.updated_at
}
```
* Error Response: HTTP Status 400
```python
{
   'errors': "Length of name exceeds 30"
}
```

### Update WatchList Record
##
* Purpose: This fetch is sent to update the watch list record specified by its id.
* Method: ```PUT```
* URL: ```/api/watch_lists/<int:id>```
* Body:
```python
   {
      "name": "Updated Watch List Name" 
   }
```
* Successful Response: HTTP Status 200
```python
{
     "message": "Updated watch list name"
}
```
* Error Response1: HTTP Status 400
```python
{
   'errors': " Length of name exceeds 30"
}
```
* Error Response2: HTTP Status 404
```python
{
   'errors': 'Not Found'
}
```

### Delete WatchList Record
##
* Purpose: This fetch sends a watch list's id in the url of the request of the record to be deleted.
* Method: ```DELETE```
* URL: ```/api/watch_lists/<int:id>```
* Successful Response: HTTP Status 200
```python
{
     'message' : 'Watch list deleted'
}
```
* Error Response: HTTP Status 404
```python
{
   'errors': 'Watch list Record with given id Not Found'
}
```

# Feature List
1. Portfolio
2. Transaction
3. Stock
4. WatchList

# Connect
[LinkedIn](https://www.linkedin.com/in/bayode-olaoye/)
