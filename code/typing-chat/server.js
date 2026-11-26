// شات صغير بـ«بيكتب…» زي واتساب — WebSocket بدل polling.
// تشغيل: npm install ثم npm start ← افتح http://localhost:3000 في تابين.
import http from 'node:http';
import fs from 'node:fs';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 3000;
const page = fs.readFileSync(new URL('./public/index.html', import.meta.url));

// 1) سيرفر HTTP عادي بيبعت صفحة الشات
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(page);
});

// 2) سيرفر WebSocket على نفس البورت: خط واحد مفتوح مع كل يوزر
const wss = new WebSocketServer({ server });

// ابعت لكل اليوزرز ما عدا اللي بعت
function broadcast(sender, data) {
  const msg = JSON.stringify(data);
  for (const client of wss.clients) {
    if (client !== sender && client.readyState === 1) client.send(msg);
  }
}

wss.on('connection', (socket) => {
  socket.on('message', (raw) => {
    let data;
    try { data = JSON.parse(raw); } catch { return; }
    const name = String(data.name || 'مجهول').slice(0, 20);

    if (data.type === 'typing') broadcast(socket, { type: 'typing', name, on: !!data.on }); // «بيكتب…» أو وقف
    if (data.type === 'message') broadcast(socket, { type: 'message', name, text: String(data.text || '').slice(0, 500) });
  });
});

server.listen(PORT, () => console.log(`✅ افتح http://localhost:${PORT} في تابين وجرّب`));
