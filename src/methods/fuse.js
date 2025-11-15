const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[1] || !images[0].content || !images[1].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const img1 = await canvas.loadImage(images[0].content);
  const img2 = await canvas.loadImage(images[1].content);

  const Canvas = canvas.createCanvas(img1.width, img1.height);
  const ctx = Canvas.getContext('2d');

  ctx.globalAlpha = 0.5;
  ctx.drawImage(img1, 0, 0);
  ctx.drawImage(img2, 0, 0, Canvas.width, Canvas.height);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

};
