import React from 'react';
import Header from '../components/Header';
import HumidityChart from '../components/HumidityChart';

function Humidity(){
    return(
        <div className="w-screen max-w-screen min-h-screen relative overflow-hidden">
            {/* Background image with colorful sky */}
            <div
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: "url('/assets/colorfulsky.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            />
            {/* Content above background */}
            <div className="relative z-10 w-full h-full">
                <Header />
                <div className='flex justify-center items-center mt-8 pt-4'>
                    <div
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            backdropFilter: "blur(20px)",
                            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.2)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: "1rem",
                            padding: "2rem",
                        }}
                    >
                        <HumidityChart/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Humidity;