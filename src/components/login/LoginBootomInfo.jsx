import React from 'react'

export const LoginBootomInfo = ({bottomInfo}) => {
    return (
        <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
               {bottomInfo}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 font-medium">Secure Connection</span>
            </div>
        </div>
    )
}
