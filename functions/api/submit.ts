/// <reference types="@cloudflare/workers-types" />

interface Env {
  RATELIMIT_KV: KVNamespace
  DESIGNS_R2: R2Bucket
}

const MAX_DAILY = 3

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
  const today = new Date().toISOString().split('T')[0]
  const rateLimitKey = `ratelimit:${ip}:${today}`

  const countStr = await env.RATELIMIT_KV.get(rateLimitKey)
  const count = parseInt(countStr ?? '0', 10)

  if (count >= MAX_DAILY) {
    return new Response(
      JSON.stringify({ error: 'rate_limit', message: 'Límite de envíos alcanzado para hoy.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return new Response(
      JSON.stringify({ error: 'bad_request', message: 'Formato inválido.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const imageFile = formData.get('image') as File | null

  if (!name || !imageFile) {
    return new Response(
      JSON.stringify({ error: 'bad_request', message: 'Falta nombre o imagen.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const timestamp = Date.now()
  const safeName = name.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9 _-]/g, '').trim().replace(/\s+/g, '_')
  const r2Key = `designs/${safeName}_${timestamp}.png`

  const imageBuffer = await imageFile.arrayBuffer()
  await env.DESIGNS_R2.put(r2Key, imageBuffer, {
    httpMetadata: { contentType: 'image/png' },
    customMetadata: { name, ip, date: today },
  })

  await env.RATELIMIT_KV.put(rateLimitKey, String(count + 1), {
    expirationTtl: 60 * 60 * 48,
  })

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}
