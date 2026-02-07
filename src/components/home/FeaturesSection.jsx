import React from 'react';

export const FeaturesSection = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full mb-20 opacity-0 animate-fade-in-up delay-200">
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <div
            key={index}
            className="glass-morphism rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-default"
          >
            <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg mb-4`}>
              <Icon className="text-white" size={28} strokeWidth={2.5} />
            </div>

            <h3 
              className="text-lg font-bold text-gray-800 mb-2" 
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {feature.title}
            </h3>

            <p 
              className="text-sm text-gray-600 leading-relaxed" 
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};