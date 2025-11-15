const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const img = await canvas.loadImage(images[0].content);

  const Canvas = canvas.createCanvas(1066, 1051);

  const ctx = Canvas.getContext('2d');

  ctx.drawImage(img, 266, 235, 719, 702);

  const img2 = await canvas.loadImage('./src/image/culto.png');

  ctx.drawImage(img2, 0, 0);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

}
