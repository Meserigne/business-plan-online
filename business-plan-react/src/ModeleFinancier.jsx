import React, { useState, useEffect } from 'react';

const ModeleFinancier = () => {
  const [currentCurrency, setCurrentCurrency] = useState('EUR');
  const [formData, setFormData] = useState({
    companyName: 'Ma Startup',
    sector: 'saas',
    startYear: 2024,
    initialCapital: 50000,
    revenue1: 150000,
    growthRate: 30,
    avgPrice: 150,
    customersYear1: 1000,
    recurrenceRate: 80,
    cogs: 30,
    commissions: 5,
    shipping: 3,
    salaries: 60000,
    rent: 18000,
    marketing: 15000,
    admin: 8000,
    insurance: 3000,
    otherFixed: 5000,
    funding1: 200000,
    funding3: 500000,
    loan: 100000,
    interestRate: 4,
    // Nouveaux champs pour les investissements
    fraisEtablissement: 15000,
    materielTransport: 25000,
    materielBureau: 8000,
    materielInformatique: 12000,
    imprévus: 10000,
    dureeAmortissement: 5
  });
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const currencyConfig = {
    EUR: { symbol: '€', name: 'Euro', rate: 1 },
    XOF: { symbol: 'FCFA', name: 'Franc CFA', rate: 655.957 },
    USD: { symbol: '$', name: 'Dollar US', rate: 0.92 }
  };

  const updateCurrency = (currency) => {
    setCurrentCurrency(currency);
  };

  const formatCurrency = (amount) => {
    const config = currencyConfig[currentCurrency];
    
    if (currentCurrency === 'XOF') {
      return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount) + ' FCFA';
    } else if (currentCurrency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    } else {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    }
  };

  const formatPercent = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateFinancials = () => {
    const {
      revenue1, growthRate, cogs, commissions, shipping,
      salaries, rent, marketing, admin, insurance, otherFixed,
      initialCapital, funding1, funding3, loan, interestRate,
      fraisEtablissement, materielTransport, materielBureau, 
      materielInformatique, imprévus, dureeAmortissement
    } = formData;

    const cogsRate = cogs / 100;
    const commissionsRate = commissions / 100;
    const shippingRate = shipping / 100;
    const growthRateDecimal = growthRate / 100;
    const interestRateDecimal = interestRate / 100;

    // Calcul des projections sur 5 ans
    const years = 5;
    const revenues = [];
    const expenses = [];
    const netIncome = [];
    const cashFlow = [];
    
    // Calcul des investissements totaux
    const totalInvestments = fraisEtablissement + materielTransport + materielBureau + materielInformatique + imprévus;
    const amortizableInvestments = fraisEtablissement + materielTransport + materielBureau + materielInformatique;
    const annualDepreciation = amortizableInvestments / dureeAmortissement;
    
    let cumulativeCash = initialCapital + funding1 + loan - totalInvestments;

    for (let i = 0; i < years; i++) {
      // Chiffre d'affaires
      revenues[i] = i === 0 ? revenue1 : revenues[i-1] * (1 + growthRateDecimal);

      // Charges variables
      const variableCosts = revenues[i] * (cogsRate + commissionsRate + shippingRate);

      // Charges fixes (avec augmentation de 3% par an)
      const fixedCosts = (salaries + rent + marketing + admin + insurance + otherFixed) * Math.pow(1.03, i);

      // Amortissements (seulement pendant la durée d'amortissement)
      const depreciation = i < dureeAmortissement ? annualDepreciation : 0;

      // Intérêts sur emprunt
      const interestExpense = loan * interestRateDecimal * Math.max(0, 5 - i) / 5;

      // Total des charges
      expenses[i] = variableCosts + fixedCosts + depreciation + interestExpense;

      // Résultat net
      netIncome[i] = revenues[i] - expenses[i];

      // Trésorerie
      const fundingYear = i === 2 ? funding3 : 0;
      cashFlow[i] = netIncome[i] + fundingYear;
      cumulativeCash += cashFlow[i];
    }

    // Calcul des KPIs
    const totalRevenue = revenues.reduce((a, b) => a + b, 0);
    const avgGrossMargin = revenues.map((r, i) => (r - expenses[i]) / r).reduce((a, b) => a + b, 0) / years * 100;
    const breakevenYear = netIncome.findIndex(n => n > 0) + 1;
    const totalInvestment = initialCapital + funding1 + funding3 + loan + totalInvestments;
    const totalReturn = netIncome.reduce((a, b) => a + b, 0);
    const roi = (totalReturn / totalInvestment) * 100;

    setResults({
      totalRevenue,
      avgGrossMargin,
      breakevenYear,
      roi,
      revenues,
      expenses,
      netIncome,
      cashFlow,
      years,
      totalInvestments,
      annualDepreciation
    });
    setShowResults(true);
  };

  const exportToExcel = () => {
    alert('Fonctionnalité d\'export Excel à implémenter avec une bibliothèque comme SheetJS');
  };

  const saveAsJSON = () => {
    const data = {
      parameters: formData,
      results: results,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `business-plan-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  useEffect(() => {
    if (results) {
      calculateFinancials();
    }
  }, [formData]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl mb-8 text-center shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Modèle Financier - Business Plan</h1>
        <p className="text-xl opacity-90">Outil complet de projection financière sur 5 ans (Multi-devises)</p>
      </div>

      {/* Section Paramètres Généraux */}
      <div className="bg-white rounded-xl p-8 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          📊 Paramètres Généraux
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom de l'entreprise</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ma Startup"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Secteur d'activité</label>
            <select
              value={formData.sector}
              onChange={(e) => handleInputChange('sector', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="saas">SaaS / Logiciel</option>
              <option value="ecommerce">E-commerce</option>
              <option value="service">Services</option>
              <option value="industrie">Industrie</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Année de début</label>
            <input
              type="number"
              value={formData.startYear}
              onChange={(e) => handleInputChange('startYear', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="2024"
              max="2030"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Devise</label>
            <select
              value={currentCurrency}
              onChange={(e) => updateCurrency(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="EUR">Euro (€)</option>
              <option value="XOF">Franc CFA (FCFA)</option>
              <option value="USD">Dollar US ($)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Capital initial ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.initialCapital}
              onChange={(e) => handleInputChange('initialCapital', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Section Chiffre d'Affaires */}
      <div className="bg-white rounded-xl p-8 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          💰 Projections de Chiffre d'Affaires
        </h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Comment projeter votre CA ?</h4>
          <p className="text-blue-700 text-sm">Basez-vous sur : prix moyen × nombre de clients × fréquence d'achat</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              CA Année 1 ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.revenue1}
              onChange={(e) => handleInputChange('revenue1', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Croissance annuelle (%)</label>
            <input
              type="number"
              value={formData.growthRate}
              onChange={(e) => handleInputChange('growthRate', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Prix moyen par client ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.avgPrice}
              onChange={(e) => handleInputChange('avgPrice', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de clients année 1</label>
            <input
              type="number"
              value={formData.customersYear1}
              onChange={(e) => handleInputChange('customersYear1', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Taux de récurrence (%)</label>
            <input
              type="number"
              value={formData.recurrenceRate}
              onChange={(e) => handleInputChange('recurrenceRate', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Section Charges */}
      <div className="bg-white rounded-xl p-8 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          📉 Structure des Charges
        </h2>
        
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Charges Variables (% du CA)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Coût des marchandises vendues (%)</label>
            <input
              type="number"
              value={formData.cogs}
              onChange={(e) => handleInputChange('cogs', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Commissions commerciales (%)</label>
            <input
              type="number"
              value={formData.commissions}
              onChange={(e) => handleInputChange('commissions', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Frais de livraison (%)</label>
            <input
              type="number"
              value={formData.shipping}
              onChange={(e) => handleInputChange('shipping', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="100"
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Charges Fixes Annuelles ({currencyConfig[currentCurrency].symbol})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Salaires et charges</label>
            <input
              type="number"
              value={formData.salaries}
              onChange={(e) => handleInputChange('salaries', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Loyer et charges locatives</label>
            <input
              type="number"
              value={formData.rent}
              onChange={(e) => handleInputChange('rent', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Marketing et publicité</label>
            <input
              type="number"
              value={formData.marketing}
              onChange={(e) => handleInputChange('marketing', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Frais administratifs</label>
            <input
              type="number"
              value={formData.admin}
              onChange={(e) => handleInputChange('admin', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Assurances</label>
            <input
              type="number"
              value={formData.insurance}
              onChange={(e) => handleInputChange('insurance', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Autres charges fixes</label>
            <input
              type="number"
              value={formData.otherFixed}
              onChange={(e) => handleInputChange('otherFixed', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Section Investissements */}
      <div className="bg-white rounded-xl p-8 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          🏭 Investissements et Amortissements
        </h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Pourquoi cette section est cruciale ?</h4>
          <p className="text-blue-700 text-sm">Les investissements déterminent vos besoins en capital, impactent votre rentabilité via les amortissements, et sont essentiels pour évaluer la viabilité de votre projet.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Frais d'établissement ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.fraisEtablissement}
              onChange={(e) => handleInputChange('fraisEtablissement', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Frais juridiques, immatriculation, marketing initial</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Matériel de transport ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.materielTransport}
              onChange={(e) => handleInputChange('materielTransport', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Véhicules, équipements de livraison</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Matériel de bureau ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.materielBureau}
              onChange={(e) => handleInputChange('materielBureau', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Mobilier, fournitures, équipements</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Matériel informatique ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.materielInformatique}
              onChange={(e) => handleInputChange('materielInformatique', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Ordinateurs, serveurs, logiciels</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imprévus ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.imprévus}
              onChange={(e) => handleInputChange('imprévus', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Marge de sécurité (10-15% du total)</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Durée d'amortissement (années)
            </label>
            <input
              type="number"
              value={formData.dureeAmortissement}
              onChange={(e) => handleInputChange('dureeAmortissement', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              max="10"
            />
            <p className="text-xs text-gray-500 mt-1">Période de dépréciation des actifs</p>
          </div>
        </div>
        
        {/* Résumé des investissements */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">📊 Résumé des investissements</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total investissements :</span>
              <div className="font-bold text-blue-600">
                {formatCurrency(
                  formData.fraisEtablissement + 
                  formData.materielTransport + 
                  formData.materielBureau + 
                  formData.materielInformatique + 
                  formData.imprévus
                )}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Amortissement annuel :</span>
              <div className="font-bold text-green-600">
                {formatCurrency(
                  (formData.fraisEtablissement + 
                   formData.materielTransport + 
                   formData.materielBureau + 
                   formData.materielInformatique) / formData.dureeAmortissement
                )}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Besoins en capital :</span>
              <div className="font-bold text-purple-600">
                {formatCurrency(
                  formData.initialCapital + 
                  formData.fraisEtablissement + 
                  formData.materielTransport + 
                  formData.materielBureau + 
                  formData.materielInformatique + 
                  formData.imprévus
                )}
              </div>
            </div>
            <div>
              <span className="text-gray-600">Ratio d'amortissement :</span>
              <div className="font-bold text-orange-600">
                {((formData.fraisEtablissement + 
                   formData.materielTransport + 
                   formData.materielBureau + 
                   formData.materielInformatique) / 
                   (formData.fraisEtablissement + 
                    formData.materielTransport + 
                    formData.materielBureau + 
                    formData.materielInformatique + 
                    formData.imprévus) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Financement */}
      <div className="bg-white rounded-xl p-8 mb-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          🏦 Plan de Financement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Levée de fonds Année 1 ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.funding1}
              onChange={(e) => handleInputChange('funding1', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Levée de fonds Année 3 ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.funding3}
              onChange={(e) => handleInputChange('funding3', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Emprunt bancaire ({currencyConfig[currentCurrency].symbol})
            </label>
            <input
              type="number"
              value={formData.loan}
              onChange={(e) => handleInputChange('loan', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Taux d'intérêt (%)</label>
            <input
              type="number"
              value={formData.interestRate}
              onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="20"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Bouton de calcul */}
      <div className="text-center mb-8">
        <button
          onClick={calculateFinancials}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          📊 Calculer les Projections Financières
        </button>
      </div>

      {/* Section Résultats */}
      {showResults && results && (
        <div className="space-y-8">
          {/* Indicateurs KPI */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              📈 Indicateurs Clés de Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl text-center hover:scale-105 transition-transform">
                <div className="text-sm opacity-90 mb-2">CA Total 5 ans</div>
                <div className="text-3xl font-bold">{formatCurrency(results.totalRevenue)}</div>
              </div>
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl text-center hover:scale-105 transition-transform">
                <div className="text-sm opacity-90 mb-2">Marge Brute Moyenne</div>
                <div className="text-3xl font-bold">{formatPercent(Math.abs(results.avgGrossMargin))}</div>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-xl text-center hover:scale-105 transition-transform">
                <div className="text-sm opacity-90 mb-2">Point Mort</div>
                <div className="text-3xl font-bold">
                  {results.breakevenYear > 0 ? `Année ${results.breakevenYear}` : 'Non atteint'}
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 rounded-xl text-center hover:scale-105 transition-transform">
                <div className="text-sm opacity-90 mb-2">ROI 5 ans</div>
                <div className="text-3xl font-bold">{formatPercent(results.roi)}</div>
              </div>
            </div>
          </div>

          {/* Compte de résultat */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              📊 Compte de Résultat Prévisionnel
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left border-b">Éléments</th>
                    {Array.from({length: results.years}, (_, i) => (
                      <th key={i} className="p-3 text-right border-b">Année {i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b font-semibold">Chiffre d'affaires</td>
                    {results.revenues.map((r, i) => (
                      <td key={i} className="p-3 text-right border-b">{formatCurrency(r)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border-b">Charges variables</td>
                    {results.revenues.map((r, i) => (
                      <td key={i} className="p-3 text-right border-b">
                        {formatCurrency(r * (formData.cogs + formData.commissions + formData.shipping) / 100)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border-b">Marge brute</td>
                    {results.revenues.map((r, i) => (
                      <td key={i} className="p-3 text-right border-b">
                        {formatCurrency(r * (1 - (formData.cogs + formData.commissions + formData.shipping) / 100))}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border-b">Charges fixes</td>
                    {Array.from({length: results.years}, (_, i) => (
                      <td key={i} className="p-3 text-right border-b">
                        {formatCurrency((formData.salaries + formData.rent + formData.marketing + formData.admin + formData.insurance + formData.otherFixed) * Math.pow(1.03, i))}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-blue-50 font-bold">
                    <td className="p-3 border-b">Résultat net</td>
                    {results.netIncome.map((n, i) => (
                      <td key={i} className={`p-3 text-right border-b ${n >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(n)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Plan de trésorerie */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              💸 Plan de Trésorerie
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-left border-b">Éléments</th>
                    {Array.from({length: results.years}, (_, i) => (
                      <th key={i} className="p-3 text-right border-b">Année {i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b">Résultat net</td>
                    {results.netIncome.map((n, i) => (
                      <td key={i} className="p-3 text-right border-b">{formatCurrency(n)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border-b">Levées de fonds</td>
                    {Array.from({length: results.years}, (_, i) => (
                      <td key={i} className="p-3 text-right border-b">
                        {formatCurrency(i === 0 ? formData.funding1 : i === 2 ? formData.funding3 : 0)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 border-b">Variation de trésorerie</td>
                    {results.cashFlow.map((c, i) => (
                      <td key={i} className="p-3 text-right border-b">{formatCurrency(c)}</td>
                    ))}
                  </tr>
                  <tr className="bg-green-50 font-bold">
                    <td className="p-3 border-b">Trésorerie cumulée</td>
                    {(() => {
                      let cumCash = formData.initialCapital + formData.funding1 + formData.loan;
                      return results.cashFlow.map((c, i) => {
                        cumCash += c;
                        return (
                          <td key={i} className={`p-3 text-right border-b ${cumCash >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(cumCash)}
                          </td>
                        );
                      });
                    })()}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Boutons d'export */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={exportToExcel}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              📊 Exporter Excel
            </button>
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🖨️ Imprimer
            </button>
            <button
              onClick={saveAsJSON}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              💾 Sauvegarder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeleFinancier; 