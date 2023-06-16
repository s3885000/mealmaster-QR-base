import React, { useState } from 'react';
import { Buttons, Navigation } from '../../components';
import QrReader from 'react-qr-scanner';

const ScanQR = () => {
  const [result, setResult] = useState('No QR code scanned yet!');

  const handleScan = data => {
    if (data) {
      setResult(data.text);
      console.log("QR Code Scanned! ", data.text);
      alert("QR Code Scanned! " + data.text);
    }
  }

  const handleError = err => {
    console.error(err);
  }

  return (
    <div className='flex flex-col items-center justify-start h-screen px-5 pt-20 space-y-6'>
      <div className='flex items-center justify-between w-full mb-5'>
        <Buttons context='back' className='mr-6' />
        <h1 className='text-black text-2xl'>Scan QR</h1>
      </div>
      <QrReader
        delay={300}
        style={{ width: '100%' }}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{result}</p>
      <Navigation></Navigation>
    </div>
  );
};

export default ScanQR;
