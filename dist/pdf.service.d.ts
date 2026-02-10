export declare class PdfService {
    convertPdfToImages(pdfBuffer: Buffer, scale?: number): Promise<{
        images: string[];
        pageCount: number;
    }>;
}
