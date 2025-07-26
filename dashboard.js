// Dashboard JavaScript
class BusinessPlanDashboard {
    constructor() {
        this.businessPlanData = {};
        this.financialData = {};
        this.init();
    }

    init() {
        this.loadData();
        this.updateKPIs();
        this.createCharts();
        this.updateSummary();
        this.setupEventListeners();
    }

    loadData() {
        // Charger les données du business plan (60 questions)
        const savedBusinessPlan = localStorage.getItem('businessPlan60Questions');
        if (savedBusinessPlan) {
            this.businessPlanData = JSON.parse(savedBusinessPlan);
        }

        // Charger les données financières
        const savedFinancialData = localStorage.getItem('financialModelData');
        if (savedFinancialData) {
            this.financialData = JSON.parse(savedFinancialData);
        }
    }

    updateKPIs() {
        // Clients cibles
        const clientsTarget = this.businessPlanData[2] || this.businessPlanData[24] || 'Non défini';
        document.getElementById('kpi-clients').textContent = clientsTarget;

        // CA Prévisionnel (simulé si pas de données financières)
        let totalRevenue = 'Non calculé';
        if (this.financialData.totalRevenue) {
            totalRevenue = this.formatCurrency(this.financialData.totalRevenue);
        } else {
            // Estimation basique
            const estimatedRevenue = this.estimateRevenue();
            if (estimatedRevenue > 0) {
                totalRevenue = this.formatCurrency(estimatedRevenue);
            }
        }
        document.getElementById('kpi-revenue').textContent = totalRevenue;

        // Rentabilité
        let profitability = 'À calculer';
        if (this.financialData.avgGrossMarginRate) {
            profitability = `${this.financialData.avgGrossMarginRate.toFixed(1)}%`;
        } else {
            profitability = '25-35%'; // Estimation moyenne
        }
        document.getElementById('kpi-profitability').textContent = profitability;

        // Point mort
        let breakeven = 'À déterminer';
        if (this.financialData.breakevenYear) {
            breakeven = `Année ${this.financialData.breakevenYear}`;
        } else {
            breakeven = 'Année 2-3'; // Estimation
        }
        document.getElementById('kpi-breakeven').textContent = breakeven;
    }

    estimateRevenue() {
        const clients = parseInt(this.businessPlanData[2]) || 0;
        const avgPrice = 150; // Prix moyen estimé
        const years = 5;
        const growthRate = 0.25; // 25% de croissance annuelle
        
        let total = 0;
        for (let i = 0; i < years; i++) {
            total += clients * avgPrice * Math.pow(1 + growthRate, i);
        }
        return total;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    createCharts() {
        this.createRevenueChart();
        this.createCostsChart();
    }

    createRevenueChart() {
        const canvas = document.getElementById('revenueChart');
        const ctx = canvas.getContext('2d');
        
        // Données simulées ou réelles
        const years = ['Année 1', 'Année 2', 'Année 3', 'Année 4', 'Année 5'];
        const revenues = this.financialData.revenues || [150000, 200000, 280000, 380000, 500000];
        
        // Nettoyer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Configuration du graphique
        const padding = 60;
        const chartWidth = canvas.width - 2 * padding;
        const chartHeight = canvas.height - 2 * padding;
        
        const maxRevenue = Math.max(...revenues);
        const minRevenue = 0;
        
        // Dessiner les axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        
        // Axe Y
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();
        
        // Axe X
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Dessiner la courbe
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        revenues.forEach((revenue, index) => {
            const x = padding + (index * chartWidth) / (revenues.length - 1);
            const y = canvas.height - padding - ((revenue - minRevenue) / (maxRevenue - minRevenue)) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            
            // Points
            ctx.fillStyle = '#3498db';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#666';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        
        years.forEach((year, index) => {
            const x = padding + (index * chartWidth) / (revenues.length - 1);
            ctx.fillText(year, x, canvas.height - padding + 20);
        });
        
        // Valeurs
        revenues.forEach((revenue, index) => {
            const x = padding + (index * chartWidth) / (revenues.length - 1);
            const y = canvas.height - padding - ((revenue - minRevenue) / (maxRevenue - minRevenue)) * chartHeight;
            ctx.fillText(this.formatCurrency(revenue), x, y - 10);
        });
    }

    createCostsChart() {
        const canvas = document.getElementById('costsChart');
        const ctx = canvas.getContext('2d');
        
        // Données des coûts
        const costs = [
            { label: 'Salaires', value: 40, color: '#3498db' },
            { label: 'Marketing', value: 25, color: '#e74c3c' },
            { label: 'Opérations', value: 20, color: '#f39c12' },
            { label: 'Autres', value: 15, color: '#27ae60' }
        ];
        
        // Nettoyer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 40;
        
        let currentAngle = -Math.PI / 2;
        
        costs.forEach(cost => {
            const sliceAngle = (cost.value / 100) * 2 * Math.PI;
            
            // Dessiner la tranche
            ctx.fillStyle = cost.color;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            
            // Label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(`${cost.value}%`, labelX, labelY);
            
            currentAngle += sliceAngle;
        });
        
        // Légende
        costs.forEach((cost, index) => {
            const legendY = 20 + index * 25;
            
            // Carré de couleur
            ctx.fillStyle = cost.color;
            ctx.fillRect(canvas.width - 120, legendY - 8, 12, 12);
            
            // Texte
            ctx.fillStyle = '#333';
            ctx.font = '12px Inter';
            ctx.textAlign = 'left';
            ctx.fillText(cost.label, canvas.width - 100, legendY);
        });
    }

    updateSummary() {
        // Analyse du marché
        const marketAnalysis = document.getElementById('market-analysis');
        if (this.businessPlanData[1] || this.businessPlanData[3]) {
            const marketSize = this.businessPlanData[1] || 'Non spécifié';
            const marketSituation = this.businessPlanData[3] || 'Non spécifié';
            marketAnalysis.innerHTML = `
                <p><strong>Taille du marché:</strong> ${marketSize}</p>
                <p><strong>Situation:</strong> ${marketSituation}</p>
                <p><a href="business-plan-60-questions.html">Compléter l'analyse →</a></p>
            `;
        }

        // Projections financières
        const financialProjections = document.getElementById('financial-projections');
        if (this.financialData.totalRevenue) {
            financialProjections.innerHTML = `
                <p><strong>CA 5 ans:</strong> ${this.formatCurrency(this.financialData.totalRevenue)}</p>
                <p><strong>ROI:</strong> ${this.financialData.roi?.toFixed(1)}%</p>
                <p><a href="modele-financier.html">Voir les détails →</a></p>
            `;
        }

        // Avantages concurrentiels
        const competitiveAdvantages = document.getElementById('competitive-advantages');
        if (this.businessPlanData[13]) {
            competitiveAdvantages.innerHTML = `
                <p>${this.businessPlanData[13]}</p>
                <p><a href="business-plan-60-questions.html">Développer →</a></p>
            `;
        }

        // Stratégie de croissance
        const growthStrategy = document.getElementById('growth-strategy');
        if (this.businessPlanData[38]) {
            growthStrategy.innerHTML = `
                <p>${this.businessPlanData[38]}</p>
                <p><a href="business-plan-60-questions.html">Détailler →</a></p>
            `;
        }
    }

    setupEventListeners() {
        // Actualiser les données toutes les 30 secondes
        setInterval(() => {
            this.loadData();
            this.updateKPIs();
            this.updateSummary();
        }, 30000);
    }
}

// Fonctions globales
function generateReport() {
    const dashboard = new BusinessPlanDashboard();
    
    // Créer un rapport PDF (simulation)
    const reportContent = `
        RAPPORT BUSINESS PLAN
        =====================
        
        KPIs Principaux:
        - Clients cibles: ${document.getElementById('kpi-clients').textContent}
        - CA prévisionnel: ${document.getElementById('kpi-revenue').textContent}
        - Rentabilité: ${document.getElementById('kpi-profitability').textContent}
        - Point mort: ${document.getElementById('kpi-breakeven').textContent}
        
        Analyse générée le: ${new Date().toLocaleDateString('fr-FR')}
    `;
    
    // Créer un blob et télécharger
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `business-plan-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('Rapport généré et téléchargé !');
}

function exportData() {
    const dashboard = new BusinessPlanDashboard();
    
    const exportData = {
        businessPlan: dashboard.businessPlanData,
        financial: dashboard.financialData,
        kpis: {
            clients: document.getElementById('kpi-clients').textContent,
            revenue: document.getElementById('kpi-revenue').textContent,
            profitability: document.getElementById('kpi-profitability').textContent,
            breakeven: document.getElementById('kpi-breakeven').textContent
        },
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `business-plan-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('Données exportées avec succès !');
}

// Initialiser le dashboard au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    new BusinessPlanDashboard();
});

// Actualiser le dashboard quand on revient sur la page
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        new BusinessPlanDashboard();
    }
});
