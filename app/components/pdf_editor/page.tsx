"use client"

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFEditor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-md shadow-md max-w-lg mx-auto mt-3">
      <h1 className="text-2xl font-bold mb-6">PDF Düzenleyici</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full mb-4 border rounded p-2"
      />
      {file && (
        <Document file={file} className="border p-4 rounded">
          <Page pageNumber={1} />
        </Document>
      )}
    </div>
  );
};

export default PDFEditor;
