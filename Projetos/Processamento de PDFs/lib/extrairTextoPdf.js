const pdfParse = require('pdf-parse');

async function extrairTextoComPdfJs(buffer) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(buffer),
    disableWorker: true,
  }).promise;

  let text = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    text += `${content.items.map((item) => item.str).join(' ')}\n`;
  }
  return text;
}

async function extrairTextoPdf(buffer) {
  try {
    const pdfData = await pdfParse(buffer);
    return pdfData.text;
  } catch (error) {
    console.warn('pdf-parse indisponível, usando pdfjs-dist:', error.message);
    return extrairTextoComPdfJs(buffer);
  }
}

module.exports = { extrairTextoPdf };
