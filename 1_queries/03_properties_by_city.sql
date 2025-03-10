SELECT properties.id, title, cost_per_night, AVG(property_reviews.rating) as average_rating 
FROM properties
JOIN property_reviews on properties.id = property_id
WHERE properties.city LIKE '%Vancouver'
GROUP BY properties.id
HAVING AVG(property_reviews.rating) >= 4
ORDER BY cost_per_night 
LIMIT 10;