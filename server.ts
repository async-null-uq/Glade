import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Telegram Notification Endpoint
  app.post('/api/notify', async (req, res) => {
    const { type, data } = req.body;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials missing in environment');
      return res.status(500).json({ error: 'Notification service misconfigured' });
    }

    let message = '';
    if (type === 'inquiry') {
      message = `🏠 *New Property Inquiry*\n\n` +
                `👤 Name: ${data.name}\n` +
                `📱 Phone: ${data.phone}\n` +
                `🏘️ Property: ${data.propertyTitle}\n` +
                `🎯 Intent: ${data.intent}\n` +
                `⏳ Timeline: ${data.timeline}\n` +
                `📍 Location: ${data.propertyLocation}\n` +
                `💰 Price: ${data.propertyPrice}`;
    } else if (type === 'sell') {
      message = `🔑 *New Property Listing (Sell)*\n\n` +
                `👤 Owner: ${data.name}\n` +
                `📱 Phone: ${data.phone}\n` +
                `📍 Location: ${data.location}\n` +
                `💰 Expected Price: ${data.price}`;
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      const result = await response.json();
      if (result.ok) {
        res.json({ success: true });
      } else {
        console.error('Telegram API error:', result);
        res.status(400).json({ error: 'Failed to send Telegram message' });
      }
    } catch (error) {
      console.error('Network error calling Telegram:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
