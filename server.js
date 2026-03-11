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
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f0f2f5;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      max-width: 480px;
      width: 100%;
      overflow: hidden;
    }
    .card-top {
      background: #1a1d23;
      padding: 28px;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .icon-wrap {
      width: 48px; height: 48px;
      background: rgba(255,255,255,0.08);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .title-block h1 { font-size: 18px; font-weight: 700; color: #fff; }
    .title-block p  { font-size: 12px; color: #6b7280; margin-top: 3px; }
    .status-pill {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 7px;
      background: rgba(34,197,94,0.12);
      border: 1px solid rgba(34,197,94,0.25);
      color: #22c55e;
      font-size: 12px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 100px;
      white-space: nowrap;
    }
    .pulse {
      width: 7px; height: 7px;
      background: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 6px #22c55e;
      animation: pulse 2s ease infinite;
    }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .card-body { padding: 24px 28px 28px; }
    .desc { font-size: 13px; color: #6b7280; line-height: 1.6; margin-bottom: 20px; }
    .section-label {
      font-size: 11px; font-weight: 700; color: #9ca3af;
      text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;
    }
    .webhook-row { display: flex; gap: 8px; margin-bottom: 20px; }
    .webhook-url {
      flex: 1;
      font-family: 'Menlo', 'Monaco', monospace;
      font-size: 12px; color: #374151;
      background: #f9fafb; border: 1px solid #e5e7eb;
      padding: 10px 12px; border-radius: 8px;
      word-break: break-all; line-height: 1.5;
    }
    .copy-btn {
      background: #1a1d23; color: #fff; border: none;
      padding: 0 16px; border-radius: 8px;
      font-size: 13px; font-weight: 600; cursor: pointer;
      transition: background 0.15s;
    }
    .copy-btn:hover { background: #2d3139; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 20px; }
    .info-tile {
      background: #f9fafb; border: 1px solid #e5e7eb;
      border-radius: 10px; padding: 12px 14px;
    }
    .info-tile .lbl { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; margin-bottom: 5px; }
    .info-tile .val { font-size: 15px; font-weight: 700; color: #111827; }
    .info-tile .val.green { color: #16a34a; }
    .footer {
      font-size: 11.5px; border-top: 1px solid #f3f4f6;
      padding-top: 16px; display: flex;
      justify-content: space-between;
    }
    .footer span { color: #9ca3af; }
  </style>
</head>
<body>
  <div class="card">

    <div class="card-top">
      <div class="icon-wrap">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      </div>
      <div class="title-block">
        <h1>Safemystuff CI/CD</h1>
        <p>cicd.safemystuff.store</p>
      </div>
      <div class="status-pill">
        <div class="pulse"></div>
        Online
      </div>
    </div>

    <div class="card-body">
      <p class="desc">Webhook listener is running and ready to deploy automatically on every GitHub push.</p>

      <div class="section-label">Webhook Endpoint</div>
      <div class="webhook-row">
        <div class="webhook-url">${webhookUrl}</div>
        <button class="copy-btn" onclick="
          navigator.clipboard.writeText('${webhookUrl}');
          this.textContent = '✓ Copied';
          setTimeout(() => this.textContent = 'Copy', 2000);
        ">Copy</button>
      </div>

      <div class="section-label">Server Info</div>
      <div class="info-grid">
        <div class="info-tile">
          <div class="lbl">Port</div>
          <div class="val">${PORT}</div>
        </div>
        <div class="info-tile">
          <div class="lbl">Status</div>
          <div class="val green">Running</div>
        </div>
        <div class="info-tile">
          <div class="lbl">Env</div>
          <div class="val">${process.env.NODE_ENV || 'production'}</div>
        </div>
      </div>

      <div class="footer">
        <span>Last refreshed: ${now}</span>
        <span>Safemystuff &copy; ${new Date().getFullYear()}</span>
      </div>
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
