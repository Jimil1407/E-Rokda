import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
    const [currentFeature, setCurrentFeature] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % 3)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const features = [
        {
            icon: "💸",
            title: "Instant Payments",
            description: "Send money instantly to anyone, anywhere",
            color: "green"
        },
        {
            icon: "🔒",
            title: "Secure Transactions",
            description: "Bank-grade security for all your transactions",
            color: "green"
        },
        {
            icon: "📱",
            title: "Easy to Use",
            description: "Simple and intuitive interface for everyone",
            color: "green"
        }
    ]

    const additionalFeatures = [
        {
            icon: "🌍",
            title: "Global Reach",
            description: "Send money across borders instantly"
        },
        {
            icon: "⚡",
            title: "Lightning Fast",
            description: "Transactions completed in seconds"
        },
        {
            icon: "💰",
            title: "Low Fees",
            description: "Minimal transaction fees for maximum savings"
        }
    ]

    return (
        <div className="min-h-screen bg-black font-['Inter'] text-white">
            <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-12 py-4 sm:py-6 fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/20">
                <div className="nav-brand">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white m-0 tracking-tight uppercase">E-ROKDA</h1>
                </div>
                <div className="flex gap-2 sm:gap-4">
                    <Link to="/signin" className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-white border-2 border-white font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:bg-white hover:text-black no-underline hover:-translate-y-1 hover:shadow-lg">
                        SIGN IN
                    </Link>
                    <Link to="/signup" className="px-3 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#12b981] text-white border-2 border-[#12b981] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:border-[#0ea371] hover:-translate-y-1 hover:shadow-lg no-underline">
                        GET STARTED
                    </Link>
                </div>
            </nav>

            <section className="flex items-center justify-center px-4 sm:px-6 lg:px-12 py-20 sm:py-32 max-w-7xl mx-auto pt-20 sm:pt-32">
                <div className="text-center max-w-4xl px-4">
                    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-tight mb-6 sm:mb-8 tracking-tight">
                        The Future of
                        <span className="text-[#12b981] block"> Digital Payments</span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
                        Experience lightning-fast transactions, earn rewards, and secure your financial future with E-Rokda. 
                        Join millions of users who trust us for their digital payment needs.
                    </p>
                    
                    <div className="flex gap-4 sm:gap-6 justify-center">
                        <Link to="/signup" className="px-6 sm:px-10 py-3 sm:py-5 rounded-lg bg-[#12b981] text-white border-2 border-[#12b981] font-bold text-base sm:text-lg uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:border-[#0ea371] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#12b981]/30 no-underline">
                            START YOUR JOURNEY
                        </Link>
                    </div>
                </div>
            </section>

            <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-20 max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 sm:mb-16 text-center tracking-tight text-white">Why Choose E-Rokda?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className={`bg-black text-white p-6 sm:p-8 lg:p-10 rounded-xl text-center transition-all duration-300 border-2 border-[#12b981] cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#12b981]/20 ${currentFeature === index ? 'scale-105' : ''}`}
                            onMouseEnter={() => setCurrentFeature(index)}
                        >
                            <div className="text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">{feature.icon}</div>
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-[#12b981]">{feature.title}</h3>
                            <p className="text-base text-gray-300 leading-relaxed font-normal normal-case tracking-normal">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-12 py-20 bg-black">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-black mb-16 text-center tracking-tight text-white">More Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {additionalFeatures.map((feature, index) => (
                            <div 
                                key={index} 
                                className="bg-black text-white p-8 rounded-xl text-center transition-all duration-300 border-2 border-[#12b981] hover:-translate-y-2 hover:shadow-xl hover:shadow-[#12b981]/20 cursor-pointer hover:scale-105"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3 text-[#12b981]">{feature.title}</h3>
                                <p className="text-base text-gray-300 leading-relaxed font-normal normal-case tracking-normal">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-12 py-20 bg-black text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-6xl font-black text-[#12b981] mb-2">10M+</div>
                        <div className="text-lg text-gray-400 font-medium">Active Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl font-black text-[#12b981] mb-2">₹500B+</div>
                        <div className="text-lg text-gray-400 font-medium">Transactions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl font-black text-[#12b981] mb-2">99.9%</div>
                        <div className="text-lg text-gray-400 font-medium">Uptime</div>
                    </div>
                </div>
            </section>

            <footer className="px-12 py-10 bg-black border-t border-gray-800">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="footer-brand">
                        <h3 className="text-2xl font-black text-white mb-2 uppercase">E-ROKDA</h3>
                        <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">Pay • Transfer • Earn • Repeat</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-400 font-medium">
                            Made by <span className="text-[#12b981] font-bold"><a href="https://github.com/Jimil1407" target="_blank" rel="noopener noreferrer">Jimil Digaswala</a></span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

