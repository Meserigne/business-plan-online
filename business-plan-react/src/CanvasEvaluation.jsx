import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const CanvasEvaluation = () => {
  const [scores, setScores] = useState({});
  const [showReport, setShowReport] = useState(false);

  const handleScoreChange = (indicator, value) => {
    setScores(prev => ({
      ...prev,
      [indicator]: parseInt(value)
    }));
  };

  const allEvaluated = Object.keys(scores).length === 6;

  const generateReport = () => {
    setShowReport(true);
  };

  const getTotalScore = () => {
    return Object.values(scores).reduce((a, b) => a + b, 0);
  };

  const getScoreInterpretation = (total) => {
    if (total >= 20) return "Excellent projet d'investissement";
    if (total >= 16) return "Bon projet avec potentiel";
    if (total >= 12) return "Projet moyen à surveiller";
    return "Projet risqué, amélioration nécessaire";
  };

  const getScoreLabel = (score) => {
    switch(score) {
      case 4: return { label: "Excellent", class: "score-excellent" };
      case 3: return { label: "Bon", class: "score-good" };
      case 2: return { label: "Moyen", class: "score-average" };
      case 1: return { label: "Faible", class: "score-poor" };
      default: return { label: "Non évalué", class: "" };
    }
  };

  const indicators = [
    {
      id: 'equipe',
      icon: '👥',
      title: 'Équipe',
      positives: [
        'Leader du projet identifié',
        'Équipe expérimentée',
        'Dimension internationale',
        'Complémentarité des fondateurs',
        'Board expérimenté',
        'Accompagnement professionnel'
      ],
      negatives: [
        'Créateur isolé',
        'Équipe trop jeune sans mentors',
        'Pas de leader clair',
        'Parts égales entre fondateurs',
        'Manque d\'écoute'
      ]
    },
    {
      id: 'finance',
      icon: '💰',
      title: 'Finance',
      positives: [
        'Trésorerie > 6 mois',
        'Business angels au capital',
        'Maîtrise des ratios financiers',
        'Vision long terme'
      ],
      negatives: [
        'Cash < 4 mois',
        'BA avec >30-50% du capital',
        'Burn rate trop élevé',
        'Dilution excessive'
      ]
    },
    {
      id: 'presentation',
      icon: '📊',
      title: 'Présentation',
      positives: [
        'Pitch concis et percutant',
        'Présentation sans slides',
        'Documents clairs',
        'Message mémorable'
      ],
      negatives: [
        'Présentation trop longue',
        'Message confus',
        'Activité peu claire',
        'Trop de détails techniques'
      ]
    },
    {
      id: 'businessplan',
      icon: '📈',
      title: 'Business Plan',
      positives: [
        'Monétisation claire et rapide',
        'Analyse concurrentielle approfondie',
        'Différenciation nette',
        'Projections cohérentes',
        'Stratégie marketing précise'
      ],
      negatives: [
        'Monétisation floue',
        'Aucune concurrence (= pas de marché)',
        'Incohérences dans les chiffres',
        'Stratégie marketing vague'
      ]
    },
    {
      id: 'clients',
      icon: '🎯',
      title: 'Clients',
      positives: [
        'Segmentation claire',
        'Marché quantifié',
        'Personas définis',
        'Early adopters identifiés'
      ],
      negatives: [
        'Pas de segmentation',
        'Cible trop large',
        'Marché mal défini',
        'Méconnaissance des besoins'
      ]
    },
    {
      id: 'produit',
      icon: '🚀',
      title: 'Produit',
      positives: [
        'Résout un vrai problème',
        'Produit démontrable',
        'Valeur ajoutée claire',
        '"Must have" vs "Nice to have"'
      ],
      negatives: [
        'Encore en R&D',
        'Mise en œuvre complexe',
        'Produit "nice to have"',
        'ROI peu clair'
      ]
    }
  ];

  const getRecommendations = () => {
    const total = getTotalScore();
    const recommendations = [];

    Object.entries(scores).forEach(([indicator, score]) => {
      if (score <= 2) {
        const indicatorData = indicators.find(i => i.id === indicator);
        recommendations.push(`Améliorer l'aspect "${indicatorData.title}" - Score actuel: ${score}/4`);
      }
    });

    if (total < 12) {
      recommendations.push("Revoir fondamentalement le projet avant de chercher des investisseurs");
    } else if (total < 16) {
      recommendations.push("Renforcer les points faibles avant la levée de fonds");
    } else if (total < 20) {
      recommendations.push("Projet prometteur, peaufiner les derniers détails");
    } else {
      recommendations.push("Excellent projet, prêt pour la présentation aux investisseurs");
    }

    return recommendations;
  };

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
    },
    title: {
      textAlign: 'center',
      color: '#ea580c',
      fontSize: '2.5em',
      marginBottom: '10px',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },
    subtitle: {
      textAlign: 'center',
      color: '#666',
      marginBottom: '40px',
      fontSize: '1.1em'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '25px',
      marginBottom: '40px'
    },
    card: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      border: '3px solid transparent',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    cardEvaluated: {
      borderColor: '#2196F3'
    },
    cardBefore: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '5px',
      background: 'linear-gradient(90deg, #4CAF50, #45a049)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px'
    },
    icon: {
      width: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #4CAF50, #45a049)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '15px',
      fontSize: '24px',
      color: 'white'
    },
    cardTitle: {
      fontSize: '1.4em',
      fontWeight: 'bold',
      color: '#ea580c'
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '20px'
    },
    positiveSection: {
      padding: '15px',
      borderRadius: '10px',
      background: '#f0f9f0',
      border: '1px solid #c3e6c3'
    },
    negativeSection: {
      padding: '15px',
      borderRadius: '10px',
      background: '#fef0f0',
      border: '1px solid #f5c6c6'
    },
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    positiveSectionTitle: {
      color: '#2e7d32'
    },
    negativeSectionTitle: {
      color: '#c62828'
    },
    list: {
      listStyle: 'none',
      fontSize: '0.9em',
      margin: 0,
      padding: 0
    },
    listItem: {
      padding: '5px 0',
      paddingLeft: '20px',
      position: 'relative',
      lineHeight: '1.4'
    },
    evaluationSection: {
      background: '#f8f9fa',
      borderRadius: '10px',
      padding: '20px',
      marginTop: '20px',
      border: '2px solid #e0e0e0'
    },
    evaluationTitle: {
      fontWeight: 'bold',
      color: '#ea580c',
      marginBottom: '15px',
      fontSize: '1.1em'
    },
    ratingOptions: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px'
    },
    ratingOption: {
      display: 'flex',
      alignItems: 'center',
      background: 'white',
      padding: '12px',
      borderRadius: '8px',
      border: '2px solid #e0e0e0',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    ratingOptionSelected: {
      background: '#fff7ed',
      borderColor: '#fb923c'
    },
    generateBtn: {
      display: 'block',
      margin: '40px auto',
      padding: '15px 40px',
      background: allEvaluated ? 'linear-gradient(135deg, #fb923c, #ea580c)' : '#ccc',
      color: 'white',
      border: 'none',
      borderRadius: '30px',
      fontSize: '1.2em',
      fontWeight: 'bold',
      cursor: allEvaluated ? 'pointer' : 'not-allowed',
      transition: 'all 0.3s ease',
      boxShadow: allEvaluated ? '0 5px 20px rgba(251, 146, 60, 0.3)' : 'none'
    },
    modal: {
      display: showReport ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      overflowY: 'auto'
    },
    modalContent: {
      background: 'white',
      maxWidth: '800px',
      margin: '50px auto',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      position: 'relative'
    },
    closeModal: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      fontSize: '30px',
      cursor: 'pointer',
      color: '#666'
    },
    reportTitle: {
      fontSize: '2em',
      color: '#1e3c72',
      marginBottom: '30px',
      textAlign: 'center'
    },
    scoreSummary: {
      background: 'linear-gradient(135deg, #fb923c, #ea580c)',
      color: 'white',
      padding: '30px',
      borderRadius: '15px',
      textAlign: 'center',
      marginBottom: '30px'
    },
    scoreValue: {
      fontSize: '4em',
      fontWeight: 'bold',
      margin: '10px 0'
    },
    scoreLabel: {
      fontSize: '1.2em',
      opacity: 0.9
    },
    indicatorResult: {
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '15px',
      borderLeft: '5px solid #2196F3'
    },
    indicatorResultHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    },
    indicatorResultTitle: {
      fontWeight: 'bold',
      fontSize: '1.2em',
      color: '#ea580c'
    },
    indicatorResultScore: {
      fontWeight: 'bold',
      padding: '5px 15px',
      borderRadius: '20px',
      color: 'white',
      fontSize: '0.9em'
    },
    recommendations: {
      marginTop: '30px'
    },
    recommendationTitle: {
      fontSize: '1.5em',
      color: '#ea580c',
      marginBottom: '20px'
    },
    recommendationList: {
      listStyle: 'none',
      padding: 0
    },
    recommendationItem: {
      background: '#fff7ed',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '10px',
      borderLeft: '4px solid #fb923c'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header avec logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <Logo size={80} />
        <div style={{ textAlign: 'center' }}>
          <h1 style={{...styles.title, margin: 0, marginBottom: '5px'}}>Canvas d'Évaluation Investisseur</h1>
          <p style={{...styles.subtitle, margin: 0}}>Évaluez chaque indicateur pour générer un rapport d'investissement personnalisé</p>
        </div>
      </div>
      
      <div style={styles.grid}>
        {indicators.map((indicator) => (
          <div 
            key={indicator.id}
            style={{
              ...styles.card,
              ...(scores[indicator.id] ? styles.cardEvaluated : {})
            }}
          >
            <div style={styles.cardBefore}></div>
            
            <div style={styles.header}>
              <div style={styles.icon}>{indicator.icon}</div>
              <div style={styles.cardTitle}>{indicator.title}</div>
            </div>
            
            <div style={styles.content}>
              <div style={styles.positiveSection}>
                <div style={{...styles.sectionTitle, ...styles.positiveSectionTitle}}>
                  <span>✓</span> Signes Positifs
                </div>
                <ul style={styles.list}>
                  {indicator.positives.map((item, index) => (
                    <li key={index} style={styles.listItem}>→ {item}</li>
                  ))}
                </ul>
              </div>
              
              <div style={styles.negativeSection}>
                <div style={{...styles.sectionTitle, ...styles.negativeSectionTitle}}>
                  <span>✗</span> Signaux d'Alerte
                </div>
                <ul style={styles.list}>
                  {indicator.negatives.map((item, index) => (
                    <li key={index} style={styles.listItem}>→ {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div style={styles.evaluationSection}>
              <div style={styles.evaluationTitle}>Évaluation {indicator.title.toLowerCase()} :</div>
              <div style={styles.ratingOptions}>
                {[4, 3, 2, 1].map((value) => (
                  <label 
                    key={value}
                    style={{
                      ...styles.ratingOption,
                      ...(scores[indicator.id] === value ? styles.ratingOptionSelected : {})
                    }}
                  >
                    <input
                      type="radio"
                      name={indicator.id}
                      value={value}
                      onChange={(e) => handleScoreChange(indicator.id, e.target.value)}
                      style={{ marginRight: '10px' }}
                    />
                    <span>
                      {value === 4 && 'Excellent (4/4)'}
                      {value === 3 && 'Bon (3/4)'}
                      {value === 2 && 'Moyen (2/4)'}
                      {value === 1 && 'Faible (1/4)'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        style={styles.generateBtn}
        onClick={generateReport}
        disabled={!allEvaluated}
      >
        Générer le Rapport d'Évaluation
      </button>
      
      {/* Modal pour le rapport */}
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <span 
            style={styles.closeModal}
            onClick={() => setShowReport(false)}
          >
            &times;
          </span>
          
          <h2 style={styles.reportTitle}>Rapport d'Évaluation d'Investissement</h2>
          
          <div style={styles.scoreSummary}>
            <div style={styles.scoreLabel}>Score Global</div>
            <div style={styles.scoreValue}>{getTotalScore()}/24</div>
            <div style={styles.scoreLabel}>{getScoreInterpretation(getTotalScore())}</div>
          </div>
          
          <div>
            {indicators.map((indicator) => {
              const score = scores[indicator.id];
              const scoreData = getScoreLabel(score);
              return (
                <div key={indicator.id} style={styles.indicatorResult}>
                  <div style={styles.indicatorResultHeader}>
                    <div style={styles.indicatorResultTitle}>
                      {indicator.icon} {indicator.title}
                    </div>
                    <div 
                      style={{
                        ...styles.indicatorResultScore,
                        backgroundColor: 
                          score === 4 ? '#4CAF50' :
                          score === 3 ? '#8BC34A' :
                          score === 2 ? '#FFC107' : '#f44336'
                      }}
                    >
                      {scoreData.label} ({score}/4)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div style={styles.recommendations}>
            <h3 style={styles.recommendationTitle}>Recommandations</h3>
            <ul style={styles.recommendationList}>
              {getRecommendations().map((rec, index) => (
                <li key={index} style={styles.recommendationItem}>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button 
              style={{
                ...styles.generateBtn,
                background: '#4CAF50',
                display: 'inline-block',
                margin: '10px'
              }}
              onClick={() => window.print()}
            >
              📄 Imprimer le Rapport
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasEvaluation; 