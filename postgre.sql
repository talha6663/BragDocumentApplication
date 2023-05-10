CREATE TABLE users(
   user_id SERIAL PRIMARY KEY,
   email VARCHAR(255)
);

CREATE TABLE brags(
   brag_id SERIAL PRIMARY KEY,
   user_id int NOT NULL,
   brag TEXT,
   tags VARCHAR(255)[],
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);