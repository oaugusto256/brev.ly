import fastify from 'fastify'
import fastifyCors from '@fastify/cors'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.get('/health', async () => {
  return { status: 'ok' }
})

const PORT = Number(process.env.PORT) || 3333

app.listen({ port: PORT, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
