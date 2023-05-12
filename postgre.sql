CREATE TABLE brags(
   brag_id SERIAL PRIMARY KEY,
   user_id int NOT NULL,
   user_email VARCHAR NOT NULL,
   title VARCHAR,
   brag TEXT,
   tags VARCHAR(255)[],
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);