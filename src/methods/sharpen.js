const canvas = require('canvas');

module.exports = async ({ req: req, res: res }) => {

  const images = req.body.images || false;
  let number = req.body.number || 1;

  if (!images || !images[0] || !images[0].content) return res.json({
    status: 500,
    error: 'Imagem não encontrada.'
  });

  if (isNaN(number)) number = 1;

  const img = await canvas.loadImage(images[0].content);
  const Canvas = canvas.createCanvas(img.width, img.height);
  const ctx = Canvas.getContext('2d');

  ctx.drawImage(img, 0, 0);

  for (let i = 0; i < number; i++) {
    sharpen(
      ctx,
      Canvas,
      [0, -1, 0, -1, 5, -1, 0, -1, 0],
      true
    );
  };

  res.set({ "Content-Type": "image/png" });
  return res.send(Canvas.toBuffer());

};

const sharpen = (ctx, canvas, matrix, opaque) => {

  const side = Math.round(Math.sqrt(matrix.length));
  const halfSide = Math.floor(side / 2);
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const src = pixels.data;
  const sw = pixels.width;
  const sh = pixels.height;
  const w = sw;
  const h = sh;
  const output = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dst = output.data;
  const alphaFac = opaque ? 1 : 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {

      const sy = y;
      const sx = x;
      const dstOff = (y * w + x) * 4;
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;

      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {

          const scy = sy + cy - halfSide;
          const scx = sx + cx - halfSide;

          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {

            const srcOff = (scy * sw + scx) * 4;
            const wt = matrix[cy * side + cx];

            r += src[srcOff] * wt;
            g += src[srcOff + 1] * wt;
            b += src[srcOff + 2] * wt;
            a += src[srcOff + 3] * wt;

          };

        };
      };

      dst[dstOff] = r;
      dst[dstOff + 1] = g;
      dst[dstOff + 2] = b;
      dst[dstOff + 3] = a + alphaFac * (255 - a);

    };
  };

  ctx.putImageData(output, 0, 0);

  return ctx;

};
