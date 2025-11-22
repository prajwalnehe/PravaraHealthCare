import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-neon-gradient-radial opacity-50" />
      <div className="absolute inset-0 bg-neon-gradient-blur" />
      
      {/* Floating Glow Orbs */}
      <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-neon-gradient blur-3xl opacity-30 animate-neon-pulse" />
      <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-neon-gradient blur-3xl opacity-20 animate-neon-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 neon-glow-purple">
          <span className="h-2 w-2 rounded-full bg-neon-gradient animate-neon-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Next-Gen Financial Analytics
          </span>
        </div>
        
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="text-neon-gradient">Transform</span>
          <span className="text-text-primary"> Your </span>
          <span className="text-neon-gradient">Business</span>
          <br />
          <span className="text-text-primary">With </span>
          <span className="text-neon-glow">Real-Time</span>
          <span className="text-text-primary"> Intelligence</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
          Experience the future of financial analytics with our cutting-edge dashboard.
          <br className="hidden sm:block" />
          Powered by neon-powered insights and AI-driven predictions.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="btn-neon-primary text-lg px-8 py-4">
            Get Started Free
          </button>
          <button className="btn-neon-outline text-lg px-8 py-4">
            Watch Demo
          </button>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Active Users', value: '10K+', icon: '👥' },
            { label: 'Data Points', value: '1M+', icon: '📊' },
            { label: 'Uptime', value: '99.9%', icon: '⚡' },
          ].map((stat, index) => (
            <div key={index} className="card-neon glass-hover text-center">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-neon-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-text-muted uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}


