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
                // Clear invalid data and redirect
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
            console.log('Balance response:', data) // Debug log

            if (response.ok) {
                // Handle nested balance structure
                let balanceValue
                if (data.balance && typeof data.balance === 'object' && data.balance.balance !== undefined) {
                    // Nested structure: {balance: {balance: 1000, ...}}
                    balanceValue = data.balance.balance
                } else if (data.balance !== undefined) {
                    // Direct structure: {balance: 1000}
                    balanceValue = data.balance
                } else {
                    balanceValue = 0
                }

                // Convert balance to number and handle different formats
                if (typeof balanceValue === 'string') {
                    balanceValue = parseFloat(balanceValue)
                }
                if (isNaN(balanceValue)) {
                    balanceValue = 0
                }
                
                console.log('Extracted balance value:', balanceValue) // Debug log
                setBalance(balanceValue)
            } else {
                if (response.status === 401) {
                    // Token is invalid or expired
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

    // Helper function to format balance safely
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
                        className="mt-4 px-4 py-2 bg-[#12b981] text-white rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:-translate-y-0.5"
                    >
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