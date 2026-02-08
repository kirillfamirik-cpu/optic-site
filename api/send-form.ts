console.log('ENV', {
  token: process.env.TG_BOT_TOKEN,
  chat: process.env.TG_CHAT_ID,
})

import type { VercelRequest, VercelResponse } from '@vercel/node'

const TELEGRAM_TOKEN = process.env.TG_BOT_TOKEN!
const CHAT_ID = process.env.TG_CHAT_ID!

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, phone, city, telegram, comment } = req.body

  const text = `
📩 Новая заявка

👤 Имя: ${name}
📞 Телефон: ${phone}
🏙 Город: ${city || '-'}
💬 Telegram: ${telegram || '-'}
📝 Комментарий: ${comment || '-'}
`

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    )

    if (!tgRes.ok) throw new Error('Telegram error')

    return res.status(200).json({ success: true })
  } catch (err) { console.error('TG ERROR', err)
    return res.status(500).json({ error: 'Send failed' })
  }
}
