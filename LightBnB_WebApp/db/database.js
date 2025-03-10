/// Constants ///
const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
  port: 5432,
});


/// Users ///

// Get a single user from the database given their email //

const getUserWithEmail = function(email) {
  const queryString = `
    SELECT *
    FROM users 
    WHERE users.email = $1;`;

  const queryParams = [email];

  return pool.query(queryString, queryParams)
    .then((results) => {
      return results.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Get a single user from the database given their id //

const getUserWithId = function(id) {

  const queryString = `
    SELECT *
    FROM users 
    WHERE users.id = $1;`;

  const queryParams = [id];

  return pool.query(queryString, queryParams)
    .then((results) => {
      return results.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Add a new user to the database //

const addUser = function(user) {
  const queryString = `
    INSERT INTO users
    (name, email, password)
    VALUES 
    ($1, $2, $3)
    RETURNING *;
  `;
  const queryParams = [user.name, user.email, user.password];

  return pool.query(queryString, queryParams)
    .then((results) => {
      return results.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Reservations ///

// Get all reservations for a single user //

const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
  SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY start_date 
  LIMIT $2;`;

  const queryParams = [guest_id, limit];

  return pool.query(queryString, queryParams)
    .then((results) => {
      return results.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Properties ///

// Get all properties //

const getAllProperties = (options, limit = 10) => {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += queryParams.length === 1 ? " WHERE " : " AND ";
    queryString += `city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += queryParams.length === 1 ? " WHERE " : " AND ";
    queryString += `properties.owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += queryParams.length === 1 ? " WHERE " : " AND ";
    queryString += `properties.cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += queryParams.length === 1 ? " WHERE " : " AND ";
    queryString += `properties.cost_per_night <= $${queryParams.length} `;
  }

  queryString += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    });
};

// Add a property to the database //

const addProperty = function(property) {

  const queryString = `
  INSERT INTO properties
  (owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms)
  VALUES 
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`;

  const queryParams =  [property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms];
    
  return pool.query(queryString, queryParams)
    .then((results) => {
      console.log(results.rows[0]);
      return results.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};