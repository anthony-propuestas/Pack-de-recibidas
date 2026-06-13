/// <reference types="@cloudflare/workers-types" />

interface Env {
  DESIGNS_R2: R2Bucket
  ADMIN_SECRET: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return json({ error: 'bad_request' }, 400)
  }

  if (body.password !== env.ADMIN_SECRET) {
    return json({ error: 'unauthorized' }, 401)
  }

  const listed = await env.DESIGNS_R2.list({ prefix: 'designs/', limit: 500 })

  const items = listed.objects.map((obj) => ({
    key: obj.key,
    name: obj.customMetadata?.name ?? '',
    date: obj.customMetadata?.date ?? '',
    size: obj.size,
    uploaded: obj.uploaded?.toISOString() ?? '',
  }))

  items.sort((a, b) => b.uploaded.localeCompare(a.uploaded))

  return json({ items })
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
