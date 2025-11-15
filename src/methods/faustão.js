const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const img = await canvas.loadImage(images[0].content);

  const Canvas = canvas.createCanvas(632, 357);

  const ctx = Canvas.getContext('2d');

  ctx.drawImage(img, 99, 0, 533, 243);

  const img2 = await canvas.loadImage('./src/image/faustao.png');

  ctx.drawImage(img2, 0, 0);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

}
