CREATE DATABASE expanse_analysis;

CREATE TABLE budget (
    id INTEGER PRIMARY KEY,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    estimated_budget INTEGER NOT NULL,
    timestamp VARCHAR(255) NOT NULL
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL,
    budget_id INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    remakrs VARCHAR(255),
    type VARCHAR(255) NOT NULL,
    timestamp VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (budget_id) REFERENCES budget(id)
);
