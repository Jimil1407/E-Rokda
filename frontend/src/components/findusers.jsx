import React, { useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api'

export default function FindUsers({ onSendMoney }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            if (searchQuery.trim().length >= 2) {
                searchUsers()
            } else if (searchQuery.trim().length === 0) {
                setUsers([])
                setError('')
            }
        }, 500)

        return () => clearTimeout(searchTimeout)
    }, [searchQuery])

    const searchUsers = async () => {
        if (!searchQuery.trim()) {
            setError('Please enter a name to search')
            return
        }

        setLoading(true)
        setError('')

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setError('No authentication token found')
                setLoading(false)
                return
            }

            const response = await fetch(`${API_ENDPOINTS.GET_ALL_USERS}?firstName=${encodeURIComponent(searchQuery)}`, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (response.ok) {
                setUsers(data.users || [])
                if (data.users && data.users.length === 0) {
                    setError('No users found with that name')
                }
            } else {
                setError(data.message || 'Failed to search users')
                setUsers([])
            }
        } catch (err) {
            console.error('Search users error:', err)
            setError('Network error. Please try again.')
            setUsers([])
        } finally {
            setLoading(false)
        }
    }

    const handleSendMoney = (user) => {
        if (onSendMoney) {
            onSendMoney(user)
        }
    }

    return (
        <div className="bg-black border-2 border-white rounded-lg p-6 mx-6 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-6 text-center">Find Users</h2>
            
            <div className="mb-6">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Start typing to search users..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-4 focus:ring-[#12b981]/20 placeholder-gray-400"
                    />
                    {loading && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#12b981]"></div>
                        </div>
                    )}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                    Type at least 2 characters to search
                </div>
            </div>

            {error && (
                <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg mb-6 text-center text-sm font-medium">
                    {error}
                </div>
            )}

            {users.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Found Users:</h3>
                    {users.map((user) => (
                        <div 
                            key={user._id} 
                            className="bg-white text-black p-4 rounded-lg border-2 border-gray-200 hover:border-[#12b981] transition-all duration-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-bold text-lg">{user.firstName} {user.lastName}</div>
                                    <div className="text-gray-600 text-sm">{user.email}</div>
                                </div>
                                <button 
                                    onClick={() => handleSendMoney(user)}
                                    className="px-4 py-2 bg-[#12b981] text-white rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:-translate-y-1 hover:shadow-lg shadow-md flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                    Send Money
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && users.length === 0 && !error && searchQuery && searchQuery.length >= 2 && (
                <div className="text-center text-gray-300">
                    <div className="text-lg font-semibold mb-2">No users found</div>
                    <div className="text-sm">Try searching with a different name</div>
                </div>
            )}

            {!loading && users.length === 0 && !error && searchQuery.length < 2 && (
                <div className="text-center text-gray-300">
                    <div className="text-lg font-semibold mb-2">Search for users</div>
                    <div className="text-sm">Start typing to find users to send money to</div>
                </div>
            )}
        </div>
    )
}