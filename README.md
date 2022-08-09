# Schedule Ticketing System

## _Description_

A simple Ticketing System made using node/express/mongo. User types are "admin", and "employees". Ticket CRUD operations, closing a ticket according to their priority, etc. Used TypeScript as the dev language [code is in `./src`], for `js` implementation look for `./dist` folder.

## Live at [heroku](http://nodejs-ticketing-system.herokuapp.com/)

## Installation

#### 1) Clone the repository:
    git clone https://github.com/SD170/nodejs-ticketing-system
#### 2) Install all the dependencies:
On the project root folder, run:
    
    npm install
#### 3) Start the MongoDB in your os:
Run MongoDB as a service, and make sure to know the port no (27017 by default).
For Ubuntu (in my case) to start MongoDB as a service run the following commands in a terminal:
```
sudo service mongod start
```
after that:
```
mongosh
```
this will start the service. So, let it keep running.

#### 4) Add a config.env file:
We have used MongoDB as our database. So, in order to connect to the local database, we'll need 3 values, and we've kept it in **config.env** in tha path-  **/config**:
    
- Create a file named **config.env** inside the folder, **/config**.
- Add 3 env variables eg:
    ```
    MONGOHOST=localhost
    MONGOPORT=27017
    MONGOUSER=<Your user>
    MONGOPASSWORD=<Your pass>
    DATABASENAME=<Your DB name>
    ```
#### 5) Start the project:
From the root folder, start the project by running:
   
    npm start
    
## Features and endpoints

In case you have Postman installed, you can import the endpoints **with documentation** inside
`_data/Schedule management system.postman_collection.json`
or click [here](https://github.com/SD170/nodejs-ticketing-system/blob/master/_data/interim.postman_collection.json).

Otherwise, I'm adding the endpoints with a brief description and `the live links.

##### 1) [/api/v1/users/new](https://nodejs-ticketing-system.herokuapp.com/api/v1/users/new) [Method: POST]
###### Description:
Creates a user, admin/employee.
###### Header:
_**Authorization**_: **jwt <JWT token of the user>** [returned form `/api/v1/users/new`]
###### Body:
_**username**_: Username of the user [Must be unique] [REQUIRED]

_**role**_: Role of the user [options: admin/employee]
###### Query-params:
*Empty*
###### Access:
*Public*
****
##### 1) [/api/v1/tickets/new](https://nodejs-ticketing-system.herokuapp.com/api/v1/tickets/new) [Method: POST]
###### Description:
Creates a new ticket.
###### Header:
_**Authorization**_: **jwt <JWT token of the user>** [returned form `/api/v1/users/new`]
###### Body:
_**title**_: Title of the ticket [Must be unique]  [REQUIRED]

_**description**_: Ticket description [REQUIRED]

_**assignedTo**_: Username of the employee [REQUIRED]

_**status**_: status [options: open/close, default: open]  [_optional_]

_**priority**_: priority [options: high/medium/low, default: low]  [_optional_] 

###### Query-params:
*Empty*
###### Access:
*Private: Admin*
****
##### 2) [/api/v1/tickets/all](https://nodejs-ticketing-system.herokuapp.com/api/v1/tickets/all) [Method: GET]
###### Description:
List all tickets.
###### Header:
*Empty*
###### Body:
*Empty*
###### Query-params:
*Empty*
###### Access:
*Public*
****
##### 3) [/api/v1/tickets](https://nodejs-ticketing-system.herokuapp.com/api/v1/tickets) [Method: GET]
###### Description:
Query all tickets.
###### Header:
*Empty*
###### Body:
*Empty*
###### Query-params:
_**title**_: Title of the ticket

_**status**_: status [options: open/close, default: open]

_**priority**_: priority [options: high/medium/low, default: low]
###### Access:
*Public*
****
##### 4) [/api/v1/tickets/markAsClosed](https://nodejs-ticketing-system.herokuapp.com/api/v1/tickets/markAsClosed) [Method: POST]
###### Description:
Closes a ticket [`Only if there's no high priority ticket assigned to the employee`]
###### Header:
_**Authorization**_: **jwt <JWT token of the user>** [returned form `/api/v1/users/new`]
###### Body:
_**ticketID**_: Id of the ticket [REQUIRED]
###### Query-params:
*Empty*
###### Access:
*Private: Assigned Employee or Admin*
****
##### 5) [/api/v1/tickets/delete](https://nodejs-ticketing-system.herokuapp.com/api/v1/tickets/delete) [Method: POST]
###### Description:
Deletes a ticket
###### Header:
_**Authorization**_: **jwt <JWT token of the user>** [returned form `/api/v1/users/new`]
###### Body:
_**ticketID**_: Id of the ticket [REQUIRED]
###### Query-params:
*Empty*
###### Access:
*Private: Admin*
****

## Tech Stack

Our schedule management system backend has the following tech stack.

- [node.js](https://nodejs.org/en/) - For backend runtime.
- [Express.js](https://expressjs.com) - For easily creating the REST API.
- [MongoDB](https://www.mongodb.com) - As the Database. **mongoose** for object modeling in node.
- [TypeScript](https://www.typescriptlang.org/) - As the dev language.
- [Git](https://git-scm.com) - For source control.

## Miscellaneous
##### -> Live at [heroku](http://nodejs-ticketing-system.herokuapp.com/)
##### -> Logfile can be found [here](https://github.com/SD170/nodejs-ticketing-system/blob/master/morgan.log)
##### -> Postman collection [here](https://github.com/SD170/nodejs-ticketing-system/blob/master/_data/interim.postman_collection.json).


****

#### Thanks for checking it out. Have a great day.