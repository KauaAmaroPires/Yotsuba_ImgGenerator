const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const img = await canvas.loadImage(images[0].content);
  const backg = await canvas.loadImage('./src/image/delete.png');

  const Canvas = canvas.createCanvas(748, 356);
  const ctx = Canvas.getContext('2d');

  ctx.drawImage(backg, 0, 0);
  ctx.drawImage(img, 120, 135, 195, 195);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

}
