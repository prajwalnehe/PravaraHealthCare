import React from 'react';

export default function NeonCards() {
  const cardData = [
    {
      title: 'Revenue Analytics',
      value: '₹320.4K',
      trend: '+8.2%',
      description: 'Total revenue for the current period',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Active Orders',
      value: '31.6K',
      trend: '+3.4%',
      description: 'Orders processed this month',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: 'Customer Growth',
      value: '12.6K',
      trend: '+1.9K',
      description: 'New customers this month',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-neon-gradient mb-8 text-center">Card Components</h2>
        
        {/* Standard Neon Cards */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Standard Neon Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardData.map((card, index) => (
              <div key={index} className="card-neon">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-neon-gradient-blur neon-glow-purple">
                    {card.icon}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted bg-glass px-3 py-1 rounded-full">
                    {card.trend}
                  </span>
                </div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-2">
                  {card.title}
                </h4>
                <p className="text-3xl font-bold text-neon-gradient mb-2">{card.value}</p>
                <p className="text-sm text-text-secondary">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient Neon Cards */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-text-primary mb-6">Gradient Neon Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cardData.map((card, index) => (
              <div key={index} className="card-neon-gradient">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                    {card.icon}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/80 bg-white/10 px-3 py-1 rounded-full">
                    {card.trend}
                  </span>
                </div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-2">
                  {card.title}
                </h4>
                <p className="text-3xl font-bold text-white mb-2">{card.value}</p>
                <p className="text-sm text-white/80">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Glassmorphism Cards */}
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-6">Glassmorphism Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-3xl p-6">
              <h4 className="text-xl font-bold text-neon-gradient mb-3">Financial Overview</h4>
              <p className="text-text-secondary mb-4">
                Comprehensive financial analytics with real-time data visualization and predictive insights.
              </p>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <span className="h-2 w-2 rounded-full bg-neon-gradient animate-neon-pulse" />
                Updated 2 minutes ago
              </div>
            </div>
            
            <div className="glass-card rounded-3xl p-6">
              <h4 className="text-xl font-bold text-neon-gradient mb-3">Performance Metrics</h4>
              <p className="text-text-secondary mb-4">
                Track key performance indicators with advanced analytics and automated reporting.
              </p>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <span className="h-2 w-2 rounded-full bg-neon-gradient animate-neon-pulse" />
                Live monitoring active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





