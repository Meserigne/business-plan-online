import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Save, Download, Share2, Cloud, CheckCircle, AlertCircle, Copy, Mail, MessageCircle } from 'lucide-react';

const BusinessPlanOnline = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [formData, setFormData] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [saveStatus, setSaveStatus] = useState('saved'); // saved, saving, error
  const [shareUrl, setShareUrl] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [projectName, setProjectName] = useState('Mon Business Plan');
  const [lastSaved, setLastSaved] = useState(new Date());

  // Simulation de sauvegarde automatique
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(formData).length > 0) {
        setSaveStatus('saving');
        // Simule une sauvegarde en ligne
        setTimeout(() => {
          setSaveStatus('saved');
          setLastSaved(new Date());
          // Génère une URL de partage unique
          const uniqueId = Math.random().toString(36).substr(2, 9);
          setShareUrl(`https://businessplan.app/shared/${uniqueId}`);
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData]);

  const sections = [
    {
      title: "CONNAÎTRE SON MARCHÉ",
      color: "bg-blue-50 border-blue-200",
      icon: "🎯",
      questions: [
        { id: 1, text: "Quelle est la taille du marché ? Est-il local, national, mondial ?", type: "textarea", required: true },
        { id: 2, text: "Combien de clients espérer ?", type: "number", required: true },
        { id: 3, text: "Sur ce marché, y a-t-il pénurie ou excès d'offre ?", type: "select", options: ["Pénurie", "Équilibre", "Excès d'offre"], required: true },
        { id: 4, text: "De nouveaux acteurs peuvent-ils apparaître à brève échéance ?", type: "select", options: ["Oui", "Non", "Incertain"] },
        { id: 5, text: "L'activité est-elle B to B ou B to C ?", type: "select", options: ["B to B", "B to C", "Les deux"], required: true },
        { id: 6, text: "L'offre est-elle en phase avec les attentes du marché ?", type: "textarea" },
        { id: 7, text: "Quels sont les critères d'achat des clients ? Sont-ils loyaux et captifs ?", type: "textarea" },
        { id: 8, text: "Quels sont les bénéfices clients du produit ou service ?", type: "textarea", required: true },
        { id: 9, text: "Y a-t-il une concurrence, frontale ou partielle, avec une offre existante ?", type: "textarea" },
        { id: 10, text: "Est-il facile de se différencier et trouver une position de 'niche' ?", type: "textarea" },
        { id: 11, text: "Combien d'années d'expérience du secteur faut-il pour être crédible auprès des clients ?", type: "number" },
        { id: 12, text: "Qui sont les concurrents ?", type: "textarea", required: true },
        { id: 13, text: "Votre savoir-faire vous donne-t-il un réel avantage ?", type: "textarea" },
        { id: 14, text: "Où se crée la valeur ajoutée dans la filière ?", type: "textarea" },
        { id: 15, text: "Quel est le poids des différents acteurs (clients, fournisseurs, sous-traitants, autorités réglementaires...) ?", type: "textarea" },
        { id: 16, text: "Comment évoluent les prix ?", type: "textarea" },
        { id: 17, text: "Les changements réglementaires et les normes risquent-ils de rendre plus complexes et plus coûteux le démarrage et l'exercice de votre activité ?", type: "textarea" },
        { id: 18, text: "Qui sont les fournisseurs ? Sont-ils nombreux ? Concentrés ?", type: "textarea" },
        { id: 19, text: "Est-il facile d'en changer ?", type: "select", options: ["Très facile", "Facile", "Difficile", "Très difficile"] },
        { id: 20, text: "Auront-ils un pouvoir d'influence sur la qualité et le coût de votre offre ?", type: "textarea" }
      ]
    },
    {
      title: "AVOIR LE PROFIL ADAPTÉ ET LE SOUTIEN DE SES PROCHES",
      color: "bg-green-50 border-green-200",
      icon: "👥",
      questions: [
        { id: 21, text: "Avez-vous déjà dirigé une entreprise ou un centre de profit ?", type: "select", options: ["Oui", "Non"], required: true },
        { id: 22, text: "Êtes-vous formé au management ?", type: "select", options: ["Oui", "Non", "Partiellement"] },
        { id: 23, text: "Votre environnement familial peut-il faciliter la réalisation de votre projet ? Avez-vous le soutien de votre conjoint ?", type: "textarea", required: true },
        { id: 24, text: "Combien de contacts 'activables' contient votre carnet d'adresses professionnel et personnel ?", type: "number" },
        { id: 25, text: "Connaissez-vous une personne avec qui vous pouvez faire régulièrement le point sur l'avancement de votre projet ?", type: "select", options: ["Oui", "Non"] },
        { id: 26, text: "Avez-vous rencontré une association de créateurs et d'accompagnement ?", type: "select", options: ["Oui", "Non", "En cours"] },
        { id: 27, text: "Êtes-vous prêt à faire des sacrifices financiers par rapport à votre rémunération actuelle ?", type: "textarea", required: true },
        { id: 28, text: "Quels seront vos besoins financiers dans les prochaines années (emprunts, scolarité des enfants...) ?", type: "textarea" }
      ]
    },
    {
      title: "FORMER UNE ÉQUIPE",
      color: "bg-purple-50 border-purple-200",
      icon: "🤝",
      questions: [
        { id: 29, text: "Pouvez-vous vous appuyer sur une équipe 'soudée', complémentaire, expérimentée ?", type: "textarea", required: true },
        { id: 30, text: "Les compétences clés pour la réussite de votre projet y sont-elles représentées ?", type: "textarea" },
        { id: 31, text: "À défaut, pouvez-vous compter sur des partenaires extérieurs ?", type: "textarea" },
        { id: 32, text: "Vos objectifs sont-ils compris et partagés par tous ?", type: "select", options: ["Oui", "Non", "Partiellement"] },
        { id: 33, text: "Avez-vous prévu et organisé la fidélisation de vos 'hommes clés' ?", type: "textarea" }
      ]
    },
    {
      title: "BLINDER SA STRATÉGIE MARKETING ET COMMERCIALE",
      color: "bg-orange-50 border-orange-200",
      icon: "📈",
      questions: [
        { id: 34, text: "Savez-vous à quels types de clients vous allez vous adresser ?", type: "textarea", required: true },
        { id: 35, text: "Votre marché est-il segmenté ?", type: "select", options: ["Oui", "Non"] },
        { id: 36, text: "Avez-vous défini des cibles prioritaires ?", type: "textarea", required: true },
        { id: 37, text: "Ferez-vous face à un réseau de prescripteurs actifs ?", type: "textarea" },
        { id: 38, text: "Quels sont les moyens commerciaux à mettre en œuvre pour atteindre votre objectif de chiffre d'affaires ?", type: "textarea", required: true },
        { id: 39, text: "Votre processus de commercialisation est-il défini ?", type: "textarea" },
        { id: 40, text: "Comment allez-vous organiser votre force de vente ?", type: "textarea" },
        { id: 41, text: "Avez-vous prévu un système de prévision et de reporting ?", type: "select", options: ["Oui", "Non", "En cours"] },
        { id: 42, text: "Vous faut-il une fonction marketing ?", type: "select", options: ["Oui", "Non", "À déterminer"] },
        { id: 43, text: "Avez-vous chiffré votre budget de communication ?", type: "text", required: true },
        { id: 44, text: "De quels outils de communication disposez-vous ?", type: "textarea" }
      ]
    },
    {
      title: "PROTÉGER SON SAVOIR-FAIRE ET PRODUIT",
      color: "bg-red-50 border-red-200",
      icon: "🔒",
      questions: [
        { id: 45, text: "Votre savoir-faire technologique peut-il faire l'objet d'une protection juridique ?", type: "textarea" },
        { id: 46, text: "Votre solution peut-elle s'imposer comme un standard dans le secteur ?", type: "textarea" },
        { id: 47, text: "Allez-vous devoir convaincre d'autres acteurs technologiques ?", type: "textarea" },
        { id: 48, text: "Votre innovation risque-t-elle d'être rapidement dépassée ?", type: "textarea" },
        { id: 49, text: "Avez-vous chiffré vos besoins de recherche-développement ?", type: "text", required: true },
        { id: 50, text: "Votre outil de production de départ sera-t-il suffisamment 'calibré' ?", type: "textarea" },
        { id: 51, text: "Savez-vous arbitrer entre production interne et sous-traitance ?", type: "textarea" }
      ]
    },
    {
      title: "TROUVER DES FINANCEMENTS",
      color: "bg-yellow-50 border-yellow-200",
      icon: "💰",
      questions: [
        { id: 52, text: "Quel est votre besoin financier global ?", type: "text", required: true },
        { id: 53, text: "Avec quelle répartition entre capitaux propres et endettement ?", type: "textarea", required: true },
        { id: 54, text: "Votre business est-il générateur ou consommateur de cash ?", type: "select", options: ["Générateur", "Consommateur", "Équilibré"], required: true },
        { id: 55, text: "Quels seront vos besoins de trésorerie en première année d'activité ?", type: "text", required: true },
        { id: 56, text: "Quel sera le délai d'encaissement des clients ? Pourrez-vous obtenir des fournisseurs des délais de paiement ?", type: "textarea" },
        { id: 57, text: "Au bout de combien de mois vos flux de trésorerie seront-ils, de manière récurrente, positifs ?", type: "number", required: true },
        { id: 58, text: "Quel est le montant prévisionnel de votre besoin de financement cumulé avant d'atteindre le point mort en trésorerie ?", type: "text", required: true },
        { id: 59, text: "Quand pensez-vous atteindre le seuil de rentabilité ?", type: "text", required: true },
        { id: 60, text: "La rentabilité dégagée à l'horizon de trois à cinq ans est-elle suffisante ?", type: "textarea", required: true }
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

  const getRequiredCompletionRate = () => {
    const requiredQuestions = sections.reduce((sum, section) => 
      sum + section.questions.filter(q => q.required).length, 0);
    const answeredRequired = sections.reduce((sum, section) => 
      sum + section.questions.filter(q => q.required && formData[q.id] && formData[q.id].toString().trim() !== '').length, 0);
    return Math.round((answeredRequired / requiredQuestions) * 100);
  };

  const exportToPDF = () => {
    alert('Fonctionnalité d\'export PDF disponible dans la version complète');
  };

  const shareProject = () => {
    setShowShareModal(true);
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Lien copié dans le presse-papiers !');
  };

  const sendByEmail = () => {
    const subject = encodeURIComponent(`Business Plan: ${projectName}`);
    const body = encodeURIComponent(`Découvrez mon business plan en ligne : ${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const renderQuestion = (question) => {
    const value = formData[question.id] || '';
    const isRequired = question.required;
    const isEmpty = !value || value.toString().trim() === '';
    
    const inputClasses = `w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
      isRequired && isEmpty ? 'border-red-300 bg-red-50' : 'border-gray-200'
    }`;
    
    switch (question.type) {
      case 'textarea':
        return (
          <textarea
            className={inputClasses + ' resize-vertical'}
            rows="3"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder="Votre réponse..."
          />
        );
      case 'select':
        return (
          <select
            className={inputClasses}
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          >
            <option value="">Sélectionnez une option</option>
            {question.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            className={inputClasses}
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder="Entrez un nombre"
          />
        );
      default:
        return (
          <input
            type="text"
            className={inputClasses}
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder="Votre réponse..."
          />
        );
    }
  };

  // Simulation d'authentification utilisateur
  const [user, setUser] = useState({ name: 'Jean Dupont', email: 'jean@example.com', avatar: '👤' });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* En-tête avec statut de sauvegarde */}
      <div className="sticky top-0 bg-white border-b border-gray-200 pb-4 mb-8 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              🌐 Business Plan Online
            </h1>
            <div className="flex items-center gap-2 text-sm">
              {saveStatus === 'saving' && (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600">Sauvegarde...</span>
                </>
              )}
              {saveStatus === 'saved' && (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Sauvegardé automatiquement</span>
                </>
              )}
              {saveStatus === 'error' && (
                <>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-red-600">Erreur de sauvegarde</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg text-sm">
              <span className="text-lg">{user.avatar}</span>
              <span className="text-gray-700">{user.name}</span>
            </div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded text-sm"
              placeholder="Nom du projet"
            />
            <button
              onClick={shareProject}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Share2 size={14} />
              Partager
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          Dernière sauvegarde: {lastSaved.toLocaleTimeString()} • Version cloud synchronisée
        </div>
        
        {/* Barre de progression avec détails */}
        <div className="space-y-2">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progression globale</span>
              <span className="text-sm font-medium text-blue-600">{getCompletionRate()}% complété</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionRate()}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Questions requises: {getRequiredCompletionRate()}%</span>
              <span className="text-gray-600">
                {Object.keys(formData).filter(key => formData[key] && formData[key].toString().trim() !== '').length} / {sections.reduce((sum, section) => sum + section.questions.length, 0)} réponses
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={16} />
            Export PDF
          </button>
          <button
            onClick={() => {
              const dataStr = JSON.stringify({ projectName, formData, lastSaved }, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              const exportFileDefaultName = `${projectName.replace(/\s+/g, '_')}_backup.json`;
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', exportFileDefaultName);
              linkElement.click();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Save size={16} />
            Backup local
          </button>
        </div>
      </div>

      {/* Modal de partage */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Partager votre Business Plan</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lien de partage</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 p-2 border border-gray-200 rounded text-sm"
                  />
                  <button
                    onClick={copyShareUrl}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={sendByEmail}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Mail size={16} />
                  Email
                </button>
                <button
                  onClick={() => {
                    const text = `Découvrez mon business plan: ${shareUrl}`;
                    if (navigator.share) {
                      navigator.share({ title: projectName, text, url: shareUrl });
                    } else {
                      navigator.clipboard.writeText(text);
                      alert('Lien copié!');
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <MessageCircle size={16} />
                  Partager
                </button>
              </div>
            </div>
            
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Sections du formulaire */}
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={`border rounded-lg ${section.color} shadow-sm`}>
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-opacity-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {section.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>({section.questions.length} questions)</span>
                    <span>
                      {section.questions.filter(q => formData[q.id] && formData[q.id].toString().trim() !== '').length} complétées
                    </span>
                    {section.questions.some(q => q.required) && (
                      <span className="text-red-500">
                        {section.questions.filter(q => q.required).length} requises
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {expandedSections[sectionIndex] ? (
                <ChevronDown className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-600" />
              )}
            </button>
            
            {expandedSections[sectionIndex] && (
              <div className="px-4 pb-4">
                <div className="space-y-6">
                  {section.questions.map((question, questionIndex) => {
                    const isAnswered = formData[question.id] && formData[question.id].toString().trim() !== '';
                    const isRequired = question.required;
                    
                    return (
                      <div key={question.id} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-semibold">Q{question.id}.</span>
                            <span className="flex-1">{question.text}</span>
                            {isRequired && (
                              <span className="text-red-500 text-xs">Requis</span>
                            )}
                            {isAnswered && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </label>
                        {renderQuestion(question)}
                        {isRequired && !isAnswered && (
                          <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pied de page avec statut */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Statut du projet
          </h3>
          <div className="text-sm text-gray-500">
            Synchronisé avec le cloud
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded border">
            <div className="text-2xl font-bold text-blue-600">{getCompletionRate()}%</div>
            <div className="text-sm text-gray-600">Complété</div>
          </div>
          <div className="bg-white p-4 rounded border">
            <div className="text-2xl font-bold text-green-600">{getRequiredCompletionRate()}%</div>
            <div className="text-sm text-gray-600">Questions requises</div>
          </div>
          <div className="bg-white p-4 rounded border">
            <div className="text-2xl font-bold text-purple-600">
              {sections.filter((_, index) => expandedSections[index]).length}
            </div>
            <div className="text-sm text-gray-600">Sections ouvertes</div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          💡 Vos données sont automatiquement sauvegardées et synchronisées dans le cloud
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanOnline; 