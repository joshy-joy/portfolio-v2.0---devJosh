const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SENDER_MAIL = Deno.env.get('SENDER_MAIL')

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const handler = async (request: Request): Promise<Response> => {
  // Handle CORS
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  const body  = await request.json()
  console.log(body)
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: SENDER_MAIL,
      to: body.email,
      subject: body.subject,
      html: body.html,
    }),
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  })
}

Deno.serve(handler)

