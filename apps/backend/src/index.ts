import Fastify from 'fastify';
import dotenv from 'dotenv';
import { supabase } from './database/client';
import { authMiddleware } from './middleware/auth';

dotenv.config();

const server = Fastify({
  logger: true
});

// Health check endpoint
server.get('/health', async () => {
  return { status: 'ok' };
});

// Test Supabase connection
server.get('/test-db', async () => {
  const { data, error } = await supabase.from('users').select('count');
  
  if (error) {
    server.log.error(error);
    return { error: 'Database connection failed' };
  }
  
  return { success: true, count: data.length };
});

// Protected route example
server.get('/protected', {
  preHandler: authMiddleware
}, async (request) => {
  const user = (request as any).user;
  return { 
    message: 'This is a protected route',
    user: {
      id: user.id,
      email: user.email
    }
  };
});

// Start server
const start = async () => {
  try {
    await server.listen({ port: 4000, host: '0.0.0.0' });
    console.log('Server running at http://localhost:4000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start(); 