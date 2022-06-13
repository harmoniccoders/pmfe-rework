import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Button } from '@chakra-ui/react';

interface props {
  rootElementId: string;
  downloadFileName: string;
}
const PdfDownloader = ({ rootElementId, downloadFileName }: props) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save(`${downloadFileName}.pdf`);
    });
  };

  return (
    <Button variant="outline" color="white" onClick={downloadPdfDocument}>
      Download Receipt
    </Button>
  );
};

export default PdfDownloader;