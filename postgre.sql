CREATE TABLE brags(
   brag_id SERIAL PRIMARY KEY,
   user_email VARCHAR NOT NULL,
   brag TEXT,
   tags VARCHAR(255)[],
   created_date DATE NOT NULL,
   created_time TIME NOT NULL,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);