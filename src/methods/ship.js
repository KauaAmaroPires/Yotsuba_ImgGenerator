const Canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;
  const number = req.body.number || false;

  if (!images || !images[0] || !images[1] || !images[0].content || !images[1].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  if (!number || number < 0 || number > 100) return res.json({
    status: 500,
    error: 'number de 1 até 100 não encontrado.'
  });

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#36393f"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const avatar = await Canvas.loadImage(images[0].content);

  ctx.drawImage(avatar, 100, 25, 200, 200);

  const avatar2 = await Canvas.loadImage(images[1].content);

  ctx.drawImage(avatar2, 400, 25, 200, 200);

  const heart = await Canvas.loadImage('./src/image/heart.png');
  const broken = await Canvas.loadImage('./src/image/broken.png');

  if (number >= 50) {
    ctx.drawImage(heart, 275, 60, 150, 150);
  } else {
    ctx.drawImage(broken, 275, 60, 150, 150);
  };

  res.set({ "Content-Type": "image/png" });
  return res.send(canvas.toBuffer());

}
