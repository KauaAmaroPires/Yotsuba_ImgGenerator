const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const img = await canvas.loadImage(images[0].content);
  const Canvas = canvas.createCanvas(img.width, img.height);
  const ctx = Canvas.getContext('2d');

  ctx.drawImage(img, 0, 0);
  
  await circle(ctx, Canvas.width, Canvas.height);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

};

const circle = async (ctx, w, h) => {

  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, h / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  return ctx;

};
