import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')
        
        // Validation
        if (email === '' || password === '') {
            setError('All fields are required')
            setLoading(false)
            return
        }

        try {
            const signinUrl = 'http://localhost:3000/api/v1/signin'
            const data = { email, password }
            const response = await fetch(signinUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            
            console.log('Signin response:', responseData) // Debug log
            
            if (response.ok) {
                // Store token
                localStorage.setItem('token', responseData.token)
                
                // Store only essential user data (no password)
                const userData = {
                    _id: responseData.user._id,
                    firstName: responseData.user.firstName,
                    lastName: responseData.user.lastName,
                    email: responseData.user.email
                }
                localStorage.setItem('user', JSON.stringify(userData))
                
                console.log('Stored in localStorage:', {
                    token: localStorage.getItem('token'),
                    user: localStorage.getItem('user')
                })
                
                setSuccess('Sign in successful! Redirecting...')
                setTimeout(() => navigate('/dashboard'), 1500)
            } else {
                setError(responseData.message || 'Sign in failed')
            }
        } catch (err) {
            console.error('Signin error:', err)
            setError('Network error. Please try again.')
        }
        
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-5">
            {/* Back Button */}
            <Link 
                to="/" 
                className="absolute top-6 left-6 px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-gray-100 hover:-translate-y-0.5 no-underline shadow-lg"
            >
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </div>
            </Link>

            <div className="w-full max-w-md relative">
                {/* Main Logo */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-black text-white mb-4 tracking-tight">E-ROKDA</h1>
                    <p className="text-white text-lg font-semibold uppercase tracking-widest">Pay • Transfer • Earn • Repeat</p>
                </div>
                
                {/* Sign In Form */}
                <div className="bg-black border-2 border-white rounded-lg p-8 shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-2 text-center">Welcome Back</h2>
                    <p className="text-gray-300 text-center mb-8">Sign in to your account</p>
                    
                    {error && (
                        <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg mb-6 text-center text-sm font-medium">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-900 border border-green-600 text-green-200 px-4 py-3 rounded-lg mb-6 text-center text-sm font-medium">
                            {success}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-4 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-4 focus:ring-[#12b981]/20 disabled:bg-gray-900 disabled:text-gray-500 placeholder-gray-400"
                                disabled={loading}
                            />
                        </div>
                        
                        <div>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-4 focus:ring-[#12b981]/20 disabled:bg-gray-900 disabled:text-gray-500 placeholder-gray-400"
                                disabled={loading}
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-full bg-[#12b981] text-white py-4 px-6 rounded-lg font-bold text-base uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none shadow-md"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Continue'}
                        </button>
                    </form>
                    
                    <p className="text-center mt-8 text-gray-300 text-sm font-medium">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-[#12b981] font-bold hover:text-[#0ea371] transition-colors duration-200 no-underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}