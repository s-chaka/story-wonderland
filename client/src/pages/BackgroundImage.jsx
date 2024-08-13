// import React from 'react';

export default function BackgroundImage() {
  return (
    <div 
      className="fixed inset-0 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url('https://as1.ftcdn.net/v2/jpg/05/59/41/06/1000_F_559410619_rTxEg7rWHEmJrx27rT2F9cU0KEAdAd2F.jpg')`,
                // height: '100vh',
                // width: '100vw',
                // position: 'absolute',
                // top: 50,
                // left: 0,
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
    <div className="relative w-full h-full bg-black bg-opacity-20">
    </div>
    </div>
  );
}