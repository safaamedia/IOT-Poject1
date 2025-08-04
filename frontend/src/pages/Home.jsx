import React from 'react';

/* Components */
import Header from '../components/Header';
import HumidityChart from '../components/HumidityChart';

function Home(){
    return(
        <div className="w-screen max-w-screen h-screen flex flex-col relative overflow-hidden">
            {/* Background image with blur */}
            <div
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: "url('/assets/paradise.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(12px)',
                    opacity: 0.85,
                }}
            />
            {/* Content above background */}
            <div className="relative z-10 w-full h-full flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center w-full h-full">
                    <div 
                        className="flex flex-col items-center justify-center w-full max-w-xl space-y-6 p-4 rounded-2xl backdrop-blur-lg bg-white/15 border border-white/30 shadow-xl"
                        style={{
                            boxShadow: '0 8px 24px 0 rgba(0,0,0,0.18), 0 0 32px 0 rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(14px)',
                        }}
                    >
                        <h1 className="font-bold text-5xl text-center w-full text-white italic" style={{ fontFamily: 'Crimson Text, serif' }}>Weekly Weather reports.</h1>
                        <p className="max-w-xl w-full text-center text-white text-base font-medium italic" style={{ fontFamily: 'Crimson Text, serif' }}>Start exploring the weather data by selecting a city.</p>
                        {/* Weather Widgets */}
                        <div className="flex flex-row items-center justify-center gap-4 w-full mt-2">
                            {/* Temperature Widget */}
                            <div className="flex flex-col items-center justify-center bg-white/20 rounded-xl px-4 py-4 shadow-md border border-white/30" style={{backdropFilter: 'blur(8px)'}}>
                                <span className="text-4xl mb-2">🌡️</span>
                                <span className="text-2xl font-bold text-white">Temperature</span>
                                <span className="text-3xl font-bold text-white mt-2">18°C</span>
                                <span className="text-base text-gray-200">Cloudy</span>
                            </div>
                            {/* Humidity Widget */}
                            <div className="flex flex-col items-center justify-center bg-white/20 rounded-xl px-4 py-4 shadow-md border border-white/30" style={{backdropFilter: 'blur(8px)'}}>
                                <span className="text-4xl mb-2">💧</span>
                                <span className="text-2xl font-bold text-white">Humidity</span>
                                <span className="text-3xl font-bold text-white mt-2">60%</span>
                                <span className="text-base text-gray-200">Moderate</span>
                            </div>
                            {/* Air Quality Widget */}
                            <div className="flex flex-col items-center justify-center bg-white/20 rounded-xl px-4 py-4 shadow-md border border-white/30" style={{backdropFilter: 'blur(8px)'}}>
                                <span className="text-4xl mb-2">🧪</span>
                                <span className="text-2xl font-bold text-white">Air Quality</span>
                                <span className="text-3xl font-bold text-white mt-2">Good</span>
                                <span className="text-base text-gray-200">AQI: 45</span>
                            </div>
                        </div>
                        {/* 5-Day Forecast */}
                        <div className="w-full mt-4">
                            <div className="bg-white/20 rounded-xl px-4 py-4 shadow-md border border-white/30" style={{backdropFilter: 'blur(8px)'}}>
                                <h2 className="text-xl font-bold text-white text-center mb-2">5-Day Forecast</h2>
                                <div className="flex flex-row items-center justify-center gap-4">
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl">☀️</span>
                                        <span className="text-lg text-white">Today</span>
                                        <span className="text-base text-gray-200">18°/5°</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl">🌤️</span>
                                        <span className="text-lg text-white">Wed</span>
                                        <span className="text-base text-gray-200">20°/6°</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl">🌧️</span>
                                        <span className="text-lg text-white">Thu</span>
                                        <span className="text-base text-gray-200">17°/3°</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl">☀️</span>
                                        <span className="text-lg text-white">Fri</span>
                                        <span className="text-base text-gray-200">22°/10°</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl">🌦️</span>
                                        <span className="text-lg text-white">Sat</span>
                                        <span className="text-base text-gray-200">16°/5°</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;