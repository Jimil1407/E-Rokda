import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Balance() {
    const [balance, setBalance] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchBalance()
    }, [])

    const fetchBalance = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token || token === 'undefined' || token === 'null') {
                setError('No authentication token found')
                setLoading(false)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                setTimeout(() => navigate('/signin'), 2000)
                return
            }

            const response = await fetch('http://localhost:3000/api/v1/account/getBalance', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (response.ok) {
                let balanceValue
                if (data.balance && typeof data.balance === 'object' && data.balance.balance !== undefined) {
                    balanceValue = data.balance.balance
                } else if (data.balance !== undefined) {
                    balanceValue = data.balance
                } else {
                    balanceValue = 0
                }

                if (typeof balanceValue === 'string') {
                    balanceValue = parseFloat(balanceValue)
                }
                if (isNaN(balanceValue)) {
                    balanceValue = 0
                }
                
                setBalance(balanceValue)
            } else {
                if (response.status === 401) {
                    setError('Session expired. Please sign in again.')
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    setTimeout(() => navigate('/signin'), 2000)
                } else {
                    setError(data.message || 'Failed to fetch balance')
                }
            }
        } catch (err) {
            console.error('Balance fetch error:', err)
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const formatBalance = (balanceValue) => {
        if (balanceValue === null || balanceValue === undefined) {
            return '0.00'
        }
        
        const num = typeof balanceValue === 'string' ? parseFloat(balanceValue) : balanceValue
        if (isNaN(num)) {
            return '0.00'
        }
        
        return num.toFixed(2)
    }

    if (loading) {
        return (
            <div className="bg-black border-2 border-white rounded-lg p-6 mt-20 mx-6 shadow-2xl">
                <div className="text-center">
                    <div className="text-white text-lg font-semibold">Loading balance...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-black border-2 border-red-500 rounded-lg p-6 mt-20 mx-6 shadow-2xl">
                <div className="text-center">
                    <div className="text-red-400 text-lg font-semibold mb-2">Error</div>
                    <div className="text-red-300 text-sm">{error}</div>
                    <button 
                        onClick={fetchBalance}
                        className="px-3 py-1 bg-[#12b981] text-white rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:-translate-y-1 hover:shadow-lg shadow-md flex items-center gap-2"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-black border-2 border-white rounded-lg p-6 mt-20 mx-6 shadow-2xl">
            <div className="text-center">
                <div className="text-white text-lg font-semibold mb-2">Your Balance</div>
                <div className="text-4xl font-black text-[#12b981] mb-2">
                    ₹{formatBalance(balance)}
                </div>
                <div className="text-gray-300 text-sm">Available for transactions</div>
            </div>
        </div>
    )
}