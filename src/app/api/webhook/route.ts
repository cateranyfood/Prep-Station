import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, User } from '@clerk/nextjs/server'
import { addUserToDatabaseAdmin } from '../../../../services/database'

export async function POST(req: Request) {
  const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET

  if (!CLERK_WEBHOOK_SIGNING_SECRET) {
    throw new Error('Error: Please add CLERK_WEBHOOK_SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(CLERK_WEBHOOK_SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id =  headerPayload.get('svix-id')
  const svix_timestamp =  headerPayload.get('svix-timestamp')
  const svix_signature =  headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type;
  const emailAddress = evt.data.email_addresses[0]?.email_address;
  const { id, first_name, last_name} = evt.data;
  const user_info = {
    user_id: id,
    email: emailAddress,
    first_name: first_name,
    last_name: last_name
  }
  
  const data = await addUserToDatabaseAdmin(user_info);

  return new Response('Webhook received', { status: 200 })
}


// export async function GET(req: NextRequest) {
//   const origin = req.headers.get('origin');

//   if (origin !== 'http://localhost:3000') {
//     return NextResponse.json({ message: 'CORS error' }, { status: 403 });
//   }

//   return NextResponse.json({ message: 'hi' });
// }