'use client';

import { useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { X, Download } from 'lucide-react';

export default function QRDisplay({ url, fnc }: { url: string; fnc: (v: string) => void }) {
  const qrRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (qrRef.current && !qrRef.current.contains(e.target as Node)) {
        fnc("");
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [fnc]);

  // Download handler
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    downloadLink.click();
  };

  return (
    <div
      ref={qrRef}
      className="relative p-4 bg-white border rounded-2xl shadow-md w-fit flex flex-col items-center gap-3 z-50"
    >
      {/* Close Button */}
      <button
        onClick={() => fnc("")}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Title */}
      <p className="text-sm font-medium text-gray-700">Scan to visit</p>

      {/* QR Code */}
      <QRCodeCanvas ref={canvasRef} value={url} size={160} />

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="flex items-center gap-1 text-sm px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100 text-gray-700 transition"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
  );
}
