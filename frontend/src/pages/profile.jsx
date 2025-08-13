import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'

export default function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        
        if (!token || token === 'undefined' || token === 'null') {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/signin')
            return
        }

        if (userData && userData !== 'undefined' && userData !== 'null') {
            try {
                const parsedUser = JSON.parse(userData)
                setUser(parsedUser)
                setFormData({
                    firstName: parsedUser.firstName || '',
                    lastName: parsedUser.lastName || '',
                    email: parsedUser.email || ''
                })
            } catch (error) {
                console.error('Error parsing user data:', error)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                navigate('/signin')
                return
            }
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/signin')
            return
        }
        
        setLoading(false)
    }, [navigate])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError('First name and last name are required')
            return
        }

        setUpdating(true)
        setError('')
        setSuccess('')

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setError('No authentication token found')
                setUpdating(false)
                return
            }

            const response = await fetch('http://localhost:3000/api/v1/users/update', {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    email: formData.email
                })
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess('Profile updated successfully!')
                
                const updatedUser = {
                    ...user,
                    firstName: data.firstName,
                    lastName: data.lastName
                }
                localStorage.setItem('user', JSON.stringify(updatedUser))
                setUser(updatedUser)
                
                setTimeout(() => {
                    setSuccess('')
                }, 3000)
            } else {
                setError(data.message || 'Failed to update profile')
            }
        } catch (err) {
            console.error('Update error:', err)
            setError('Network error. Please try again.')
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-lg">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-lg">Redirecting to sign in...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            
            <div className="pt-20 px-4 max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-black to-gray-900 border-2 border-[#12b981] rounded-xl p-4 mb-6 shadow-2xl">
                    <div className="text-center">
                        <h1 className="text-2xl font-black text-white mb-1">Profile Settings</h1>
                        <p className="text-[#12b981] text-sm font-semibold">Update your information</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-black to-gray-900 border-2 border-[#12b981] rounded-xl p-6 shadow-2xl">
                    <form onSubmit={handleSubmit}>
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

                        <div className="mb-4">
                            <label className="block text-white font-semibold mb-2">First Name</label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-2 focus:ring-[#12b981]/20"
                                disabled={updating}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white font-semibold mb-2">Last Name</label>
                            <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-2 focus:ring-[#12b981]/20"
                                disabled={updating}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-white font-semibold mb-2">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-lg text-gray-400 font-medium cursor-not-allowed"
                                disabled={true}
                            />
                            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-gray-700 hover:-translate-y-1 hover:shadow-lg shadow-md flex items-center justify-center gap-2"
                                disabled={updating}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                disabled={updating}
                                className="flex-1 px-4 py-3 bg-[#12b981] text-white rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:-translate-y-1 hover:shadow-lg shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {updating ? 'Updating...' : 'Update Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
