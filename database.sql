CREATE TABLE brags(
   brag_id SERIAL PRIMARY KEY,
   user_id int NOT NULL,
   title VARCHAR(255),
   brag TEXT,
   tags VARCHAR(255)[],
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);




INSERT INTO brags (user_id, brag) VALUES ('111', 'My first brag');
INSERT INTO brags (user_id, brag) VALUES ('222', 'My second brag');