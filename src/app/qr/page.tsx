'use client';

import { QRCodeCanvas } from 'qrcode.react';

export default function QRDisplay() {
  const shortUrl = 'https://short.ly/abc123'; // Your actual URL

  return (
    <div className="p-4 bg-white border rounded-xl shadow w-fit">
      <p className="mb-2 font-semibold">Scan to visit:</p>
      <QRCodeCanvas value={shortUrl} size={180} />
    </div>
  );
}
