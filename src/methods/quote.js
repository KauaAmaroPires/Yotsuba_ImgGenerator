const canvas = require('canvas');
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;
  const color = req.body.color || '#FFF';
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

  await canvas.registerFont('./src/fonts/WHITNEY_MEDIUM.otf', {
    family: 'Whitney',
    weight: 'regular',
    style: 'normal'
  });

  const Canvas = canvas.createCanvas(600, 69);
  const ctx = Canvas.getContext('2d');

  ctx.fillStyle = "#36393f";
  ctx.fillRect(0, 0, Canvas.width, Canvas.height);

  const x = 11, y = 13, radius = 20;
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const image = await canvas.loadImage(images[0].content);
  ctx.drawImage(image, x, y, radius * 2, radius * 2);

  ctx.restore();

  ctx.lineWidth = .3;
  ctx.font = "14px sans-serif";
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.strokeText(images[0].name, 66, 27);
  ctx.fillText(images[0].name, 66, 27);

  const largo = ctx.measureText(images[0].name).width;
  ctx.font = "11.2px sans-serif";
  ctx.fillStyle = "#72767d";

  let hour = Math.floor(Math.random() * 12);
  let min = Math.floor(Math.random() * 60);

  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;

  ctx.fillText(`Hoje às ${hour}:${min}`, 66 + largo + 8, 27);

  ctx.font = "11.2px sans-serif";
  ctx.fillStyle = "#72767d";
  ctx.lineWidth = .1;
  ctx.font = "14.5px Whitney";
  ctx.fillStyle = "#dcddde";
  await fillTextWithTwemoji(ctx, shorten(text, 76), 66, 50);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

};

const shorten = (txt, limit) => {
  let text = txt;
  if (text.length >= limit) text = text.slice(0, limit).trim() + '...';
  return text;
};
