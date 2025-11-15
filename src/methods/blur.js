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

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, Canvas.width, Canvas.height);
  ctx.drawImage(img, 0, 0, Canvas.width / 4, Canvas.height / 4);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(Canvas, 0, 0, Canvas.width / 4, Canvas.height / 4, 0, 0, Canvas.width + 5, Canvas.height + 5);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

}
