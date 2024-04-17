# LightBnB

* LightBnB is a simple Javascript based webapp that mimics the basic functionality of AirBnB and loads its various pages using SQL queries  

## Project Structure

```
.
├── db
│   ├── json
│   └── database.js
├── public
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── libraries
│   │   ├── index.js
│   │   ├── network.js
│   │   └── views_manager.js
│   ├── styles
│   │   ├── main.css
│   │   └── main.css.map
│   └── index.html
├── routes
│   ├── apiRoutes.js
│   └── userRoutes.js
├── styles  
│   ├── _forms.scss
│   ├── _header.scss
│   ├── _property-listings.scss
│   └── main.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

* `db` contains all the database interaction code.
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `routes` contains the router files which are responsible for any HTTP requests to `/users/something` or `/api/something`. 
* `styles` contains all of the sass files. 
* `server.js` is the entry point to the application. This connects the routes to the database.

## How to Use

* Install all dependencies using the `npm install` command
* Start the app with `npm run local` and view it at `localhost:3000`
* Login an existing user with an email from the `02_seeds.js` file - the password for all test users is "password"
* Create a new user with the "Sign Up" page 
* Once logged in, view past reservations made on the account with the "My Reservations" page
* View properties listed under the account on the "My Listings" page 
* Search and filter properties by minimum rating, city, min/max price per night on the "Search" page 
* Create a new property listing with the "Create Listing" page 

## Dependencies 

* Bcrypt
* Cookie-Session
* Express
* Nodemon
* Pg

## Known Issues 

* All forms, search queries ect. do not clear after submission and must be cleared manually 
* Creating a new listing while logged in will not actually populate the new listing to the "My Listings" page