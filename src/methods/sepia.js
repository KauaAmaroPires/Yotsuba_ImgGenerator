const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  const img = await canvas.loadImage(images[0].content);
  const Canvas = await canvas.createCanvas(img.width, img.height);
  const ctx = Canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const imgData = ctx.getImageData(0, 0, Canvas.width, Canvas.height);

  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] = imgData.data[i] * 0.393 + imgData.data[i + 1] * 0.769 + imgData.data[i + 2] * 0.189;
    imgData.data[i + 1] = imgData.data[i] * 0.349 + imgData.data[i + 1] * 0.686 + imgData.data[i + 2] * 0.168;
    imgData.data[i + 2] = imgData.data[i] * 0.272 + imgData.data[i + 1] * 0.534 + imgData.data[i + 2] * 0.131;
  };

  ctx.putImageData(imgData, 0, 0);

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

}
