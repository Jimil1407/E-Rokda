import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'
import Balance from '../components/balance'
import FindUsers from '../components/findusers'
import SendMoneyModal from '../components/sendmoneymodal'

export default function Dashboard() {
    const navigate = useNavigate()
    const [selectedUser, setSelectedUser] = useState(null)
    const [showSendMoneyModal, setShowSendMoneyModal] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

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
        
        setLoading(false)
    }, [navigate])

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
            
            <div className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                {/* Welcome Section - More Compact */}
                <div className="bg-gradient-to-r from-black to-gray-900 border-2 border-[#12b981] rounded-xl p-4 sm:p-6 mb-4 shadow-2xl">
                    <div className="text-center">
                        <h1 className="text-xl sm:text-2xl font-black text-white mb-1">Welcome Back!</h1>
                        <p className="text-[#12b981] text-sm font-semibold">{user.firstName} {user.lastName}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                </div>

                {/* Balance Component */}
                <div className="mb-4">
                    <Balance />
                </div>

                {/* Find Users Component */}
                <div className="mb-6">
                    <FindUsers onSendMoney={handleSendMoney} />
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