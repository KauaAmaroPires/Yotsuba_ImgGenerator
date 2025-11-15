const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const Canvas = canvas.createCanvas(540, 547);

  const ctx = Canvas.getContext('2d');

  const img = await canvas.loadImage(await transform(images[0].content));

  ctx.drawImage(img, 0, 0);

  const img2 = await canvas.loadImage('./src/image/ednaldopereira.png');

  ctx.drawImage(img2, 0, 0);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

};

const transform = async (image) => {

  const Canvas = canvas.createCanvas(540, 547);

  const ctx = Canvas.getContext('2d');

  const img = await canvas.loadImage(image);

  ctx.setTransform(1, -0.1, 0, 1, 0, 0);

  ctx.drawImage(img, 45, 224, 425, 310);

  return Canvas.toBuffer();

};
