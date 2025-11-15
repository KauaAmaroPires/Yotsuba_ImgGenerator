const canvas = require('canvas');
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;
  const text = req.body.text || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  if (!images[0].name) return res.json({
    status: 500,
    error: 'nome não encontrado.'
  });

  if (!text) return res.json({
    status: 500,
    error: 'texto não encontrado.'
  });

  await canvas.registerFont('./src/fonts/ROBOTO_REGULAR.ttf', {
    family: 'Roboto',
    weight: 'regular',
    style: 'normal'
  });

  const backg = await canvas.loadImage('./src/image/youtube.png');
  const avatar = await canvas.loadImage(await circle(images[0].content));

  const Canvas = canvas.createCanvas(650, 183);
  const ctx = Canvas.getContext('2d');

  ctx.drawImage(backg, -3, -3, 650 + 6, 183 + 6);
  ctx.drawImage(avatar, 17, 33, 52, 52);

  let time = Math.floor(Math.random() * (59 - 1)) + 1;
  time = `${time + (time == 1 ? ' minute' : ' minutes')} ago`;

  const username = shorten(images[0].name, 21);
  const comment = shorten(text, 60);

  ctx.font = '20px Roboto';
  ctx.fillStyle = '#000000';
  ctx.fillText(username, 92, 50);

  ctx.font = '16px Roboto';
  ctx.fillStyle = '#909090';
  ctx.fillText(time, ctx.measureText(username).width + 140, 50);

  ctx.font = '18px Roboto';
  ctx.fillStyle = '#000000';
  await fillTextWithTwemoji(ctx, comment, 92, 80);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

};

const shorten = (txt, limit) => {
  let text = txt;
  if (text.length >= limit) text = text.slice(0, limit).trim() + '...';
  return text;
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
