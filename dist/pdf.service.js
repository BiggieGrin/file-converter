"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const canvas_1 = require("canvas");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf");
let PdfService = class PdfService {
    async convertPdfToImages(pdfBuffer, scale = 2.0) {
        const pdfData = new Uint8Array(pdfBuffer);
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        const pageCount = pdf.numPages;
        const images = [];
        for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale });
            const canvas = (0, canvas_1.createCanvas)(viewport.width, viewport.height);
            const context = canvas.getContext('2d');
            await page.render({
                canvasContext: context,
                viewport,
            }).promise;
            const imageBase64 = canvas.toDataURL('image/png');
            images.push(imageBase64);
        }
        return { images, pageCount };
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map