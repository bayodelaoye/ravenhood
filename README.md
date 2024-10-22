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
     "id": INT,
     "first_name": STRING,
     "last_name": STRING,
     "email": STRING,
     "username": STRING,
     "address": STRING,
     "city": STRING,
     "state": STRING,
     "zip": INT,
     "phone": INT,
     "ssn": INT,
     "birthday": DATE,
     "citizenship": STRING,
     "image": STRING,
     "created_at": DATE,
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
     "id": INT,
     "first_name": STRING,
     "last_name": STRING,
     "email": STRING,
     "username": STRING,
     "address": STRING,
     "city": STRING,
     "state": STRING,
     "zip": INT,
     "phone": INT,
     "ssn": STRING,
     "birthday": DATE,
     "citizenship": STRING,
     "image": STRING,
     "created_at": DATE,
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
     "id": INT,
     "first_name": STRING,
     "last_name": STRING,
     "email": STRING,
     "username": STRING,
     "address": STRING,
     "city": STRING,
     "state": STRING,
     "zip": INT,
     "phone": INT,
     "ssn": INT,
     "birthday": DATE,
     "citizenship": STRING,
     "image": STRING,
     "created_at": DATE,
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
     "id": INT,
     "user_id": INT,
     "portfolio_name": STRING,
     "cash_balance": NUMERIC,
     "total_amount": NUMERIC,
     "is_active": BOOLEAN,
     "updated_at": DATE,
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
        "id": INT,
        "user_id": INT,
        "portfolio_name": STRING,
        "cash_balance": NUMERIC,
        "total_amount": NUMERIC,
        "is_active": BOOLEAN,
        "updated_at": DATE,
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
         "id": INT,
         "portfolio_id": INT,
         "type": STRING,
         "date": DATE,
         "stock": STRING,
         "quantity": INT,
         "transaction_price": NUMERIC,
         "created_at": DATE,
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
     "id": INT,
     "portfolio_id": INT,
     "type": STRING,
     "date": DATE,
     "stock": STRING,
     "quantity": INT,
     "transaction_price": NUMERIC,
     "created_at": DATE,
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
     "id": INT,
     "company_name": STRING,
     "ticker_symbol": STRING,
     "current_price": NUMERIC,
     "description": STRING,
     "ceo": STRING,
     "employeee": INT,
     "headquarters": STRING,
     "founded": INT,
     "market_cap_billions": NUMERIC,
     "price_earnings_ratio": NUMERIC,
     "divident_yield": NUMERIC,
     "average_volume": NUMERIC,
     "high_today": NUMERIC,
     "low_today": NUMERIC,
     "open_price": NUMERIC,
     "volume": NUMERIC,
     "fifty_two_week_high": NUMERIC,
     "fifty_two_week_low": NUMERIC
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
        "id": INT,
        "name": STRING,
        "updated_at": DATE,
        "stocks": ARRAY_OF_STOCK_OBJECTS
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
     "id": INT,
     "user_id": INT,
     "name": STRING,
     "updated_at": DATE
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
#### **Bayode Olaoye**: [LinkedIn](https://www.linkedin.com/in/bayode-olaoye/)
#### **Tyler Kim**: [LinkedIn](https://www.linkedin.com/in/tylothedino/)
