/// <reference types="node" />
import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { TimelinePoint, TimelineResponse } from './types/timeline';
import timelineData from './data/timeline.json';

const server = Fastify({
  logger: true
});

server.register(cors, {
  origin: true
});

server.get('/timeline', async (request: FastifyRequest, reply: FastifyReply) => {
  return timelineData;
});

server.get('/imagem/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const { id } = request.params;
  const timelinePoint = timelineData.timeline.find(point => point.id === Number(id));

  if (!timelinePoint) {
    reply.code(404);
    return { error: 'Ponto da timeline não encontrado' };
  }

  return timelinePoint;
});

server.post('/timeline', async (request: FastifyRequest<{ Body: TimelinePoint }>, reply: FastifyReply) => {
  const newPoint = request.body;
  
  if (!newPoint.data || !newPoint.rotulo || !newPoint.imagemUrl) {
    reply.code(400);
    return { error: 'Dados incompletos' };
  }

  const newId = Math.max(...timelineData.timeline.map(point => point.id)) + 1;
  newPoint.id = newId;

  timelineData.timeline.push(newPoint);

  reply.code(201);
  return newPoint;
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor rodando em http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start(); 