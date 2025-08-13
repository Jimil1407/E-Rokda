import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Signup() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')
        
        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters long')
            setLoading(false)
            return  
        }
        if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '') {
            setError('All fields are required')
            setLoading(false)
            return
        }

        try {
            const signupUrl = 'http://localhost:3000/api/v1/signup'
            const data = { firstName, lastName, email, password }
            const response = await fetch(signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            
            console.log('Signup response:', responseData) // Debug log
            
            if (response.ok) {
                setSuccess('Signup successful! Signing you in...')
                
                // Auto signin after successful signup
                const signinUrl = 'http://localhost:3000/api/v1/signin'
                const signinResponse = await fetch(signinUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                
                if (signinResponse.ok) {
                    const signinData = await signinResponse.json()
                    console.log('Auto signin response:', signinData) // Debug log
                    
                    // Store token
                    localStorage.setItem('token', signinData.token)
                    
                    // Store only essential user data (no password)
                    const userData = {
                        _id: signinData.user._id,
                        firstName: signinData.user.firstName,
                        lastName: signinData.user.lastName,
                        email: signinData.user.email
                    }
                    localStorage.setItem('user', JSON.stringify(userData))
                    
                    console.log('Stored in localStorage:', {
                        token: localStorage.getItem('token'),
                        user: localStorage.getItem('user')
                    })
                    
                    setTimeout(() => navigate('/dashboard'), 1500)
                } else {
                    const signinError = await signinResponse.json()
                    console.error('Auto signin failed:', signinError)
                    setSuccess('Signup successful! Please sign in.')
                }
            } else {
                setError(responseData.message || 'Signup failed')
            }
        } catch (err) {
            console.error('Signup error:', err)
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
                
                {/* Sign Up Form */}
                <div className="bg-black border-2 border-white rounded-lg p-8 shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-2 text-center">Create Account</h2>
                    <p className="text-gray-300 text-center mb-8">Join millions of users for secure digital payments</p>
                    
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
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-4 focus:ring-[#12b981]/20 disabled:bg-gray-900 disabled:text-gray-500 placeholder-gray-400"
                                disabled={loading}
                            />
                            <input 
                                type="text" 
                                placeholder="Last Name" 
                                value={lastName} 
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-4 focus:ring-[#12b981]/20 disabled:bg-gray-900 disabled:text-gray-500 placeholder-gray-400"
                                disabled={loading}
                            />
                        </div>
                        
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-4 focus:ring-[#12b981]/20 disabled:bg-gray-900 disabled:text-gray-500 placeholder-gray-400"
                            disabled={loading}
                        />
                        
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-4 focus:ring-[#12b981]/20 disabled:bg-gray-900 disabled:text-gray-500 placeholder-gray-400"
                            disabled={loading}
                        />
                        
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-4 focus:ring-[#12b981]/20 disabled:bg-gray-900 disabled:text-gray-500 placeholder-gray-400"
                            disabled={loading}
                        />
                        
                        <button 
                            type="submit" 
                            className="w-full bg-[#12b981] text-white py-4 px-6 rounded-lg font-bold text-base uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:transform hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none shadow-md"
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                    
                    <p className="text-center mt-6 text-gray-300 text-sm font-medium">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-[#12b981] font-bold hover:text-[#0ea371] transition-colors duration-200 no-underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}