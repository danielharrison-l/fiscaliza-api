/// <reference types="node" />
import { config } from 'dotenv';
import { buildApp } from './app';

// Carrega as variáveis de ambiente
config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    const app = await buildApp();
    await app.listen({ port: Number(PORT), host: '0.0.0.0' });
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start(); 