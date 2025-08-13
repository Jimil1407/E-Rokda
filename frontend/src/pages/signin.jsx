import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signin() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await fetch('http://localhost:3000/api/v1/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify({
                    _id: data.user._id,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    email: data.user.email
                }))
                navigate('/dashboard')
            } else {
                setError(data.message || 'Sign in failed')
            }
        } catch (err) {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-black border-2 border-white rounded-xl p-8 max-w-md w-full shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your E-Rokda account</p>
                </div>

                {error && (
                    <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg mb-6 text-center text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white font-semibold mb-2">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-2 focus:ring-[#12b981]/20"
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-white font-semibold mb-2">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-2 focus:ring-[#12b981]/20"
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-3 bg-[#12b981] text-white rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:-translate-y-1 hover:shadow-lg shadow-md disabled:opacity-60 disabled:cursor-not-allowed mb-6"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-gray-400 text-sm mb-4">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-[#12b981] hover:underline font-medium">
                            Sign up
                        </Link>
                    </p>
                    
                    <Link 
                        to="/"
                        className="inline-block px-4 py-2 bg-white text-black rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg shadow-md"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}