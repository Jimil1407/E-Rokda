import React, { useState } from 'react'

export default function SendMoneyModal({ user, onClose, onSuccess }) {
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    if (!user) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-black border-2 border-white rounded-lg p-8 max-w-md w-full shadow-2xl">
                    <div className="text-center">
                        <div className="text-red-400 text-lg font-semibold mb-4">Error</div>
                        <div className="text-red-300 text-sm mb-6">No user selected for money transfer</div>
                        <button 
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-gray-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!amount || parseFloat(amount) <= 0) {
            setError('Please enter a valid amount')
            return
        }

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setError('No authentication token found')
                setLoading(false)
                return
            }

            const response = await fetch('http://localhost:3000/api/v1/account/transfer', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user._id,
                    amount: parseFloat(amount)
                })
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess('Money sent successfully!')
                setAmount('')
                setTimeout(() => {
                    onClose()
                    if (onSuccess) onSuccess()
                }, 2000)
            } else {
                setError(data.message || 'Failed to send money')
            }
        } catch (err) {
            console.error('Transfer error:', err)
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-black border-2 border-white rounded-lg p-8 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-white">Send Money</h2>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-300 text-2xl font-bold transition-colors duration-200"
                    >
                        ×
                    </button>
                </div>

                <div className="bg-white text-black p-4 rounded-lg mb-6">
                    <div className="text-center">
                        <div className="font-bold text-lg mb-1">Sending to:</div>
                        <div className="text-xl font-black">{user.firstName} {user.lastName}</div>
                        <div className="text-gray-600 text-sm">{user.email}</div>
                    </div>
                </div>

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

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-white font-semibold mb-2">Amount (₹)</label>
                        <input 
                            type="number" 
                            placeholder="Enter amount..." 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)}
                            step="0.01"
                            min="0.01"
                            className="w-full px-4 py-3 bg-black border-2 border-gray-600 rounded-lg text-white font-medium transition-all duration-200 focus:outline-none focus:border-[#12b981] focus:ring-4 focus:ring-[#12b981]/20 placeholder-gray-400"
                            disabled={loading}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-gray-600 text-white rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-gray-700 hover:-translate-y-1 hover:shadow-lg shadow-md flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-[#12b981] text-white rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0ea371] hover:-translate-y-1 hover:shadow-lg shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            {loading ? 'Sending...' : 'Send Money'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
