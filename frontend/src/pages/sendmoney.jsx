import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import SendMoneyModal from '../components/sendmoneymodal'

export default function SendMoney() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const [showSendMoneyModal, setShowSendMoneyModal] = useState(false)
    const [user, setUser] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)

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
        
        setPageLoading(false)
    }, [navigate])

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

            const response = await fetch(`http://localhost:3000/api/v1/users/getAllUsers?firstName=${encodeURIComponent(searchQuery)}`, {
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
        setSelectedUser(user)
        setShowSendMoneyModal(true)
    }

    const handleSendMoneySuccess = () => {
        window.location.reload()
    }

    const closeSendMoneyModal = () => {
        setShowSendMoneyModal(false)
        setSelectedUser(null)
    }

    if (pageLoading) {
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
            
            <div className="pt-20 px-4 max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-black to-gray-900 border-2 border-[#12b981] rounded-xl p-4 mb-4 shadow-2xl">
                    <div className="text-center">
                        <h1 className="text-2xl font-black text-white mb-1">Send Money</h1>
                        <p className="text-[#12b981] text-sm font-semibold">Transfer money to anyone</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-black to-gray-900 border-2 border-[#12b981] rounded-xl p-4 shadow-2xl">
                    <div className="mb-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Start typing to search users..." 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-3 py-2 bg-black border-2 border-gray-600 rounded-lg text-white font-medium text-sm transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-2 focus:ring-[#12b981]/20 placeholder-gray-400"
                            />
                            {loading && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#12b981]"></div>
                                </div>
                            )}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            Type at least 2 characters to search
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900 border border-red-600 text-red-200 px-3 py-2 rounded-lg mb-4 text-center text-xs font-medium">
                            {error}
                        </div>
                    )}

                    {users.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-[#12b981] mb-3">Found Users:</h3>
                            {users.map((user) => (
                                <div 
                                    key={user._id} 
                                    className="bg-white text-black p-3 rounded-lg border-2 border-gray-200 hover:border-[#12b981] transition-all duration-200"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-sm">{user.firstName} {user.lastName}</div>
                                            <div className="text-gray-600 text-xs">{user.email}</div>
                                        </div>
                                        <button 
                                            onClick={() => handleSendMoney(user)}
                                            className="px-3 py-1 bg-[#12b981] text-white rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:-translate-y-1 hover:shadow-lg shadow-md flex items-center gap-1"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                            </svg>
                                            Send
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && users.length === 0 && !error && searchQuery && searchQuery.length >= 2 && (
                        <div className="text-center text-gray-300">
                            <div className="text-sm font-semibold mb-1">No users found</div>
                            <div className="text-xs">Try searching with a different name</div>
                        </div>
                    )}

                    {!loading && users.length === 0 && !error && searchQuery.length < 2 && (
                        <div className="text-center text-gray-300">
                            <div className="text-sm font-semibold mb-1">Search for users</div>
                            <div className="text-xs">Start typing to find users to send money to</div>
                        </div>
                    )}
                </div>
            </div>
        
            {showSendMoneyModal && selectedUser && (
                <SendMoneyModal 
                    user={selectedUser}
                    onClose={closeSendMoneyModal}
                    onSuccess={handleSendMoneySuccess}
                />
            )}
        </div>
    )
}
