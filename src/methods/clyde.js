const canvas = require('canvas');
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');

module.exports = async ({ req: req, res: res }) => {

  const text = req.body.text || false;

  if (!text) return res.json({
    status: 500,
    error: 'texto não encontrado.'
  });

  const avatar = await canvas.loadImage(await circle('./src/image/clyde.png'));
  const badge = await canvas.loadImage('./src/image/botbadge.png');

  await canvas.registerFont('./src/fonts/WHITNEY_MEDIUM.otf', {
    family: 'Whitney',
    weight: 'regular',
    style: 'normal'
  });

  await canvas.registerFont('./src/fonts/MANROPE_REGULAR.ttf', {
    family: 'Manrope',
    weight: 'regular',
    style: 'normal'
  });

  const Canvas = canvas.createCanvas(1500, 300);

  const ctx = Canvas.getContext('2d');
  ctx.fillStyle = '#36393f';
  ctx.fillRect(0, 0, Canvas.width, Canvas.height);

  ctx.drawImage(avatar, 75, 30, 130, 130);
  ctx.drawImage(badge, 360, 45, 100, 40);

  ctx.font = '40px Manrope';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'start';
  await fillTextWithTwemoji(ctx, shorten(text, 56), 230, 150);

  ctx.font = '50px Whitney';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'start';
  ctx.fillText('Clyde', 230, 80);

  ctx.font = '40px Whitney';
  ctx.fillStyle = '#7D7D7D';
  ctx.textAlign = 'start';
  ctx.fillText(time(), 470, 80);

  ctx.font = '20px Manrope';
  ctx.fillStyle = '#7D7D7D';
  ctx.textAlign = 'start';
  ctx.fillText('Só você pode ver isso -', 240, 190);

  ctx.font = '20px Manrope';
  ctx.fillStyle = '#2785C7';
  ctx.textAlign = 'start';
  ctx.fillText('excluir esta mensagem.', 240 + ctx.measureText('Só você pode ver isso -').width + 10, 190);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

};

const shorten = (txt, limit) => {
  let text = txt;
  if (text.length >= limit) text = text.slice(0, limit).trim() + '...';
  return text;
};

const time = (time = new Date()) => {
  let date = time && time instanceof Date ? time : new Date();
  let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `Hoje às ${hours}:${minutes}`;
};

const circle = async (img) => {

  const image = await canvas.loadImage(img);
  const Canvas = canvas.createCanvas(image.width, image.height);
  const ctx = Canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  const w = Canvas.width;
  const h = Canvas.height;

  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, h / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  return Canvas.toBuffer();

};
