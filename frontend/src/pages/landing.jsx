import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

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
            icon: '⚡',
            title: 'Instant Payments',
            description: 'Send and receive money instantly across the globe',
            color: 'green'
        },
        {
            icon: '💰',
            title: 'Rewards Program',
            description: 'Earn points and rewards with every transaction',
            color: 'yellow'
        },
        {
            icon: '🛡️',
            title: 'Secure Transactions',
            description: 'Bank-grade security for all your financial needs',
            color: 'pink'
        }
    ]

    const additionalFeatures = [
        {
            icon: '🌍',
            title: 'Global Reach',
            description: 'Send money to 150+ countries worldwide'
        },
        {
            icon: '📱',
            title: 'Mobile First',
            description: 'Optimized for mobile devices and apps'
        },
        {
            icon: '🔒',
            title: 'Privacy Focused',
            description: 'Your data is encrypted and secure'
        },
        {
            icon: '🎯',
            title: 'Smart Analytics',
            description: 'Track your spending and savings goals'
        },
        {
            icon: '💳',
            title: 'Virtual Cards',
            description: 'Create virtual cards for online shopping'
        },
        {
            icon: '🏆',
            title: 'Premium Support',
            description: '24/7 customer support for all users'
        }
    ]

    return (
        <div className="min-h-screen bg-black font-['Inter'] text-white">
            {/* Navigation */}
            <nav className="flex justify-between items-center px-12 py-6 fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md">
                <div className="nav-brand">
                    <h1 className="text-3xl font-black text-white m-0 tracking-tight uppercase">E-ROKDA</h1>
                </div>
                <div className="flex gap-4">
                    <Link to="/signin" className="px-6 py-3 rounded-lg text-white border-2 border-white font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-white hover:text-black no-underline">
                        SIGN IN
                    </Link>
                    <Link to="/signup" className="px-6 py-3 rounded-lg bg-[#12b981] text-white border-2 border-[#12b981] font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:border-[#0ea371] hover:-translate-y-0.5 no-underline">
                        GET STARTED
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex items-center justify-between px-12 py-32 max-w-7xl mx-auto gap-16 pt-24">
                <div className="flex-1 max-w-2xl">
                    <h1 className="text-6xl font-black leading-tight mb-6 tracking-tight">
                        The Future of
                        <span className="text-[#12b981]"> Digital Payments</span>
                    </h1>
                    <p className="text-xl text-white mb-10 leading-relaxed">
                        Experience lightning-fast transactions, earn rewards, and secure your financial future with E-Rokda
                    </p>
                    
                    <div className="flex gap-5">
                        <Link to="/signup" className="px-8 py-4 rounded-lg bg-[#12b981] text-white border-2 border-[#12b981] font-semibold text-base uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:border-[#0ea371] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#12b981]/30 no-underline">
                            START YOUR JOURNEY
                        </Link>
                        <Link to="/signin" className="px-8 py-4 rounded-lg bg-transparent text-white border-2 border-white font-semibold text-base uppercase tracking-wider transition-all duration-200 hover:bg-white hover:text-black hover:-translate-y-1 no-underline">
                            SIGN IN
                        </Link>
                    </div>
                </div>

                {/* Animated Feature Showcase */}
                <div className="flex-1 max-w-md flex justify-center">
                    <div className={`bg-white text-black p-8 rounded-xl text-center text-sm font-semibold uppercase tracking-wider border-2 border-transparent transition-all duration-300 cursor-pointer min-w-80 max-w-96 shadow-lg ${features[currentFeature].color === 'green' ? 'border-[#12b981] shadow-[#12b981]/20' : features[currentFeature].color === 'yellow' ? 'border-yellow-400 shadow-yellow-400/20' : 'border-pink-500 shadow-pink-500/20'} ${currentFeature === 0 ? 'scale-105' : ''}`}>
                        <div className="text-5xl mb-4">{features[currentFeature].icon}</div>
                        <h3 className="text-2xl font-bold mb-3 text-black">{features[currentFeature].title}</h3>
                        <p className="text-base text-gray-600 leading-relaxed font-normal normal-case tracking-normal">{features[currentFeature].description}</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-12 py-20 max-w-7xl mx-auto">
                <h2 className="text-5xl font-black mb-16 text-center tracking-tight text-white">Why Choose E-Rokda?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className={`bg-white text-black p-10 rounded-xl text-center transition-all duration-300 border-2 border-transparent cursor-pointer ${feature.color === 'green' ? 'border-[#12b981]' : feature.color === 'yellow' ? 'border-yellow-400' : 'border-pink-500'} ${currentFeature === index ? 'hover:-translate-y-2' : 'hover:-translate-y-2'} ${feature.color === 'green' ? 'hover:shadow-2xl hover:shadow-[#12b981]/20' : feature.color === 'yellow' ? 'hover:shadow-2xl hover:shadow-yellow-400/20' : 'hover:shadow-2xl hover:shadow-pink-500/20'}`}
                            onMouseEnter={() => setCurrentFeature(index)}
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-bold mb-3 text-black">{feature.title}</h3>
                            <p className="text-base text-gray-600 leading-relaxed font-normal normal-case tracking-normal">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Additional Features Grid */}
            <section className="px-12 py-20 bg-black">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-black mb-16 text-center tracking-tight text-white">More Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {additionalFeatures.map((feature, index) => (
                            <div 
                                key={index} 
                                className="bg-white text-black p-8 rounded-xl text-center transition-all duration-300 border-2 border-gray-200 hover:border-[#12b981] hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3 text-black">{feature.title}</h3>
                                <p className="text-base text-gray-600 leading-relaxed font-normal normal-case tracking-normal">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-12 py-20 bg-black text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-6xl font-black text-[#12b981] mb-2">10M+</div>
                        <div className="text-lg text-gray-400 font-medium">Active Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl font-black text-[#12b981] mb-2">$50B+</div>
                        <div className="text-lg text-gray-400 font-medium">Transactions</div>
                    </div>
                    <div className="text-center">
                        <div className="text-6xl font-black text-[#12b981] mb-2">150+</div>
                        <div className="text-lg text-gray-400 font-medium">Countries</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-12 py-20 text-center max-w-4xl mx-auto">
                <h2 className="text-5xl font-black mb-4 tracking-tight text-white">Ready to Get Started?</h2>
                <p className="text-xl text-white mb-10">Join millions of users worldwide</p>
                <div className="flex gap-5 justify-center">
                    <Link to="/signup" className="px-8 py-4 rounded-lg bg-[#12b981] text-white border-2 border-[#12b981] font-semibold text-base uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:border-[#0ea371] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#12b981]/30 no-underline">
                        Create Account
                    </Link>
                    <Link to="/signin" className="px-8 py-4 rounded-lg bg-transparent text-white border-2 border-white font-semibold text-base uppercase tracking-wider transition-all duration-200 hover:bg-white hover:text-black hover:-translate-y-1 no-underline">
                        Sign In
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-12 py-10 bg-black border-t border-gray-800">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="footer-brand">
                        <h3 className="text-2xl font-black text-white mb-2 uppercase">E-ROKDA</h3>
                        <p className="text-sm text-gray-400 font-medium uppercase tracking-widest">Pay • Transfer • Earn • Repeat</p>
                    </div>
                    <div className="flex gap-6">
                        <Link to="/signin" className="text-gray-400 font-medium transition-colors duration-200 hover:text-[#12b981] no-underline">
                            Sign In
                        </Link>
                        <Link to="/signup" className="text-gray-400 font-medium transition-colors duration-200 hover:text-[#12b981] no-underline">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
