const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const img = await canvas.loadImage(images[0].content);

  const Canvas = canvas.createCanvas(1032, 1107);

  const ctx = Canvas.getContext('2d');

  ctx.drawImage(img, 527, 450, 476, 548);

  const img2 = await canvas.loadImage('./src/image/gabrielmonteiro.png');

  ctx.drawImage(img2, 0, 0);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

}
