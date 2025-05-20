import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../database/client';

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers.authorization;
  
  if (!authHeader) {
    return reply.status(401).send({ error: 'No authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return reply.status(401).send({ error: 'Invalid token' });
    }

    // Add user to request for use in routes
    (request as any).user = user;
  } catch (error) {
    return reply.status(401).send({ error: 'Invalid token' });
  }
} 