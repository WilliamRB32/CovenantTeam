CREATE DATABASE IF NOT EXISTS databaseproject;
USE databaseproject;

CREATE TABLE IF NOT EXISTS users(
    email VARCHAR(100) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);