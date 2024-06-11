import React from 'react';

function Header() {
  return (
    <header style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <video autoPlay muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}>
        <source src="bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <header className="w-100 text-white text-center py-3 fixed-top" style={{ backgroundColor: '#ac632c', zIndex: 1 }}>
        <h1>AutoMorphix</h1>
      </header>
    </header>
  );
}

export default Header;
