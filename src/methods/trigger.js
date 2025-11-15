const canvas = require('canvas');
const GIFEN = require('gifencoder');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const base = await canvas.loadImage('./src/image/triggered.png');
  const img = await canvas.loadImage(images[0].content);
  const GIF = new GIFEN(256, 310);

  GIF.start();
  GIF.setRepeat(0);
  GIF.setDelay(15);

  const Canvas = canvas.createCanvas(256, 310);
  const ctx = Canvas.getContext('2d');
  const BR = 30;
  const LR = 20;

  let i = 0;

  while (i < 9) {

    ctx.clearRect(0, 0, 256, 310);
    ctx.drawImage(
      img,
      Math.floor(Math.random() * BR) - BR,
      Math.floor(Math.random() * BR) - BR,
      256 + BR,
      310 - 54 + BR
    );
    ctx.fillStyle = '#FF000033';
    ctx.fillRect(0, 0, 256, 310);
    ctx.drawImage(
      base,
      Math.floor(Math.random() + LR) - LR,
      310 - 54 + Math.floor(Math.random() * LR) - LR,
      256 + LR,
      54 + LR
    );
    GIF.addFrame(ctx);
    i++;

  };

  GIF.finish();

  res.set({ "Content-Type": "image/gif" });
  return res.send(GIF.out.getData());

}
