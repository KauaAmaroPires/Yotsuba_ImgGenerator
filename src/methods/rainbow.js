const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const backg = await canvas.loadImage('./src/Image/rainbow.png');
  const img = await canvas.loadImage(images[0].content);

  const Canvas = canvas.createCanvas(400, 398);
  const ctx = Canvas.getContext('2d');

  ctx.drawImage(img, 0, 0, 400, 398);
  ctx.drawImage(backg, 0, 0);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

}
