DROP DATABASE IF EXISTS market_cubos;

CREATE DATABASE market_cubos;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY, 
  nome VARCHAR(100) NOT NULL, 
  nome_loja VARCHAR(100) NOT NULL, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  senha TEXT NOT NULL 
);

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id), 
  nome VARCHAR(100) NOT NULL,
  quantidade INTEGER NOT NULL,
  categoria VARCHAR(30) NOT NULL, 
  preco INTEGER NOT NULL, 
  descricao TEXT, 
  imagem TEXT
);



