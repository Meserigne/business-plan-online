import React from 'react';

const Logo = ({ size = 120 }) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '15px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Ampoule avec engrenages */}
      <svg width={size} height={size * 0.8} viewBox="0 0 120 96" fill="none">
        {/* Corps de l'ampoule */}
        <ellipse cx="60" cy="45" rx="35" ry="45" fill="url(#lightbulbGradient)" stroke="url(#borderGradient)" strokeWidth="2"/>
        
        {/* Base de l'ampoule */}
        <rect x="45" y="75" width="30" height="15" fill="url(#baseGradient)" rx="2"/>
        <line x1="48" y1="78" x2="72" y2="78" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <line x1="48" y1="82" x2="72" y2="82" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <line x1="48" y1="86" x2="72" y2="86" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        
        {/* Engrenages à l'intérieur */}
        {/* Engrenage central bleu */}
        <g transform="translate(60,45)">
          <circle cx="0" cy="0" r="12" fill="url(#gearBlue)"/>
          <circle cx="0" cy="-8" r="2" fill="url(#gearBlue)"/>
          <circle cx="6" cy="-6" r="2" fill="url(#gearBlue)"/>
          <circle cx="8" cy="0" r="2" fill="url(#gearBlue)"/>
          <circle cx="6" cy="6" r="2" fill="url(#gearBlue)"/>
          <circle cx="0" cy="8" r="2" fill="url(#gearBlue)"/>
          <circle cx="-6" cy="6" r="2" fill="url(#gearBlue)"/>
          <circle cx="-8" cy="0" r="2" fill="url(#gearBlue)"/>
          <circle cx="-6" cy="-6" r="2" fill="url(#gearBlue)"/>
        </g>
        
        {/* Engrenage gauche teal */}
        <g transform="translate(40,35)">
          <circle cx="0" cy="0" r="8" fill="url(#gearTeal)"/>
          <circle cx="0" cy="-6" r="1.5" fill="url(#gearTeal)"/>
          <circle cx="4" cy="-4" r="1.5" fill="url(#gearTeal)"/>
          <circle cx="6" cy="0" r="1.5" fill="url(#gearTeal)"/>
          <circle cx="4" cy="4" r="1.5" fill="url(#gearTeal)"/>
          <circle cx="0" cy="6" r="1.5" fill="url(#gearTeal)"/>
          <circle cx="-4" cy="4" r="1.5" fill="url(#gearTeal)"/>
          <circle cx="-6" cy="0" r="1.5" fill="url(#gearTeal)"/>
          <circle cx="-4" cy="-4" r="1.5" fill="url(#gearTeal)"/>
        </g>
        
        {/* Engrenage droit violet */}
        <g transform="translate(80,55)">
          <circle cx="0" cy="0" r="6" fill="url(#gearPurple)"/>
          <circle cx="0" cy="-4" r="1" fill="url(#gearPurple)"/>
          <circle cx="3" cy="-3" r="1" fill="url(#gearPurple)"/>
          <circle cx="4" cy="0" r="1" fill="url(#gearPurple)"/>
          <circle cx="3" cy="3" r="1" fill="url(#gearPurple)"/>
          <circle cx="0" cy="4" r="1" fill="url(#gearPurple)"/>
          <circle cx="-3" cy="3" r="1" fill="url(#gearPurple)"/>
          <circle cx="-4" cy="0" r="1" fill="url(#gearPurple)"/>
          <circle cx="-3" cy="-3" r="1" fill="url(#gearPurple)"/>
        </g>
        
        {/* Petit engrenage orange */}
        <g transform="translate(45,60)">
          <circle cx="0" cy="0" r="4" fill="url(#gearOrange)"/>
          <circle cx="0" cy="-3" r="0.8" fill="url(#gearOrange)"/>
          <circle cx="2" cy="-2" r="0.8" fill="url(#gearOrange)"/>
          <circle cx="3" cy="0" r="0.8" fill="url(#gearOrange)"/>
          <circle cx="2" cy="2" r="0.8" fill="url(#gearOrange)"/>
          <circle cx="0" cy="3" r="0.8" fill="url(#gearOrange)"/>
          <circle cx="-2" cy="2" r="0.8" fill="url(#gearOrange)"/>
          <circle cx="-3" cy="0" r="0.8" fill="url(#gearOrange)"/>
          <circle cx="-2" cy="-2" r="0.8" fill="url(#gearOrange)"/>
        </g>
        
        {/* Définitions des gradients */}
        <defs>
          <linearGradient id="lightbulbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)"/>
            <stop offset="50%" stopColor="rgba(251,146,60,0.2)"/>
            <stop offset="100%" stopColor="rgba(234,88,12,0.3)"/>
          </linearGradient>
          
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c"/>
            <stop offset="100%" stopColor="#ea580c"/>
          </linearGradient>
          
          <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78716c"/>
            <stop offset="100%" stopColor="#57534e"/>
          </linearGradient>
          
          <linearGradient id="gearBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c"/>
            <stop offset="100%" stopColor="#f97316"/>
          </linearGradient>
          
          <linearGradient id="gearTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa"/>
            <stop offset="100%" stopColor="#fdba74"/>
          </linearGradient>
          
          <linearGradient id="gearPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c"/>
            <stop offset="100%" stopColor="#c2410c"/>
          </linearGradient>
          
          <linearGradient id="gearOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffedd5"/>
            <stop offset="100%" stopColor="#fed7aa"/>
          </linearGradient>
        </defs>
      </svg>
      
      {/* Texte du logo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{
          fontSize: size * 0.13 + 'px',
          fontWeight: '300',
          color: '#78716c',
          letterSpacing: '1px'
        }}>
          The
        </div>
        <div style={{
          fontSize: size * 0.18 + 'px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          LIGHTBULB
        </div>
        <div style={{
          fontSize: size * 0.13 + 'px',
          fontWeight: '500',
          color: '#f97316',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>
          AGENCY
        </div>
        <div style={{
          width: '100%',
          height: '3px',
          background: 'linear-gradient(90deg, #fb923c 0%, #ea580c 100%)',
          borderRadius: '2px',
          marginTop: '2px'
        }}></div>
      </div>
    </div>
  );
};

export default Logo; 