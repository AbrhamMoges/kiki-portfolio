/**
 * Server-side only (Node, serverless, Edge with Node compat).
 *
 * Section 4–5 flow: after a post is inserted with published === true,
 * load subscribers from Supabase and email them via sendNewPostEmail.
 *
 * Env (server only, never REACT_APP_*):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY  — needed to read all subscribers; anon key may be blocked by RLS
 *   RESEND_API_KEY             — used inside sendEmail.js
 *
 * From your backend after creating a post (manual Option 1):
 *   await notifySubscribersAfterPost(newPost)
 *
 * Do not import this file from React — Resend + service role must stay off the client.
 */
import { createClient } from '@supabase/supabase-js'
import { sendNewPostEmail } from './sendEmail.js'

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(url, key)
}

/**
 * @param {object} newPost — must include title, description?, content_url, and published === true
 */
export async function notifySubscribersAfterPost(newPost) {
  if (!newPost || newPost.published !== true) {
    return
  }

  const supabase = getSupabaseAdmin()

  const { data: subscribers, error } = await supabase.from('subscribers').select('*')

  if (error) {
    console.error('subscribers fetch error:', error)
    throw error
  }

  if (!subscribers?.length) {
    return
  }

  await sendNewPostEmail(subscribers, newPost)
}
