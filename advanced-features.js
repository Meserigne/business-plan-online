// Module des fonctionnalités avancées
class AdvancedFeaturesManager {
    constructor() {
        this.templates = this.initializeTemplates();
        this.aiAssistant = new AIAssistant();
        this.swotAnalysis = new SWOTAnalysis();
        this.init();
    }

    init() {
        this.createAdvancedUI();
        this.setupEventListeners();
    }

    // Templates sectoriels
    initializeTemplates() {
        return {
            'tech': {
                name: 'Technologie & Startup',
                icon: 'fas fa-laptop-code',
                description: 'Pour startups tech, SaaS, applications mobiles',
                questions: {
                    0: 'Plateforme technologique innovante',
                    1: 'Marché global du numérique (plusieurs milliards)',
                    2: 'Entreprises et particuliers early adopters',
                    4: 'Solution logicielle révolutionnaire',
                    11: 'GAFAM, startups concurrentes',
                    13: 'Innovation technologique, agilité, expertise',
                    25: 'Marketing digital, growth hacking, partenariats',
                    38: 'Expansion internationale, nouvelles fonctionnalités'
                },
                kpis: {
                    revenue: [100000, 300000, 800000, 2000000, 5000000],
                    costs: [80000, 200000, 400000, 800000, 1500000],
                    margins: [20, 33, 50, 60, 70]
                }
            },
            'retail': {
                name: 'Commerce & Retail',
                icon: 'fas fa-store',
                description: 'Pour magasins, e-commerce, distribution',
                questions: {
                    0: 'Boutique de commerce spécialisée',
                    1: 'Marché local et régional ciblé',
                    2: 'Consommateurs locaux et en ligne',
                    4: 'Produits de qualité à prix compétitifs',
                    11: 'Grandes enseignes, concurrents locaux',
                    13: 'Proximité client, service personnalisé',
                    25: 'Marketing local, réseaux sociaux, fidélisation',
                    38: 'Expansion géographique, diversification produits'
                },
                kpis: {
                    revenue: [150000, 250000, 400000, 600000, 900000],
                    costs: [120000, 180000, 280000, 420000, 630000],
                    margins: [20, 28, 30, 30, 30]
                }
            },
            'services': {
                name: 'Services & Consulting',
                icon: 'fas fa-handshake',
                description: 'Pour conseil, services B2B, expertise',
                questions: {
                    0: 'Cabinet de conseil spécialisé',
                    1: 'Marché B2B des services professionnels',
                    2: 'Entreprises PME et grandes entreprises',
                    4: 'Expertise et accompagnement sur-mesure',
                    11: 'Cabinets établis, consultants indépendants',
                    13: 'Expertise reconnue, réseau professionnel',
                    25: 'Réseau professionnel, recommandations, LinkedIn',
                    38: 'Recrutement experts, nouvelles spécialisations'
                },
                kpis: {
                    revenue: [200000, 350000, 500000, 750000, 1200000],
                    costs: [140000, 210000, 300000, 450000, 720000],
                    margins: [30, 40, 40, 40, 40]
                }
            },
            'restaurant': {
                name: 'Restauration & Food',
                icon: 'fas fa-utensils',
                description: 'Pour restaurants, food trucks, traiteurs',
                questions: {
                    0: 'Restaurant gastronomique local',
                    1: 'Marché local de la restauration',
                    2: 'Clientèle locale, touristes, professionnels',
                    4: 'Cuisine de qualité, expérience unique',
                    11: 'Restaurants locaux, chaînes nationales',
                    13: 'Qualité culinaire, ambiance, service',
                    25: 'Bouche-à-oreille, réseaux sociaux, événements',
                    38: 'Livraison, événementiel, franchise'
                },
                kpis: {
                    revenue: [300000, 450000, 600000, 750000, 900000],
                    costs: [240000, 315000, 420000, 525000, 630000],
                    margins: [20, 30, 30, 30, 30]
                }
            }
        };
    }

    // Créer l'interface des fonctionnalités avancées
    createAdvancedUI() {
        const advancedSection = document.createElement('div');
        advancedSection.className = 'advanced-features-section';
        advancedSection.innerHTML = `
            <div class="advanced-features-container">
                <h2><i class="fas fa-magic"></i> Fonctionnalités Avancées</h2>
                
                <!-- Templates sectoriels -->
                <div class="feature-card templates-card">
                    <h3><i class="fas fa-industry"></i> Templates Sectoriels</h3>
                    <p>Démarrez avec un template adapté à votre secteur d'activité</p>
                    <div class="templates-grid">
                        ${Object.entries(this.templates).map(([key, template]) => `
                            <div class="template-item" data-template="${key}">
                                <i class="${template.icon}"></i>
                                <h4>${template.name}</h4>
                                <p>${template.description}</p>
                                <button class="btn-apply-template">Appliquer</button>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Assistant IA -->
                <div class="feature-card ai-assistant-card">
                    <h3><i class="fas fa-robot"></i> Assistant IA</h3>
                    <p>Obtenez des suggestions intelligentes pour améliorer votre business plan</p>
                    <div class="ai-chat-container">
                        <div class="ai-messages" id="aiMessages"></div>
                        <div class="ai-input-container">
                            <input type="text" id="aiInput" placeholder="Posez une question sur votre business plan...">
                            <button id="aiSendBtn"><i class="fas fa-paper-plane"></i></button>
                        </div>
                    </div>
                </div>

                <!-- Analyse SWOT -->
                <div class="feature-card swot-card">
                    <h3><i class="fas fa-chart-pie"></i> Analyse SWOT Interactive</h3>
                    <p>Analysez les Forces, Faiblesses, Opportunités et Menaces</p>
                    <div class="swot-matrix">
                        <div class="swot-quadrant swot-strengths">
                            <h4><i class="fas fa-plus-circle"></i> Forces</h4>
                            <textarea placeholder="Listez vos points forts..."></textarea>
                        </div>
                        <div class="swot-quadrant swot-weaknesses">
                            <h4><i class="fas fa-minus-circle"></i> Faiblesses</h4>
                            <textarea placeholder="Identifiez vos points faibles..."></textarea>
                        </div>
                        <div class="swot-quadrant swot-opportunities">
                            <h4><i class="fas fa-arrow-up"></i> Opportunités</h4>
                            <textarea placeholder="Quelles opportunités s'offrent à vous..."></textarea>
                        </div>
                        <div class="swot-quadrant swot-threats">
                            <h4><i class="fas fa-exclamation-triangle"></i> Menaces</h4>
                            <textarea placeholder="Quels sont les risques externes..."></textarea>
                        </div>
                    </div>
                    <button class="btn-generate-swot-report">Générer Rapport SWOT</button>
                </div>

                <!-- Simulation de scénarios -->
                <div class="feature-card scenarios-card">
                    <h3><i class="fas fa-chart-line"></i> Simulation de Scénarios</h3>
                    <p>Testez différents scénarios pour votre business plan</p>
                    <div class="scenarios-controls">
                        <div class="scenario-slider">
                            <label>Croissance du marché: <span id="marketGrowthValue">5%</span></label>
                            <input type="range" id="marketGrowth" min="0" max="20" value="5" step="1">
                        </div>
                        <div class="scenario-slider">
                            <label>Taux de conversion: <span id="conversionRateValue">3%</span></label>
                            <input type="range" id="conversionRate" min="1" max="10" value="3" step="0.5">
                        </div>
                        <div class="scenario-slider">
                            <label>Coûts opérationnels: <span id="operationalCostsValue">70%</span></label>
                            <input type="range" id="operationalCosts" min="50" max="90" value="70" step="5">
                        </div>
                    </div>
                    <div class="scenarios-results">
                        <canvas id="scenarioChart" width="400" height="200"></canvas>
                    </div>
                    <button class="btn-save-scenario">Sauvegarder Scénario</button>
                </div>
            </div>
        `;

        // Insérer après le dashboard principal
        const dashboardContainer = document.querySelector('.dashboard-container');
        if (dashboardContainer) {
            dashboardContainer.appendChild(advancedSection);
        }
    }

    setupEventListeners() {
        // Templates
        document.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', () => {
                const templateKey = item.dataset.template;
                this.applyTemplate(templateKey);
            });
        });

        // Assistant IA
        const aiSendBtn = document.getElementById('aiSendBtn');
        const aiInput = document.getElementById('aiInput');
        
        if (aiSendBtn && aiInput) {
            aiSendBtn.addEventListener('click', () => this.sendAIMessage());
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendAIMessage();
            });
        }

        // SWOT
        document.querySelectorAll('.swot-quadrant textarea').forEach(textarea => {
            textarea.addEventListener('input', () => this.saveSWOTData());
        });

        const swotBtn = document.querySelector('.btn-generate-swot-report');
        if (swotBtn) {
            swotBtn.addEventListener('click', () => this.generateSWOTReport());
        }

        // Scénarios
        document.querySelectorAll('.scenario-slider input').forEach(slider => {
            slider.addEventListener('input', () => this.updateScenario());
        });

        const saveScenarioBtn = document.querySelector('.btn-save-scenario');
        if (saveScenarioBtn) {
            saveScenarioBtn.addEventListener('click', () => this.saveScenario());
        }
    }

    // Appliquer un template sectoriel
    applyTemplate(templateKey) {
        const template = this.templates[templateKey];
        if (!template) return;

        // Charger les données existantes
        let businessPlanData = {};
        const saved = localStorage.getItem('businessPlan60Questions');
        if (saved) {
            businessPlanData = JSON.parse(saved);
        }

        // Appliquer le template
        Object.entries(template.questions).forEach(([questionIndex, answer]) => {
            if (!businessPlanData[questionIndex] || businessPlanData[questionIndex].trim() === '') {
                businessPlanData[questionIndex] = answer;
            }
        });

        // Sauvegarder
        localStorage.setItem('businessPlan60Questions', JSON.stringify(businessPlanData));
        
        // Appliquer les KPIs financiers
        localStorage.setItem('templateFinancialData', JSON.stringify(template.kpis));

        this.showNotification(`Template "${template.name}" appliqué avec succès !`, 'success');
        
        // Rafraîchir le dashboard
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            setTimeout(() => window.location.reload(), 1000);
        }
    }

    // Envoyer un message à l'assistant IA
    sendAIMessage() {
        const input = document.getElementById('aiInput');
        const messages = document.getElementById('aiMessages');
        
        if (!input.value.trim()) return;

        const userMessage = input.value.trim();
        input.value = '';

        // Ajouter le message utilisateur
        this.addAIMessage(userMessage, 'user');

        // Simuler une réponse IA (en attendant une vraie API)
        setTimeout(() => {
            const aiResponse = this.generateAIResponse(userMessage);
            this.addAIMessage(aiResponse, 'ai');
        }, 1000);
    }

    addAIMessage(message, sender) {
        const messages = document.getElementById('aiMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-message-${sender}`;
        messageDiv.innerHTML = `
            <div class="ai-message-content">
                <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
                <span>${message}</span>
            </div>
        `;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // Générer une réponse IA simulée
    generateAIResponse(userMessage) {
        const responses = {
            'marché': 'Pour analyser votre marché, je recommande de définir clairement votre segment cible, d\'étudier la concurrence et d\'estimer la taille du marché addressable (TAM, SAM, SOM).',
            'financement': 'Pour le financement, considérez plusieurs options : fonds propres, prêts bancaires, subventions, business angels, ou crowdfunding selon votre secteur et vos besoins.',
            'concurrence': 'Analysez vos concurrents directs et indirects. Identifiez leurs forces/faiblesses et positionnez votre avantage concurrentiel unique.',
            'prix': 'Votre stratégie de prix doit considérer : coûts de revient, valeur perçue par le client, prix de la concurrence, et objectifs de marge.',
            'équipe': 'Une équipe solide est cruciale. Présentez les compétences clés, l\'expérience pertinente et les rôles de chaque membre fondateur.'
        };

        // Recherche de mots-clés
        const lowerMessage = userMessage.toLowerCase();
        for (const [keyword, response] of Object.entries(responses)) {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }

        // Réponse générique
        return 'C\'est une excellente question ! Pour vous donner une réponse plus précise, pourriez-vous me donner plus de contexte sur votre secteur d\'activité et vos objectifs spécifiques ?';
    }

    // Sauvegarder les données SWOT
    saveSWOTData() {
        const swotData = {
            strengths: document.querySelector('.swot-strengths textarea').value,
            weaknesses: document.querySelector('.swot-weaknesses textarea').value,
            opportunities: document.querySelector('.swot-opportunities textarea').value,
            threats: document.querySelector('.swot-threats textarea').value,
            lastUpdated: new Date().toISOString()
        };

        localStorage.setItem('swotAnalysis', JSON.stringify(swotData));
    }

    // Générer un rapport SWOT
    generateSWOTReport() {
        const swotData = JSON.parse(localStorage.getItem('swotAnalysis') || '{}');
        
        if (!swotData.strengths && !swotData.weaknesses && !swotData.opportunities && !swotData.threats) {
            this.showNotification('Veuillez remplir au moins une section SWOT', 'error');
            return;
        }

        // Créer un rapport SWOT en PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text('ANALYSE SWOT', 105, 30, { align: 'center' });
        
        let yPos = 50;
        const sections = [
            { title: 'FORCES', data: swotData.strengths, color: [39, 174, 96] },
            { title: 'FAIBLESSES', data: swotData.weaknesses, color: [231, 76, 60] },
            { title: 'OPPORTUNITÉS', data: swotData.opportunities, color: [52, 152, 219] },
            { title: 'MENACES', data: swotData.threats, color: [241, 196, 15] }
        ];

        sections.forEach(section => {
            if (section.data && section.data.trim()) {
                doc.setTextColor(...section.color);
                doc.setFontSize(14);
                doc.text(section.title, 20, yPos);
                
                doc.setTextColor(0, 0, 0);
                doc.setFontSize(11);
                const splitText = doc.splitTextToSize(section.data, 170);
                doc.text(splitText, 20, yPos + 10);
                
                yPos += 10 + (splitText.length * 6) + 15;
            }
        });

        doc.save('analyse-swot.pdf');
        this.showNotification('Rapport SWOT généré avec succès !', 'success');
    }

    // Mettre à jour la simulation de scénario
    updateScenario() {
        const marketGrowth = document.getElementById('marketGrowth').value;
        const conversionRate = document.getElementById('conversionRate').value;
        const operationalCosts = document.getElementById('operationalCosts').value;

        document.getElementById('marketGrowthValue').textContent = marketGrowth + '%';
        document.getElementById('conversionRateValue').textContent = conversionRate + '%';
        document.getElementById('operationalCostsValue').textContent = operationalCosts + '%';

        // Recalculer et afficher le graphique
        this.updateScenarioChart(marketGrowth, conversionRate, operationalCosts);
    }

    updateScenarioChart(marketGrowth, conversionRate, operationalCosts) {
        const canvas = document.getElementById('scenarioChart');
        const ctx = canvas.getContext('2d');
        
        // Calculer les projections avec les nouveaux paramètres
        const baseRevenue = 100000;
        const years = 5;
        const revenues = [];
        
        for (let i = 0; i < years; i++) {
            const yearRevenue = baseRevenue * Math.pow(1 + marketGrowth/100, i) * (conversionRate/100) * 10;
            revenues.push(yearRevenue);
        }

        // Dessiner le graphique
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuration
        const padding = 40;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;
        const maxRevenue = Math.max(...revenues);

        // Axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Courbe
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.beginPath();

        revenues.forEach((revenue, index) => {
            const x = padding + (index * chartWidth) / (revenues.length - 1);
            const y = canvas.height - padding - ((revenue / maxRevenue) * chartHeight);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();
    }

    // Sauvegarder un scénario
    saveScenario() {
        const scenarioData = {
            marketGrowth: document.getElementById('marketGrowth').value,
            conversionRate: document.getElementById('conversionRate').value,
            operationalCosts: document.getElementById('operationalCosts').value,
            timestamp: new Date().toISOString()
        };

        let savedScenarios = JSON.parse(localStorage.getItem('savedScenarios') || '[]');
        savedScenarios.push(scenarioData);
        localStorage.setItem('savedScenarios', JSON.stringify(savedScenarios));

        this.showNotification('Scénario sauvegardé avec succès !', 'success');
    }

    // Afficher une notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }
}

// Classes auxiliaires
class AIAssistant {
    constructor() {
        this.context = {};
    }
}

class SWOTAnalysis {
    constructor() {
        this.data = {};
    }
}

// Initialiser les fonctionnalités avancées
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que le dashboard soit chargé
    setTimeout(() => {
        window.advancedFeatures = new AdvancedFeaturesManager();
    }, 1000);
});
