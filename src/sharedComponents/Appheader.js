import React from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack';
import './AppHeader.css';
export default function AppHeader({ text, onBack }) {
  return (
    <div className='_header'>
      <ArrowBack
        style={{ height: '20px', width: '20px' }}
        onClick={() => onBack()}
      />
      <p className='_header_text'>{text}</p>
    </div>
  );
}
