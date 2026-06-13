/// <reference types="@cloudflare/workers-types" />

interface Env {
  DESIGNS_R2: R2Bucket
  ADMIN_SECRET: string
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context
  const url = new URL(request.url)
  const password = url.searchParams.get('password') ?? ''
  const key = url.searchParams.get('key') ?? ''

  if (password !== env.ADMIN_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  if (!key.startsWith('designs/')) {
    return new Response('Invalid key', { status: 400 })
  }

  const obj = await env.DESIGNS_R2.get(key)
  if (!obj) {
    return new Response('Not found', { status: 404 })
  }

  return new Response(obj.body, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'private, max-age=3600',
    },
  })
}
