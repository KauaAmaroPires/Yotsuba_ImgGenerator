const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;
  let number = req.body.number || 1;

  if (!images || !images[0] || !images[1] || !images[0].content || !images[1].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  if (isNaN(number)) number = 1;

  const img = await canvas.loadImage(images[0].content);
  const Canvas = await canvas.createCanvas(img.width, img.height);
  const ctx = Canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const img2 = await canvas.loadImage(images[1].content);
  const Canvas2 = await canvas.createCanvas(img2.width, img2.height);
  const ctx2 = Canvas2.getContext('2d');
  ctx2.drawImage(img2, 0, 0);

  const imgData = ctx.getImageData(0, 0, Canvas.width, Canvas.height);
  const imgData2 = ctx2.getImageData(0, 0, Canvas2.width, Canvas2.height);

  for (let i = 0; i < imgData.data.length; i += 4) {

    if (
      imgData.data[i] === imgData2.data[i] &&
      imgData.data[i + 1] === imgData2.data[i + 1] &&
      imgData.data[i + 2] === imgData2.data[i + 2]
    ) {
      imgData.data[i] -= number;
      imgData.data[i + 1] -= number;
      imgData.data[i + 2] -= number;
    };

  };

  ctx.putImageData(imgData, 0, 0);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

}
