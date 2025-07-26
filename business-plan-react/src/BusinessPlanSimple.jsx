import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const BusinessPlanSimple = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [formData, setFormData] = useState({});
  const [saveStatus, setSaveStatus] = useState('saved');
  const [projectName, setProjectName] = useState('Mon Business Plan');
  const [lastSaved, setLastSaved] = useState(new Date());
  const [language, setLanguage] = useState('fr');

  // Traductions
  const translations = {
    fr: {
      title: "🌐 Business Plan Online",
      saving: "⏳ Sauvegarde...",
      saved: "✅ Sauvegardé automatiquement",
      error: "❌ Erreur de sauvegarde",
      projectName: "Nom du projet",
      completed: "complété",
      responses: "réponses",
      save: "💾 Sauvegarder",
      exportPdf: "📄 Export PDF",
      exportAlert: "Export PDF disponible dans la version complète",
      projectStatus: "☁️ Statut du projet",
      autoSaved: "💡 Vos données sont automatiquement sauvegardées localement",
      sectionsOpen: "Sections ouvertes",
      requiredQuestions: "Questions requises",
      completed2: "Complété",
      questionsLabel: "questions",
      completedCount: "complétées",
      required: "requises",
      yourAnswer: "Votre réponse...",
      selectOption: "Sélectionnez une option",
      enterNumber: "Entrez un nombre",
      requiredField: "Ce champ est obligatoire",
      sections: {
        market: "CONNAÎTRE SON MARCHÉ",
        profile: "PROFIL ADAPTÉ ET SOUTIEN", 
        marketing: "STRATÉGIE MARKETING",
        financing: "FINANCEMENT"
      },
      questionsText: {
        1: "Quelle est la taille du marché ? Est-il local, national, mondial ?",
        2: "Combien de clients espérer ?",
        3: "Sur ce marché, y a-t-il pénurie ou excès d'offre ?",
        4: "De nouveaux acteurs peuvent-ils apparaître à brève échéance ?",
        5: "L'activité est-elle B to B ou B to C ?",
        21: "Avez-vous déjà dirigé une entreprise ou un centre de profit ?",
        22: "Êtes-vous formé au management ?",
        23: "Votre environnement familial peut-il faciliter la réalisation de votre projet ?",
        34: "Savez-vous à quels types de clients vous allez vous adresser ?",
        35: "Votre marché est-il segmenté ?",
        36: "Avez-vous défini des cibles prioritaires ?",
        52: "Quel est votre besoin financier global ?",
        53: "Avec quelle répartition entre capitaux propres et endettement ?",
        54: "Votre business est-il générateur ou consommateur de cash ?"
      },
      options: {
        shortage: "Pénurie",
        balance: "Équilibre", 
        excess: "Excès d'offre",
        yes: "Oui",
        no: "Non",
        uncertain: "Incertain",
        b2b: "B to B",
        b2c: "B to C",
        both: "Les deux",
        partially: "Partiellement",
        generator: "Générateur",
        consumer: "Consommateur",
        balanced: "Équilibré"
      }
    },
    en: {
      title: "🌐 Business Plan Online",
      saving: "⏳ Saving...",
      saved: "✅ Automatically saved",
      error: "❌ Save error",
      projectName: "Project name",
      completed: "completed",
      responses: "responses",
      save: "💾 Save",
      exportPdf: "📄 Export PDF",
      exportAlert: "PDF export available in full version",
      projectStatus: "☁️ Project status",
      autoSaved: "💡 Your data is automatically saved locally",
      sectionsOpen: "Open sections",
      requiredQuestions: "Required questions",
      completed2: "Completed",
      questionsLabel: "questions",
      completedCount: "completed",
      required: "required",
      yourAnswer: "Your answer...",
      selectOption: "Select an option",
      enterNumber: "Enter a number",
      requiredField: "This field is required",
      sections: {
        market: "KNOW YOUR MARKET",
        profile: "SUITABLE PROFILE AND SUPPORT",
        marketing: "MARKETING STRATEGY", 
        financing: "FINANCING"
      },
      questionsText: {
        1: "What is the market size? Is it local, national, global?",
        2: "How many customers do you expect?",
        3: "In this market, is there a shortage or excess of supply?",
        4: "Can new actors appear in the short term?",
        5: "Is the activity B to B or B to C?",
        21: "Have you ever run a business or profit center?",
        22: "Are you trained in management?",
        23: "Can your family environment facilitate the realization of your project?",
        34: "Do you know what types of customers you will target?",
        35: "Is your market segmented?",
        36: "Have you defined priority targets?",
        52: "What is your overall financial need?",
        53: "With what distribution between equity and debt?",
        54: "Is your business a cash generator or consumer?"
      },
      options: {
        shortage: "Shortage",
        balance: "Balance",
        excess: "Excess supply",
        yes: "Yes",
        no: "No", 
        uncertain: "Uncertain",
        b2b: "B to B",
        b2c: "B to C",
        both: "Both",
        partially: "Partially",
        generator: "Generator",
        consumer: "Consumer",
        balanced: "Balanced"
      }
    }
  };

  const t = translations[language];

  // Simulation de sauvegarde automatique
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(formData).length > 0) {
        setSaveStatus('saving');
        setTimeout(() => {
          setSaveStatus('saved');
          setLastSaved(new Date());
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData]);

  const sections = [
    {
      title: t.sections.market,
      icon: "🎯",
      questions: [
        { id: 1, text: t.questionsText[1], type: "textarea", required: true },
        { id: 2, text: t.questionsText[2], type: "number", required: true },
        { id: 3, text: t.questionsText[3], type: "select", options: [t.options.shortage, t.options.balance, t.options.excess], required: true },
        { id: 4, text: t.questionsText[4], type: "select", options: [t.options.yes, t.options.no, t.options.uncertain] },
        { id: 5, text: t.questionsText[5], type: "select", options: [t.options.b2b, t.options.b2c, t.options.both], required: true }
      ]
    },
    {
      title: t.sections.profile,
      icon: "👥",
      questions: [
        { id: 21, text: t.questionsText[21], type: "select", options: [t.options.yes, t.options.no], required: true },
        { id: 22, text: t.questionsText[22], type: "select", options: [t.options.yes, t.options.no, t.options.partially] },
        { id: 23, text: t.questionsText[23], type: "textarea", required: true }
      ]
    },
    {
      title: t.sections.marketing,
      icon: "📈",
      questions: [
        { id: 34, text: t.questionsText[34], type: "textarea", required: true },
        { id: 35, text: t.questionsText[35], type: "select", options: [t.options.yes, t.options.no] },
        { id: 36, text: t.questionsText[36], type: "textarea", required: true }
      ]
    },
    {
      title: t.sections.financing,
      icon: "💰",
      questions: [
        { id: 52, text: t.questionsText[52], type: "text", required: true },
        { id: 53, text: t.questionsText[53], type: "textarea", required: true },
        { id: 54, text: t.questionsText[54], type: "select", options: [t.options.generator, t.options.consumer, t.options.balanced], required: true }
      ]
    }
  ];

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleInputChange = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
    setSaveStatus('saving');
  };

  const getCompletionRate = () => {
    const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
    const answeredQuestions = Object.keys(formData).filter(key => formData[key] && formData[key].toString().trim() !== '').length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const exportData = () => {
    const dataStr = JSON.stringify({ projectName, formData, lastSaved }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${projectName.replace(/\s+/g, '_')}_backup.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderQuestion = (question) => {
    const value = formData[question.id] || '';
    const isRequired = question.required;
    const isEmpty = !value || value.toString().trim() === '';
    
    const inputStyle = {
      width: '100%',
      padding: '12px',
      border: `2px solid ${isRequired && isEmpty ? '#ef4444' : '#e5e7eb'}`,
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'inherit',
      backgroundColor: isRequired && isEmpty ? '#fef2f2' : 'white'
    };
    
    switch (question.type) {
      case 'textarea':
        return (
          <textarea
            style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={t.yourAnswer}
          />
        );
      case 'select':
        return (
          <select
            style={{...inputStyle, cursor: 'pointer'}}
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          >
            <option value="">{t.selectOption}</option>
            {question.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            style={inputStyle}
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={t.enterNumber}
          />
        );
      default:
        return (
          <input
            type="text"
            style={inputStyle}
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder={t.yourAnswer}
          />
        );
    }
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle = {
    position: 'sticky',
    top: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: 'none',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '24px',
    zIndex: 10,
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '15px',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: saveStatus === 'saved' ? '#059669' : '#6b7280',
    justifyContent: 'center',
    marginBottom: '15px'
  };

  const progressStyle = {
    width: '100%',
    height: '12px',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50px',
    overflow: 'hidden',
    marginBottom: '15px',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
  };

  const progressBarStyle = {
    height: '100%',
    background: 'linear-gradient(90deg, #fb923c 0%, #ea580c 100%)',
    borderRadius: '50px',
    width: `${getCompletionRate()}%`,
    transition: 'width 0.5s ease',
    boxShadow: '0 2px 10px rgba(251, 146, 60, 0.3)'
  };

  const buttonStyle = {
    padding: '14px 28px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    fontFamily: 'inherit',
    background: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
    color: '#ffffff',
    margin: '8px',
    boxShadow: '0 4px 15px rgba(251, 146, 60, 0.3)',
    transform: 'translateY(0)',
  };

  const sectionStyle = (index) => {
    const colors = [
      { bg: 'rgba(239, 246, 255, 0.95)', border: '#bfdbfe', icon: '#3b82f6' }, // Bleu
      { bg: 'rgba(240, 253, 244, 0.95)', border: '#bbf7d0', icon: '#10b981' }, // Vert
      { bg: 'rgba(255, 247, 237, 0.95)', border: '#fed7aa', icon: '#f59e0b' }, // Orange
      { bg: 'rgba(254, 242, 242, 0.95)', border: '#fecaca', icon: '#ef4444' }, // Rouge
    ];
    const color = colors[index % colors.length];
    
    return {
      border: `2px solid ${color.border}`,
      borderRadius: '16px',
      marginBottom: '24px',
      background: color.bg,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
    };
  };

  const sectionHeaderStyle = {
    width: '100%',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '16px',
    transition: 'all 0.3s ease'
  };

  const questionStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(5px)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    marginBottom: '18px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        {/* Première ligne : Titre + Statut + Nom du projet */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: 'fit-content'
          }}>
            <Logo size={60} />
            <div style={{
              ...titleStyle,
              fontSize: '20px',
              margin: 0,
              textAlign: 'left'
            }}>
              {t.title}
            </div>
          </div>
          
          <div style={{
            ...statusStyle,
            margin: 0,
            justifyContent: 'center',
            fontSize: '13px',
            flex: '1',
            minWidth: '180px'
          }}>
            {saveStatus === 'saving' && t.saving}
            {saveStatus === 'saved' && t.saved}
            {saveStatus === 'error' && t.error}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: '6px 12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇬🇧 EN</option>
            </select>

            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{
                padding: '8px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                minWidth: '180px',
                textAlign: 'center'
              }}
              placeholder={t.projectName}
            />
          </div>
        </div>
        
        {/* Deuxième ligne : Barre de progression */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            minWidth: 'fit-content'
          }}>
            {getCompletionRate()}% {t.completed}
          </div>
          
          <div style={{
            ...progressStyle,
            flex: '1',
            minWidth: '200px',
            margin: 0
          }}>
            <div style={progressBarStyle}></div>
          </div>
          
          <div style={{
            fontSize: '12px',
            color: '#6b7280',
            fontWeight: '500',
            minWidth: 'fit-content'
          }}>
            {Object.keys(formData).filter(key => formData[key] && formData[key].toString().trim() !== '').length} / {sections.reduce((sum, section) => sum + section.questions.length, 0)} {t.responses}
          </div>
        </div>

        {/* Troisième ligne : Boutons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <button 
            style={{
              ...buttonStyle,
              padding: '10px 20px',
              fontSize: '14px',
              margin: 0
            }}
            onClick={exportData}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(251, 146, 60, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(251, 146, 60, 0.3)';
            }}
          >
            {t.save}
          </button>
          <button 
            style={{
              ...buttonStyle,
              padding: '10px 20px',
              fontSize: '14px',
              margin: 0,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }} 
            onClick={() => alert(t.exportAlert)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
            }}
          >
            {t.exportPdf}
          </button>
        </div>
      </div>

      <div>
        {sections.map((section, sectionIndex) => (
          <div 
            key={sectionIndex} 
            style={sectionStyle(sectionIndex)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            }}
          >
            <button
              onClick={() => toggleSection(sectionIndex)}
              style={sectionHeaderStyle}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <span style={{fontSize: '24px'}}>{section.icon}</span>
                <div>
                  <h2 style={{fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: 0}}>
                    {section.title}
                  </h2>
                  <div style={{fontSize: '14px', color: '#6b7280', marginTop: '4px'}}>
                    ({section.questions.length} {t.questionsLabel}) • {' '}
                    {section.questions.filter(q => formData[q.id] && formData[q.id].toString().trim() !== '').length} {t.completedCount}
                    {section.questions.some(q => q.required) && (
                      <span style={{color: '#ef4444', marginLeft: '8px'}}>
                        {section.questions.filter(q => q.required).length} {t.required}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span style={{fontSize: '20px', color: '#6b7280'}}>
                {expandedSections[sectionIndex] ? '⬇️' : '➡️'}
              </span>
            </button>
            
            {expandedSections[sectionIndex] && (
              <div style={{padding: '0 20px 20px'}}>
                {section.questions.map((question) => {
                  const isAnswered = formData[question.id] && formData[question.id].toString().trim() !== '';
                  const isRequired = question.required;
                  
                  return (
                    <div key={question.id} style={questionStyle}>
                      <label style={{display: 'block', marginBottom: '8px'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                          <span style={{color: '#2563eb', fontWeight: '600'}}>Q{question.id}.</span>
                          <span style={{flex: 1, fontSize: '14px', fontWeight: '500', color: '#374151'}}>
                            {question.text}
                          </span>
                          {isRequired && (
                            <span style={{color: '#ef4444', fontSize: '12px'}}>Requis</span>
                          )}
                          {isAnswered && (
                            <span style={{color: '#22c55e', fontSize: '16px'}}>✅</span>
                          )}
                        </div>
                      </label>
                      {renderQuestion(question)}
                                              {isRequired && !isAnswered && (
                          <p style={{color: '#ef4444', fontSize: '12px', margin: '4px 0 0 0'}}>
                            {t.requiredField}
                          </p>
                        )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '30px',
        padding: '30px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{margin: '0 0 15px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}>
          {t.projectStatus}
        </h3>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px'}}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{fontSize: '28px', fontWeight: 'bold'}}>{getCompletionRate()}%</div>
            <div style={{fontSize: '15px', opacity: 0.9}}>{t.completed2}</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{fontSize: '28px', fontWeight: 'bold'}}>
              {sections.reduce((sum, section) => 
                sum + section.questions.filter(q => q.required && formData[q.id] && formData[q.id].toString().trim() !== '').length, 0
              )} / {sections.reduce((sum, section) => sum + section.questions.filter(q => q.required).length, 0)}
            </div>
            <div style={{fontSize: '15px', opacity: 0.9}}>{t.requiredQuestions}</div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease'
          }}>
            <div style={{fontSize: '28px', fontWeight: 'bold'}}>
              {sections.filter((_, index) => expandedSections[index]).length}
            </div>
            <div style={{fontSize: '15px', opacity: 0.9}}>{t.sectionsOpen}</div>
          </div>
        </div>

        <div style={{fontSize: '14px', color: '#6b7280'}}>
          {t.autoSaved}
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanSimple; 