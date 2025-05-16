import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { TimelinePoint, TimelineResponse } from './types/timeline';
import timelineData from './data/timeline.json';

export async function buildApp() {
  const app = Fastify({
    logger: false
  });

  await app.register(cors, {
    origin: true
  });

  app.get('/timeline', async (request: FastifyRequest, reply: FastifyReply) => {
    return timelineData;
  });

  app.get('/imagem/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const { id } = request.params;
    const timelinePoint = timelineData.timeline.find(point => point.id === Number(id));

    if (!timelinePoint) {
      reply.code(404);
      return { error: 'Ponto da timeline não encontrado' };
    }

    return timelinePoint;
  });

  app.post('/timeline', async (request: FastifyRequest<{ Body: TimelinePoint }>, reply: FastifyReply) => {
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

  return app;
} 