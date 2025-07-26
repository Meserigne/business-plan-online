import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Save, Download, BarChart3 } from 'lucide-react';

const BusinessPlanForm = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [formData, setFormData] = useState({});
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      title: "CONNAÎTRE SON MARCHÉ",
      color: "bg-blue-50 border-blue-200",
      icon: "🎯",
      questions: [
        { id: 1, text: "Quelle est la taille du marché ? Est-il local, national, mondial ?", type: "textarea" },
        { id: 2, text: "Combien de clients espérer ?", type: "number" },
        { id: 3, text: "Sur ce marché, y a-t-il pénurie ou excès d'offre ?", type: "select", options: ["Pénurie", "Équilibre", "Excès d'offre"] },
        { id: 4, text: "De nouveaux acteurs peuvent-ils apparaître à brève échéance ?", type: "select", options: ["Oui", "Non", "Incertain"] },
        { id: 5, text: "L'activité est-elle B to B ou B to C ?", type: "select", options: ["B to B", "B to C", "Les deux"] },
        { id: 6, text: "L'offre est-elle en phase avec les attentes du marché ?", type: "textarea" },
        { id: 7, text: "Quels sont les critères d'achat des clients ? Sont-ils loyaux et captifs ?", type: "textarea" },
        { id: 8, text: "Quels sont les bénéfices clients du produit ou service ?", type: "textarea" },
        { id: 9, text: "Y a-t-il une concurrence, frontale ou partielle, avec une offre existante ?", type: "textarea" },
        { id: 10, text: "Est-il facile de se différencier et trouver une position de 'niche' ?", type: "textarea" },
        { id: 11, text: "Combien d'années d'expérience du secteur faut-il pour être crédible auprès des clients ?", type: "number" },
        { id: 12, text: "Qui sont les concurrents ?", type: "textarea" },
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
        { id: 21, text: "Avez-vous déjà dirigé une entreprise ou un centre de profit ?", type: "select", options: ["Oui", "Non"] },
        { id: 22, text: "Êtes-vous formé au management ?", type: "select", options: ["Oui", "Non", "Partiellement"] },
        { id: 23, text: "Votre environnement familial peut-il faciliter la réalisation de votre projet ? Avez-vous le soutien de votre conjoint ?", type: "textarea" },
        { id: 24, text: "Combien de contacts 'activables' contient votre carnet d'adresses professionnel et personnel ?", type: "number" },
        { id: 25, text: "Connaissez-vous une personne avec qui vous pouvez faire régulièrement le point sur l'avancement de votre projet ?", type: "select", options: ["Oui", "Non"] },
        { id: 26, text: "Avez-vous rencontré une association de créateurs et d'accompagnement ?", type: "select", options: ["Oui", "Non", "En cours"] },
        { id: 27, text: "Êtes-vous prêt à faire des sacrifices financiers par rapport à votre rémunération actuelle ?", type: "textarea" },
        { id: 28, text: "Quels seront vos besoins financiers dans les prochaines années (emprunts, scolarité des enfants...) ?", type: "textarea" }
      ]
    },
    {
      title: "FORMER UNE ÉQUIPE",
      color: "bg-purple-50 border-purple-200",
      icon: "🤝",
      questions: [
        { id: 29, text: "Pouvez-vous vous appuyer sur une équipe 'soudée', complémentaire, expérimentée ?", type: "textarea" },
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
        { id: 34, text: "Savez-vous à quels types de clients vous allez vous adresser ?", type: "textarea" },
        { id: 35, text: "Votre marché est-il segmenté ?", type: "select", options: ["Oui", "Non"] },
        { id: 36, text: "Avez-vous défini des cibles prioritaires ?", type: "textarea" },
        { id: 37, text: "Ferez-vous face à un réseau de prescripteurs actifs ?", type: "textarea" },
        { id: 38, text: "Quels sont les moyens commerciaux à mettre en œuvre pour atteindre votre objectif de chiffre d'affaires ?", type: "textarea" },
        { id: 39, text: "Votre processus de commercialisation est-il défini ?", type: "textarea" },
        { id: 40, text: "Comment allez-vous organiser votre force de vente ?", type: "textarea" },
        { id: 41, text: "Avez-vous prévu un système de prévision et de reporting ?", type: "select", options: ["Oui", "Non", "En cours"] },
        { id: 42, text: "Vous faut-il une fonction marketing ?", type: "select", options: ["Oui", "Non", "À déterminer"] },
        { id: 43, text: "Avez-vous chiffré votre budget de communication ?", type: "text" },
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
        { id: 49, text: "Avez-vous chiffré vos besoins de recherche-développement ?", type: "text" },
        { id: 50, text: "Votre outil de production de départ sera-t-il suffisamment 'calibré' ?", type: "textarea" },
        { id: 51, text: "Savez-vous arbitrer entre production interne et sous-traitance ?", type: "textarea" }
      ]
    },
    {
      title: "TROUVER DES FINANCEMENTS",
      color: "bg-yellow-50 border-yellow-200",
      icon: "💰",
      questions: [
        { id: 52, text: "Quel est votre besoin financier global ?", type: "text" },
        { id: 53, text: "Avec quelle répartition entre capitaux propres et endettement ?", type: "textarea" },
        { id: 54, text: "Votre business est-il générateur ou consommateur de cash ?", type: "select", options: ["Générateur", "Consommateur", "Équilibré"] },
        { id: 55, text: "Quels seront vos besoins de trésorerie en première année d'activité ?", type: "text" },
        { id: 56, text: "Quel sera le délai d'encaissement des clients ? Pourrez-vous obtenir des fournisseurs des délais de paiement ?", type: "textarea" },
        { id: 57, text: "Au bout de combien de mois vos flux de trésorerie seront-ils, de manière récurrente, positifs ?", type: "number" },
        { id: 58, text: "Quel est le montant prévisionnel de votre besoin de financement cumulé avant d'atteindre le point mort en trésorerie ?", type: "text" },
        { id: 59, text: "Quand pensez-vous atteindre le seuil de rentabilité ?", type: "text" },
        { id: 60, text: "La rentabilité dégagée à l'horizon de trois à cinq ans est-elle suffisante ?", type: "textarea" }
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
  };

  const getCompletionRate = () => {
    const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
    const answeredQuestions = Object.keys(formData).filter(key => formData[key] && formData[key].toString().trim() !== '').length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'business_plan_responses.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const renderQuestion = (question) => {
    const value = formData[question.id] || '';
    
    switch (question.type) {
      case 'textarea':
        return (
          <textarea
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            rows="3"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder="Votre réponse..."
          />
        );
      case 'select':
        return (
          <select
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder="Entrez un nombre"
          />
        );
      default:
        return (
          <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={value}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder="Votre réponse..."
          />
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          📋 Formulaire Business Plan
        </h1>
        <p className="text-gray-600 mb-6">
          Ce formulaire vous guide à travers les 60 questions essentielles pour élaborer un business plan solide et convaincant.
        </p>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progression</span>
            <span className="text-sm font-medium text-blue-600">{getCompletionRate()}% complété</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionRate()}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={16} />
            Exporter les réponses
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={`border rounded-lg ${section.color}`}>
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-opacity-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-lg font-semibold text-gray-800">
                  {section.title}
                </h2>
                <span className="text-sm text-gray-500">
                  ({section.questions.length} questions)
                </span>
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
                  {section.questions.map((question, questionIndex) => (
                    <div key={question.id} className="bg-white p-4 rounded-lg border border-gray-100">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <span className="text-blue-600 font-semibold">Q{question.id}.</span> {question.text}
                      </label>
                      {renderQuestion(question)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Récapitulatif
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sections.map((section, index) => {
            const sectionQuestions = section.questions.length;
            const answeredInSection = section.questions.filter(q => 
              formData[q.id] && formData[q.id].toString().trim() !== ''
            ).length;
            const sectionCompletion = Math.round((answeredInSection / sectionQuestions) * 100);
            
            return (
              <div key={index} className="bg-white p-3 rounded-lg border">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {section.icon} {section.title.split(' ')[0]}
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {sectionCompletion}%
                </div>
                <div className="text-xs text-gray-500">
                  {answeredInSection}/{sectionQuestions} réponses
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanForm;
