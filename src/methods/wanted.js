const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const img = await canvas.loadImage(images[0].content);
  const backg = await canvas.loadImage('./src/image/wanted.png');

  const Canvas = canvas.createCanvas(736, 959);
  const ctx = Canvas.getContext('2d');

  ctx.drawImage(backg, 0, 0);
  ctx.drawImage(img, 145, 282, 447, 477);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

}
