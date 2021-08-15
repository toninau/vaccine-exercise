# vaccination-exercise

Solita Dev Academy exercise. 

> https://vaccine-exercise-tn.herokuapp.com/

Client was made using create-react-app typescript template and styled using material-ui.

Server is a node.js typescript application that uses express and mongoose + other smaller packages.

ESLint is utilized in both client and server side + Tests use Jest.

MongoDB database.

## About the exercise

Make a web application for presenting some interesting data about the vaccinations.

- The Orders are in different files named by the manufacturer of a vaccine.
- Injections must be used in 30 days after the arrival of the bottle.
- [name].source "Zerpfy"|"Antiqua"|"SolarBuddhica"
- The source file has one json item per line.

### Features from list of interesting things

For given day like 2021-04-12T11:10:06

* How many orders and vaccines have arrived total? ✅
* How many of the vaccinations have been used? ✅
* How many orders/vaccines per producer? ✅
* How many bottles have expired on the given day (remember a bottle expires 30 days after arrival) ✅
* How many vaccines expired before the usage -> remember to decrease used injections from the expired bottle ✅
* How many vaccines are left to use? ✅
* How many vaccines are going to expire in the next 10 days? ✅

## Running locally

### Database

This application uses MongoDB for database.

I used MongoDB Atlas but if you have MongoDB installed locally you can just use that instead.

Two databases have to be created:
1. vaccines (for main application)
2. vaccines-test (for running the API tests)

### .ENV

Create .env file to the root of the server folder.

```
~/<YOUR_PATH>/vaccine-exercise $ cd server
~/<YOUR_PATH>/vaccine-exercise/server $ touch .env
```

Environment variables needed inside of the .env:
```
PORT=3001
DATABASE_URL=mongodb+srv://<USERNAME>:<PASSWORD>@<HOST>/vaccines?retryWrites=true&w=majority

TEST_DATABASE_URL=mongodb+srv://<USERNAME>:<PASSWORD>@<HOST>/vaccines-test?retryWrites=true&w=majority
```

⚠️ APPLICATION WON'T START IF DATABASE_URL IS MISSING ⚠️

### Install

To install all the dependencies for both the client and the server side.

```
~/<YOUR_PATH>/vaccine-exercise $ npm run install:both
```

To install separately.

```
~/<YOUR_PATH>/vaccine-exercise $ cd server
~/<YOUR_PATH>/vaccine-exercise/server $ npm install
~/<YOUR_PATH>/vaccine-exercise/server $ cd ../client
~/<YOUR_PATH>/vaccine-exercise/client $ npm install
```

### Build

To build both the client and the server side of the application.

```
~/<YOUR_PATH>/vaccine-exercise $ npm run build:both
```

To build separately.

```
~/<YOUR_PATH>/vaccine-exercise $ cd server
~/<YOUR_PATH>/vaccine-exercise/server $ npm run tsc
~/<YOUR_PATH>/vaccine-exercise/server $ cd ../client
~/<YOUR_PATH>/vaccine-exercise/client $ npm run build
```

### Test

Currently only the server side of this application has tests.

```
~/<YOUR_PATH>/vaccine-exercise $ cd server
~/<YOUR_PATH>/vaccine-exercise/server $ npm test
```

And of course for the API tests to work, you need to have TEST_DATABASE_URL variable in your .env 

### Before running

Before running the application, you have to initialize the database with order and vaccination data.

To initialize the database, you can use:
1. [mongoimport](https://docs.mongodb.com/database-tools/mongoimport/)
2. [mongodb compass](https://docs.mongodb.com/compass/current/import-export/)
3. db-init script

Running db-init script:

```
~/<YOUR_PATH>/vaccine-exercise $ cd server
~/<YOUR_PATH>/vaccine-exercise/server $ npm run db-init
```

This script initializes the database with data, but only if it's empty. To reinitialize the database you have to manually delete all the collections in the database (orders and vaccinations).

### Run

Running the built version of the app:

```
~/<YOUR_PATH>/vaccine-exercise $ cd server
~/<YOUR_PATH>/vaccine-exercise/server $ npm start
```

Running the development version of the server:

```
~/<YOUR_PATH>/vaccine-exercise $ cd server
~/<YOUR_PATH>/vaccine-exercise/server $ npm run dev
```

Running in development version of the client:

```
~/<YOUR_PATH>/vaccine-exercise $ cd client
~/<YOUR_PATH>/vaccine-exercise/server $ npm start
```

## API

Date must be ISO 8601 format.
- 2016-05-25
- 2016-05-25T09:24:15

More info about the parsable date formats [here](https://moment.github.io/luxon/#/parsing?id=iso-8601)

### Get a specific order
#### Request

`GET /api/orders/:id`

#### Response

```JSON
{
    "id": "6da3a8cf-c923-4c77-8f80-c69c935fe1df",
    "orderNumber": 1,
    "responsiblePerson": "Joonatan Siloma",
    "healthCareDistrict": "KYS",
    "vaccine": "Antiqua",
    "injections": 4,
    "arrived": "2021-01-11T08:59:28.642Z"
}
```

### Get order/vaccine data per producer
#### Request

`GET /api/orders/producer?date=:date`

#### Response

```JSON
[
    {
        "bottles": 23,
        "injectionsInBottles": 92,
        "vaccine": "Antiqua"
    },
    {
        "bottles": 18,
        "injectionsInBottles": 108,
        "vaccine": "SolarBuddhica"
    },
    {
        "bottles": 20,
        "injectionsInBottles": 100,
        "vaccine": "Zerpfy"
    }
]
```

### Get orders and vaccines arrived in total
#### Request

`GET /api/orders/total?date=:date`

#### Response

```JSON
{
    "bottles": 5000,
    "injectionsInBottles": 25015
}
```

### Get orders and vaccines expiring in the next 10 days
#### Request

`GET /api/orders/expiring10d?date=:date`

#### Response

```JSON
[
    {
        "expiredBottles": 179,
        "injectionsInBottles": 716,
        "usedInjections": 212,
        "expiredInjections": 504,
        "vaccine": "Antiqua"
    },
    {
        "expiredBottles": 186,
        "injectionsInBottles": 1116,
        "usedInjections": 303,
        "expiredInjections": 813,
        "vaccine": "SolarBuddhica"
    },
    {
        "expiredBottles": 184,
        "injectionsInBottles": 920,
        "usedInjections": 265,
        "expiredInjections": 655,
        "vaccine": "Zerpfy"
    }
]
```

### Get expired orders and vaccines
#### Request

`GET /api/orders/expired?date=:date`

#### Response

```JSON
[
    {
        "expiredBottles": 1150,
        "injectionsInBottles": 4600,
        "usedInjections": 1283,
        "expiredInjections": 3317,
        "vaccine": "Antiqua"
    },
    {
        "expiredBottles": 1163,
        "injectionsInBottles": 6978,
        "usedInjections": 1937,
        "expiredInjections": 5041,
        "vaccine": "SolarBuddhica"
    },
    {
        "expiredBottles": 1169,
        "injectionsInBottles": 5845,
        "usedInjections": 1613,
        "expiredInjections": 4232,
        "vaccine": "Zerpfy"
    }
]
```

### Get a specific vaccination
#### Request

`GET /api/vaccinations/:id`

#### Response

```JSON
{
    "vaccination-id": "3d3440e2-357b-4139-857b-027d8bdcb85b",
    "sourceBottle": "75ae9638-3ad5-4433-9e94-55cc2e36c777",
    "gender": "female",
    "vaccinationDate": "2021-03-07T19:23:29.670Z"
}
```

### Get vaccinations data (how many used and left to use)
#### Request

`GET /api/vaccinations?date=:date`

#### Response

```JSON
{
    "used": 172,
    "usable": 5353
}
```
