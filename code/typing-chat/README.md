# 💬 شات «بيكتب…» زي واتساب (WebSocket)

من ريل **«سؤال إنترفيو: واتساب بيعرف إنك بتكتب إزاي؟»**: https://www.instagram.com/misarahamed.webdeveloper/

## شغّله في دقيقة
```
npm install
npm start
```
افتح `http://localhost:3000` في **تابين**، واكتب في واحد… هتلاقي «بيكتب…» ظاهرة في التاني على طول.

## الفكرة
- **Polling:** المتصفح يسأل السيرفر كل ثانية «فيه جديد؟». ١٠٠٠ يوزر × ٦٠ ثانية = **٦٠,٠٠٠ ريكويست في الدقيقة**، وأغلبها بترجع «مفيش».
- **WebSocket:** خط واحد مفتوح لكل يوزر، والسيرفر هو اللي بيبعت أول ما حاجة تحصل.

## الملفات
- `server.js`: سيرفر HTTP + WebSocket (مكتبة `ws`). بيستقبل `typing` و`message` ويبعتهم لكل اليوزرز التانيين.
- `public/index.html`: واجهة الشات. بتبعت `typing: on` أول ما تبدأ تكتب، و`typing: off` لما تقف ثانيتين.

تابعني على إنستجرام: [@misarahamed.webdeveloper](https://www.instagram.com/misarahamed.webdeveloper/) ⭐
