// import React from 'react';

export default function BackgroundImage() {
  return (
    <div 
      className="fixed inset-0 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url('https://wallpapers.com/images/hd/kids-imagination-art-hy7atw23yvhkg9q9.jpg')`,
                height: '100vh',
                width: '100vw',
                position: 'absolute',
                top: 50,
                left: 0,
                zIndex: -1,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // opacity: 0.5,
                // filter: 'blur(8px)',
                transform: 'scale(1.1)',
                transition: 'opacity 0.5s ease-in-out'

                
                }}
    >
    <div className="relative w-full h-full bg-black bg-opacity-50">
    </div>
    </div>
  );
}