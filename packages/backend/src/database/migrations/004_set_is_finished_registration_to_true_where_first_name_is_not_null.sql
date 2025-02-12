UPDATE users 
SET is_finished_registration = TRUE 
WHERE first_name IS NOT NULL;