import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const TELEGRAM_TOKEN = process.env.TG_BOT_TOKEN
  const CHAT_ID = process.env.TG_CHAT_ID

  if (!TELEGRAM_TOKEN || !CHAT_ID) {
    return res.status(500).json({
      success: false,
      error: 'Server environment variables are missing',
    })
  }

  try {
    const {
      name = '',
      phone = '',
      city = '',
      telegram = '',
      comment = '',
    } = req.body || {}

    const text = [
      '📩 Новая заявка',
      '',
      `👤 Имя: ${name || '-'}`,
      `📞 Телефон: ${phone || '-'}`,
      `🏙 Город: ${city || '-'}`,
      `💬 Telegram: ${telegram || '-'}`,
      `📝 Комментарий: ${comment || '-'}`,
    ].join('\n')

    const tgRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    )

    const tgData = await tgRes.json()

    if (!tgRes.ok || !tgData.ok) {
      console.error('Telegram API error:', tgData)
      return res.status(500).json({
        success: false,
        error: 'Telegram send failed',
      })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Send form error:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    })
  }
}