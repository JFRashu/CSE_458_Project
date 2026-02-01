import React from 'react';

export const CreateAccountButton = ({ onClick ,buttonMessage}) => {
    return (
        <div className="text-center">
            <button
                onClick={onClick}
                className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold text-base transition-all hover:gap-3"
                style={{ fontFamily: "'Outfit', sans-serif" }}
            >
                {buttonMessage}
            </button>
        </div>
    );
};