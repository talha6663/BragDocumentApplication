CREATE TABLE brags(
   brag_id SERIAL PRIMARY KEY NOT NULL,
   user_id int NOT NULL,
   brag TEXT NOT NULL
);


INSERT INTO brags (user_id, brag) VALUES ('111', 'My first brag');
INSERT INTO brags (user_id, brag) VALUES ('222', 'My second brag');