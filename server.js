import 'dotenv/config';
import express from 'express';
import handleGitHubWebhookRoute from './githubWebhookRoute.js';

const app = express();

const PORT = process.env.PORT;

app.use(express.json())


app.get('/', (req, res) => {
   const baseUrl = process.env.BASE_URL || 'https://cicd.safemystuff.store';
  const webhookUrl = `${baseUrl}/github/webhook`;
  const now = new Date().toLocaleString();

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>Safemystuff CI/CD</title>
  </head>
  <body style="margin:0;padding:0;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);display:flex;align-items:center;justify-content:center;height:100vh;">

    <div style="
      background:#ffffff;
      padding:40px 32px;
      border-radius:16px;
      box-shadow:0 20px 60px rgba(20,30,50,0.15);
      text-align:center;
      max-width:500px;
      width:92%;
      color:#333;
    ">

     <!-- CI/CD Icon -->
      <div style="margin:0 auto 16px;width:80px;height:80px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);border-radius:16px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" aria-hidden="true">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m0 0a9 9 0 0 0 18 0m0 0V5a2 2 0 0 0-2-2h-4m0 0a9 9 0 0 0-18 0"/>
          <circle cx="12" cy="12" r="1" fill="white"/>
          <path d="M7 12h10M12 7v10"/>
        </svg>
      </div>

      <!-- Title -->
      <h1 style="margin:0;font-size:26px;color:#222;font-weight:700;">Safemystuff CI/CD</h1>

      <!-- Status Badge -->
      <div style="margin:16px 0 0 0;">
        <span style="
          display:inline-flex;
          align-items:center;
          gap:8px;
          background:#e8f5e9;
          color:#2e7d32;
          padding:8px 14px;
          border-radius:20px;
          font-weight:600;
          font-size:14px;
        ">
          <span style="width:10px;height:10px;background:#2e7d32;border-radius:50%;display:inline-block;box-shadow:0 0 8px #2e7d32;"></span>
          Online
        </span>
      </div>

      <!-- Description -->
      <p style="margin:16px 0 0 0;font-size:14px;color:#555;line-height:1.6;">
        Your webhook listener is running and ready to deploy automatically on every GitHub push.
      </p>

      <!-- Endpoint Card -->
      <div style="
        margin-top:24px;
        background:#f8f9fb;
        border:1px solid #e0e3ff;
        border-radius:12px;
        padding:16px;
      ">
        <div style="font-size:12px;color:#999;margin-bottom:8px;text-transform:uppercase;font-weight:600;letter-spacing:0.5px;">Webhook Endpoint</div>
        <div style="display:flex;gap:10px;align-items:center;">
          <div style="
            flex:1;
            font-family:'Monaco', 'Courier New', monospace;
            font-size:13px;
            color:#333;
            background:#fff;
            padding:10px 12px;
            border-radius:8px;
            word-break:break-all;
            font-weight:500;
            overflow:hidden;
          ">
            ${webhookUrl}
          </div>
          <button onclick="
            navigator.clipboard.writeText('${webhookUrl}');
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '✓ Copied!';
            btn.style.background = '#2e7d32';
            setTimeout(() => {
              btn.textContent = originalText;
              btn.style.background = '#667eea';
            }, 2000);
          " style="
            background:#667eea;
            color:white;
            border:none;
            padding:10px 14px;
            border-radius:8px;
            font-weight:600;
            font-size:13px;
            cursor:pointer;
            white-space:nowrap;
            transition:all 0.2s;
          " onmouseover="this.style.background='#5568d3'" onmouseout="this.style.background='#667eea'">
            Copy
          </button>
        </div>
      </div>

      <!-- Info Grid -->
      <div style="
        margin-top:24px;
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:12px;
      ">
        <div style="
          background:#f8f9fb;
          border-radius:10px;
          padding:12px;
          border:1px solid #e0e3ff;
        ">
          <div style="font-size:11px;color:#999;text-transform:uppercase;font-weight:600;margin-bottom:6px;">Port</div>
          <div style="font-size:16px;font-weight:700;color:#667eea;">${PORT}</div>
        </div>
        <div style="
          background:#f8f9fb;
          border-radius:10px;
          padding:12px;
          border:1px solid #e0e3ff;
        ">
          <div style="font-size:11px;color:#999;text-transform:uppercase;font-weight:600;margin-bottom:6px;">Status</div>
          <div style="font-size:16px;font-weight:700;color:#2e7d32;">Running</div>
        </div>
      </div>

      <!-- Footer -->
      <div style="margin-top:20px;font-size:12px;color:#999;line-height:1.6;">
        Last refreshed: <b style="color:#666;">${now}</b>
      </div>

    </div>
  </body>
  </html>`);
});


app.use('/github', handleGitHubWebhookRoute);

 

app.listen(PORT, () => {
  console.log(
  `\n\x1b[36m🔧 CI/CD server running:\x1b[0m\n` +
  `🌐 URL: \x1b[32mhttp://localhost:${PORT}\x1b[0m\n`
);

});
