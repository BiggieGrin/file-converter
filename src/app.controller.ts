import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfService } from './pdf.service';

@Controller()
export class AppController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  async convertPdfToImages(
    @UploadedFile() file: Express.Multer.File,
    @Query('scale') scale?: string,
  ): Promise<{ images: string[]; pageCount: number }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('File must be a PDF');
    }

    const scaleValue = scale ? parseFloat(scale) : 2.0;
    if (isNaN(scaleValue) || scaleValue <= 0 || scaleValue > 5) {
      throw new BadRequestException('Scale must be a number between 0 and 5');
    }

    return this.pdfService.convertPdfToImages(file.buffer, scaleValue);
  }
}
