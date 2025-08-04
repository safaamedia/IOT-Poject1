import React from 'react';

/* Components */
import Content from '../components/Content';
import Header from '../components/Header';
// import TemperaturePrediction from '../components/TemperaturePrediction';
// import WeeklyStats from '../components/WeeklyStats';

function Temperature(){
    return(
        <div className="w-screen max-w-screen min-h-screen relative overflow-hidden">
            {/* Background image with cloudy sky */}
            <div
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: "url('/assets/cloudysky.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            />
            {/* Content above background */}
            <div className="relative z-10 w-full h-full">
                <Header />
                <div className="mt-8 pt-4">
                    <Content />
                </div>
            </div>
            {/* <TemperaturePrediction />
            <WeeklyStats /> */}
        </div>
    )
}

export default Temperature;