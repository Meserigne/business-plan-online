import { useState } from 'react'
import BusinessPlanSimple from './BusinessPlanSimple'
import BusinessPlanForm from './BusinessPlanForm'
import CanvasEvaluation from './CanvasEvaluation'
import ModeleFinancier from './ModeleFinancier'
import Logo from './Logo'

function App() {
  const [currentView, setCurrentView] = useState('businessplan')

  const navStyles = {
    container: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '25px',
      marginBottom: '30px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      maxWidth: '1100px',
      margin: '0 auto 30px auto'
    },
    title: {
      textAlign: 'center',
      fontSize: '28px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '20px',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    nav: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    button: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: '0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'inherit'
    },
    activeButton: {
      background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(251, 146, 60, 0.3)',
      transform: 'translateY(-2px)'
    },
    inactiveButton: {
      background: 'rgba(251, 146, 60, 0.1)',
      color: '#ea580c',
      border: '2px solid rgba(251, 146, 60, 0.2)'
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
      padding: '20px'
    }}>
      {/* Navigation */}
      <div style={navStyles.container}>
        {/* Header avec logo et titre */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '25px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <Logo size={100} />
          <div style={{
            textAlign: 'center',
            flex: '1',
            minWidth: '300px'
          }}>
            <h1 style={{
              ...navStyles.title,
              margin: 0,
              fontSize: '24px'
            }}>
              🚀 Plateforme Business Plan & Évaluation
            </h1>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div style={navStyles.nav}>
          <button
            style={{
              ...navStyles.button,
              ...(currentView === 'businessplan' ? navStyles.activeButton : navStyles.inactiveButton)
            }}
            onClick={() => setCurrentView('businessplan')}
            onMouseEnter={(e) => {
              if (currentView !== 'businessplan') {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(251, 146, 60, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentView !== 'businessplan') {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            📋 Business Plan Simple
          </button>
          <button
            style={{
              ...navStyles.button,
              ...(currentView === 'businessplanform' ? navStyles.activeButton : navStyles.inactiveButton)
            }}
            onClick={() => setCurrentView('businessplanform')}
            onMouseEnter={(e) => {
              if (currentView !== 'businessplanform') {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(251, 146, 60, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentView !== 'businessplanform') {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            📝 Business Plan Complet (60 Questions)
          </button>
          <button
            style={{
              ...navStyles.button,
              ...(currentView === 'canvas' ? navStyles.activeButton : navStyles.inactiveButton)
            }}
            onClick={() => setCurrentView('canvas')}
            onMouseEnter={(e) => {
              if (currentView !== 'canvas') {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(251, 146, 60, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentView !== 'canvas') {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            💼 Canvas d'Évaluation Investisseur
          </button>
          <button
            style={{
              ...navStyles.button,
              ...(currentView === 'financier' ? navStyles.activeButton : navStyles.inactiveButton)
            }}
            onClick={() => setCurrentView('financier')}
            onMouseEnter={(e) => {
              if (currentView !== 'financier') {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(251, 146, 60, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentView !== 'financier') {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            📊 Modèle Financier
          </button>
        </div>
      </div>

      {/* Contenu */}
      {currentView === 'businessplan' && <BusinessPlanSimple />}
      {currentView === 'businessplanform' && <BusinessPlanForm />}
      {currentView === 'canvas' && <CanvasEvaluation />}
      {currentView === 'financier' && <ModeleFinancier />}
    </div>
  )
}

export default App
