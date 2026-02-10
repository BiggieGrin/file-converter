import { PdfService } from './pdf.service';
export declare class AppController {
    private readonly pdfService;
    constructor(pdfService: PdfService);
    convertPdfToImages(file: Express.Multer.File, scale?: string): Promise<{
        images: string[];
        pageCount: number;
    }>;
}
