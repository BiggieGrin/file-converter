import { Injectable } from '@nestjs/common';
import { createCanvas } from 'canvas';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

@Injectable()
export class PdfService {
  async convertPdfToImages(
    pdfBuffer: Buffer,
    scale = 2.0,
  ): Promise<{ images: string[]; pageCount: number }> {
    const pdfData = new Uint8Array(pdfBuffer);
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const pageCount = pdf.numPages;
    const images: string[] = [];

    for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = createCanvas(viewport.width, viewport.height);
      const context = canvas.getContext('2d');

      await page.render({
        canvasContext: context as any,
        viewport,
      }).promise;

      const imageBase64 = canvas.toDataURL('image/png');
      images.push(imageBase64);
    }

    return { images, pageCount };
  }
}
