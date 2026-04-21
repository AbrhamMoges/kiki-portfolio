/**
 * Server-side only: call this from a Node backend or serverless function (not from React).
 * Set RESEND_API_KEY in your server environment (never expose it in the browser).
 */
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendNewPostEmail(subscribers, post) {
  try {
    for (const sub of subscribers) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: sub.email,
        subject: `New article dropped: ${post.title}`,
        html: `
              <h1>${post.title}</h1>
              <p>${post.description || ''}</p>
              <a href="${post.content_url}">Read now</a>
            `,
      })
    }
  } catch (err) {
    console.error('Email error:', err)
  }
}
