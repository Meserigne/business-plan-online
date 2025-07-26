// Configuration des devises
const currencyConfig = {
    EUR: { symbol: '€', name: 'Euro', rate: 1 },
    XOF: { symbol: 'FCFA', name: 'Franc CFA', rate: 655.957 },
    USD: { symbol: '$', name: 'Dollar US', rate: 0.92 }
};

let currentCurrency = 'EUR';

function updateCurrency() {
    const currency = document.getElementById('currency').value;
    currentCurrency = currency;
    
    // Mettre à jour tous les symboles de devise
    document.querySelectorAll('.currency-symbol').forEach(elem => {
        elem.textContent = `(${currencyConfig[currency].symbol})`;
    });
}

function formatCurrency(amount) {
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
}

function formatPercent(value) {
    return `${value.toFixed(1)}%`;
}

function calculateIRR(cashFlows) {
    // Calcul du TRI (Taux de Rentabilité Interne) par méthode de Newton-Raphson
    let rate = 0.1; // Taux initial de 10%
    const maxIterations = 100;
    const tolerance = 0.0001;
    
    for (let i = 0; i < maxIterations; i++) {
        let npv = 0;
        let dnpv = 0;
        
        for (let j = 0; j < cashFlows.length; j++) {
            npv += cashFlows[j] / Math.pow(1 + rate, j);
            dnpv -= j * cashFlows[j] / Math.pow(1 + rate, j + 1);
        }
        
        const newRate = rate - npv / dnpv;
        
        if (Math.abs(newRate - rate) < tolerance) {
            return newRate;
        }
        
        rate = newRate;
    }
    
    return rate;
}

function calculateFinancials() {
    // Récupération des valeurs
    const revenue1 = parseFloat(document.getElementById('revenue1').value) || 0;
    const growthRate = parseFloat(document.getElementById('growthRate').value) / 100 || 0;
    const cogsRate = parseFloat(document.getElementById('cogs').value) / 100 || 0;
    const commissionsRate = parseFloat(document.getElementById('commissions').value) / 100 || 0;
    const shippingRate = parseFloat(document.getElementById('shipping').value) / 100 || 0;
    
    const salaries = parseFloat(document.getElementById('salaries').value) || 0;
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const marketing = parseFloat(document.getElementById('marketing').value) || 0;
    const admin = parseFloat(document.getElementById('admin').value) || 0;
    const insurance = parseFloat(document.getElementById('insurance').value) || 0;
    const otherFixed = parseFloat(document.getElementById('otherFixed').value) || 0;
    
    const initialCapital = parseFloat(document.getElementById('initialCapital').value) || 0;
    const funding1 = parseFloat(document.getElementById('funding1').value) || 0;
    const funding3 = parseFloat(document.getElementById('funding3').value) || 0;
    const loan = parseFloat(document.getElementById('loan').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 || 0;
    
    const investment1 = parseFloat(document.getElementById('investment1').value) || 0;
    const investment2 = parseFloat(document.getElementById('investment2').value) || 0;
    const investment3 = parseFloat(document.getElementById('investment3').value) || 0;
    const depreciationYears = parseFloat(document.getElementById('depreciationYears').value) || 5;
    const discountRate = parseFloat(document.getElementById('discountRate').value) / 100 || 0;
    const taxRate = parseFloat(document.getElementById('taxRate').value) / 100 || 0;
    
    // BFR parameters
    const clientPaymentDays = parseFloat(document.getElementById('clientPaymentDays').value) || 0;
    const stockDays = parseFloat(document.getElementById('stockDays').value) || 0;
    const supplierPaymentDays = parseFloat(document.getElementById('supplierPaymentDays').value) || 0;
    const bfrRate = parseFloat(document.getElementById('bfrRate').value) / 100 || 0;
    
    // Calcul des projections sur 5 ans
    const years = 5;
    const revenues = [];
    const variableCosts = [];
    const grossMargin = [];
    const fixedCosts = [];
    const ebitda = [];
    const depreciation = [];
    const ebit = [];
    const interestExpenses = [];
    const ebt = [];
    const taxes = [];
    const netIncome = [];
    const cashFlow = [];
    const investments = [investment1, investment2, investment3, 0, 0];
    const npvFactors = [];
    const discountedCashFlow = [];
    const bfr = [];
    const bfrVariation = [];
    
    // Calcul des amortissements cumulés
    const depreciationSchedule = Array(years).fill(0);
    for (let i = 0; i < years; i++) {
        for (let j = 0; j <= i && j < 3; j++) {
            if (i - j < depreciationYears) {
                depreciationSchedule[i] += investments[j] / depreciationYears;
            }
        }
    }
    
    let cumulativeCash = initialCapital + funding1 + loan;
    let previousBfr = 0;
    
    for (let i = 0; i < years; i++) {
        // Chiffre d'affaires
        revenues[i] = i === 0 ? revenue1 : revenues[i-1] * (1 + growthRate);
        
        // Charges variables
        variableCosts[i] = revenues[i] * (cogsRate + commissionsRate + shippingRate);
        
        // Marge brute
        grossMargin[i] = revenues[i] - variableCosts[i];
        
        // Charges fixes (avec augmentation de 3% par an)
        fixedCosts[i] = (salaries + rent + marketing + admin + insurance + otherFixed) * Math.pow(1.03, i);
        
        // EBITDA (EBE - Excédent Brut d'Exploitation)
        ebitda[i] = grossMargin[i] - fixedCosts[i];
        
        // Amortissements
        depreciation[i] = depreciationSchedule[i];
        
        // EBIT (Résultat d'exploitation)
        ebit[i] = ebitda[i] - depreciation[i];
        
        // Intérêts
        interestExpenses[i] = loan * interestRate * Math.max(0, 5 - i) / 5;
        
        // EBT (Résultat avant impôt)
        ebt[i] = ebit[i] - interestExpenses[i];
        
        // Impôts
        taxes[i] = Math.max(0, ebt[i] * taxRate);
        
        // Résultat net
        netIncome[i] = ebt[i] - taxes[i];
        
        // Calcul du BFR
        const caAffectedByBfr = revenues[i] * bfrRate;
        const clientCreances = (caAffectedByBfr * clientPaymentDays) / 365;
        const stocks = (caAffectedByBfr * stockDays) / 365;
        const supplierDettes = (caAffectedByBfr * (cogsRate + commissionsRate + shippingRate) * supplierPaymentDays) / 365;
        bfr[i] = clientCreances + stocks - supplierDettes;
        bfrVariation[i] = i === 0 ? bfr[i] : bfr[i] - bfr[i-1];
        
        // CAFG (Capacité d'autofinancement globale)
        const cafg = netIncome[i] + depreciation[i];
        
        // Cash Flow
        const fundingYear = i === 2 ? funding3 : 0;
        cashFlow[i] = cafg - investments[i] - bfrVariation[i] + fundingYear;
        
        // Facteur d'actualisation et flux actualisés
        npvFactors[i] = 1 / Math.pow(1 + discountRate, i + 1);
        discountedCashFlow[i] = cashFlow[i] * npvFactors[i];
        
        cumulativeCash += cashFlow[i];
    }
    
    // Calcul des KPIs
    const totalRevenue = revenues.reduce((a, b) => a + b, 0);
    const avgGrossMarginRate = grossMargin.map((m, i) => m / revenues[i]).reduce((a, b) => a + b, 0) / years * 100;
    const avgEbitdaMargin = ebitda.map((e, i) => e / revenues[i]).reduce((a, b) => a + b, 0) / years * 100;
    const breakevenYear = netIncome.findIndex(n => n > 0) + 1;
    const totalInvestment = initialCapital + funding1 + funding3 + loan + investments.reduce((a, b) => a + b, 0);
    const totalReturn = netIncome.reduce((a, b) => a + b, 0);
    const roi = (totalReturn / totalInvestment) * 100;
    const npv = discountedCashFlow.reduce((a, b) => a + b, 0);
    
    // Calcul du TRI (IRR - Internal Rate of Return)
    const irr = calculateIRR([-initialCapital, ...cashFlow]);
    
    // Affichage des KPIs
    document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);
    document.getElementById('avgGrossMargin').textContent = formatPercent(avgGrossMarginRate);
    document.getElementById('breakeven').textContent = breakevenYear > 0 ? `Année ${breakevenYear}` : 'Non atteint';
    document.getElementById('roi').textContent = formatPercent(roi);
    document.getElementById('npv').textContent = formatCurrency(npv);
    document.getElementById('irr').textContent = formatPercent(irr * 100);
    
    // Génération du compte d'exploitation prévisionnel
    const exploitationTable = document.getElementById('exploitationStatement');
    exploitationTable.innerHTML = `
        <thead>
            <tr>
                <th>Éléments</th>
                ${Array.from({length: years}, (_, i) => `<th>Année ${i + 1}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Chiffre d'affaires</strong></td>
                ${revenues.map(r => `<td><strong>${formatCurrency(r)}</strong></td>`).join('')}
            </tr>
            <tr>
                <td>Charges variables</td>
                ${variableCosts.map(c => `<td>${formatCurrency(c)}</td>`).join('')}
            </tr>
            <tr class="total-row">
                <td><strong>Marge Brute</strong></td>
                ${grossMargin.map(m => `<td><strong>${formatCurrency(m)}</strong></td>`).join('')}
            </tr>
            <tr>
                <td><em>Marge/CA (%)</em></td>
                ${grossMargin.map((m, i) => `<td><em>${formatPercent(m/revenues[i]*100)}</em></td>`).join('')}
            </tr>
            <tr>
                <td>Autres charges d'exploitation</td>
                ${fixedCosts.map(c => `<td>${formatCurrency(c)}</td>`).join('')}
            </tr>
            <tr class="total-row">
                <td><strong>EBE (Excédent Brut d'Exploitation)</strong></td>
                ${ebitda.map(e => `<td class="${e >= 0 ? 'positive' : 'negative'}"><strong>${formatCurrency(e)}</strong></td>`).join('')}
            </tr>
            <tr>
                <td><em>EBE/CA (%)</em></td>
                ${ebitda.map((e, i) => `<td><em>${formatPercent(e/revenues[i]*100)}</em></td>`).join('')}
            </tr>
            <tr>
                <td>Amortissements</td>
                ${depreciation.map(d => `<td>${formatCurrency(d)}</td>`).join('')}
            </tr>
            <tr class="total-row">
                <td><strong>Résultat d'Exploitation (EBIT)</strong></td>
                ${ebit.map(e => `<td class="${e >= 0 ? 'positive' : 'negative'}"><strong>${formatCurrency(e)}</strong></td>`).join('')}
            </tr>
            <tr>
                <td><em>EBIT/CA (%)</em></td>
                ${ebit.map((e, i) => `<td><em>${formatPercent(e/revenues[i]*100)}</em></td>`).join('')}
            </tr>
            <tr>
                <td>Charges d'intérêt</td>
                ${interestExpenses.map(i => `<td>${formatCurrency(i)}</td>`).join('')}
            </tr>
            <tr>
                <td>Résultat avant IS</td>
                ${ebt.map(e => `<td class="${e >= 0 ? 'positive' : 'negative'}">${formatCurrency(e)}</td>`).join('')}
            </tr>
            <tr>
                <td>IS (Impôt sur les Sociétés) ${(taxRate*100).toFixed(0)}%</td>
                ${taxes.map(t => `<td>${formatCurrency(t)}</td>`).join('')}
            </tr>
            <tr class="total-row">
                <td><strong>Résultat Net</strong></td>
                ${netIncome.map(n => `<td class="${n >= 0 ? 'positive' : 'negative'}"><strong>${formatCurrency(n)}</strong></td>`).join('')}
            </tr>
            <tr>
                <td><em>RN/CA (%)</em></td>
                ${netIncome.map((n, i) => `<td><em>${formatPercent(n/revenues[i]*100)}</em></td>`).join('')}
            </tr>
        </tbody>
    `;
    
    // Génération du tableau des flux de trésorerie
    const cashFlowTable = document.getElementById('cashFlowStatement');
    cashFlowTable.innerHTML = `
        <thead>
            <tr>
                <th>Éléments</th>
                ${Array.from({length: years}, (_, i) => `<th>Année ${i + 1}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Résultat Net</td>
                ${netIncome.map(n => `<td>${formatCurrency(n)}</td>`).join('')}
            </tr>
            <tr>
                <td>+ Amortissements</td>
                ${depreciation.map(d => `<td>${formatCurrency(d)}</td>`).join('')}
            </tr>
            <tr class="total-row">
                <td><strong>CAF (Capacité d'Autofinancement)</strong></td>
                ${netIncome.map((n, i) => `<td><strong>${formatCurrency(n + depreciation[i])}</strong></td>`).join('')}
            </tr>
            <tr>
                <td>- Variation du BFR</td>
                ${bfrVariation.map(b => `<td>${formatCurrency(-b)}</td>`).join('')}
            </tr>
            <tr>
                <td>- Investissements</td>
                ${investments.map(i => `<td>${formatCurrency(-i)}</td>`).join('')}
            </tr>
            <tr>
                <td>+ Levées de fonds</td>
                ${Array.from({length: years}, (_, i) => `<td>${formatCurrency(i === 0 ? funding1 : i === 2 ? funding3 : 0)}</td>`).join('')}
            </tr>
            <tr class="total-row">
                <td><strong>Cash Flow</strong></td>
                ${cashFlow.map(c => `<td class="${c >= 0 ? 'positive' : 'negative'}"><strong>${formatCurrency(c)}</strong></td>`).join('')}
            </tr>
            <tr>
                <td>Flux actualisés (${(discountRate*100).toFixed(0)}%)</td>
                ${discountedCashFlow.map(d => `<td>${formatCurrency(d)}</td>`).join('')}
            </tr>
            <tr class="total-row">
                <td><strong>VAN (Valeur Actuelle Nette)</strong></td>
                <td colspan="${years}"><strong>${formatCurrency(npv)}</strong></td>
            </tr>
        </tbody>
    `;
    
    // Génération du tableau d'évolution du BFR
    const bfrTable = document.getElementById('bfrEvolution');
    bfrTable.innerHTML = `
        <thead>
            <tr>
                <th>BFR - Détail</th>
                ${Array.from({length: years}, (_, i) => `<th>Année ${i + 1}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Créances clients (${clientPaymentDays}j)</td>
                ${revenues.map(r => `<td>${formatCurrency((r * bfrRate * clientPaymentDays) / 365)}</td>`).join('')}
            </tr>
            <tr>
                <td>+ Stocks (${stockDays}j)</td>
                ${revenues.map(r => `<td>${formatCurrency((r * bfrRate * stockDays) / 365)}</td>`).join('')}
            </tr>
            <tr>
                <td>- Dettes fournisseurs (${supplierPaymentDays}j)</td>
                ${revenues.map(r => `<td>${formatCurrency((r * bfrRate * (cogsRate + commissionsRate + shippingRate) * supplierPaymentDays) / 365)}</td>`).join('')}
            </tr>
            <tr class="total-row">
                <td><strong>BFR Total</strong></td>
                ${bfr.map(b => `<td><strong>${formatCurrency(b)}</strong></td>`).join('')}
            </tr>
            <tr>
                <td>Variation du BFR</td>
                ${bfrVariation.map(b => `<td class="${b <= 0 ? 'positive' : 'negative'}">${formatCurrency(b)}</td>`).join('')}
            </tr>
        </tbody>
    `;
    
    // Génération du plan de financement initial
    const initialFinancingTable = document.getElementById('initialFinancingPlan');
    const totalEmplois = investment1 + bfr[0] + 10000; // 10000 pour frais d'établissement
    const totalRessources = initialCapital + funding1 + loan;
    
    initialFinancingTable.innerHTML = `
        <thead>
            <tr>
                <th>EMPLOIS</th>
                <th>Montant</th>
                <th>RESSOURCES</th>
                <th>Montant</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Investissements</td>
                <td>${formatCurrency(investment1)}</td>
                <td>Capital social</td>
                <td>${formatCurrency(initialCapital)}</td>
            </tr>
            <tr>
                <td>BFR initial</td>
                <td>${formatCurrency(bfr[0])}</td>
                <td>Levée de fonds</td>
                <td>${formatCurrency(funding1)}</td>
            </tr>
            <tr>
                <td>Frais d'établissement</td>
                <td>${formatCurrency(10000)}</td>
                <td>Emprunt bancaire</td>
                <td>${formatCurrency(loan)}</td>
            </tr>
            <tr class="total-row">
                <td><strong>TOTAL EMPLOIS</strong></td>
                <td><strong>${formatCurrency(totalEmplois)}</strong></td>
                <td><strong>TOTAL RESSOURCES</strong></td>
                <td><strong>${formatCurrency(totalRessources)}</strong></td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td><strong>Équilibre</strong></td>
                <td class="${totalRessources >= totalEmplois ? 'positive' : 'negative'}"><strong>${formatCurrency(totalRessources - totalEmplois)}</strong></td>
            </tr>
        </tbody>
    `;
    
    // Génération du seuil de rentabilité
    const breakevenTable = document.getElementById('breakevenAnalysis');
    const avgVariableRate = (cogsRate + commissionsRate + shippingRate);
    const contributionMarginRate = 1 - avgVariableRate;
    
    breakevenTable.innerHTML = `
        <thead>
            <tr>
                <th>Analyse du Seuil de Rentabilité</th>
                ${Array.from({length: years}, (_, i) => `<th>Année ${i + 1}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Charges fixes totales</td>
                ${fixedCosts.map((f, i) => `<td>${formatCurrency(f + depreciation[i])}</td>`).join('')}
            </tr>
            <tr>
                <td>Taux de marge sur coûts variables</td>
                ${Array(years).fill(`<td>${formatPercent(contributionMarginRate * 100)}</td>`).join('')}
            </tr>
            <tr class="total-row">
                <td><strong>Seuil de rentabilité (CA)</strong></td>
                ${fixedCosts.map((f, i) => `<td><strong>${formatCurrency((f + depreciation[i]) / contributionMarginRate)}</strong></td>`).join('')}
            </tr>
            <tr>
                <td>CA réalisé</td>
                ${revenues.map(r => `<td>${formatCurrency(r)}</td>`).join('')}
            </tr>
            <tr>
                <td>Écart au seuil</td>
                ${revenues.map((r, i) => {
                    const breakeven = (fixedCosts[i] + depreciation[i]) / contributionMarginRate;
                    const gap = r - breakeven;
                    return `<td class="${gap >= 0 ? 'positive' : 'negative'}">${formatCurrency(gap)}</td>`;
                }).join('')}
            </tr>
        </tbody>
    `;
    
    // Afficher les résultats
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    return {
        revenues,
        netIncome,
        cashFlow,
        kpis: {
            totalRevenue,
            avgGrossMarginRate,
            breakevenYear,
            roi,
            npv,
            irr
        }
    };
}

// Fonctions d'export
function exportToExcel() {
    alert('Fonctionnalité d\'export Excel à implémenter avec une bibliothèque comme SheetJS');
}

function saveAsJSON() {
    const data = {
        parameters: {
            companyName: document.getElementById('companyName')?.value || '',
            sector: document.getElementById('sector')?.value || '',
            currency: document.getElementById('currency')?.value || 'EUR',
            revenue1: document.getElementById('revenue1')?.value || 0,
            growthRate: document.getElementById('growthRate')?.value || 0,
            cogs: document.getElementById('cogs')?.value || 0,
            commissions: document.getElementById('commissions')?.value || 0,
            shipping: document.getElementById('shipping')?.value || 0,
            salaries: document.getElementById('salaries')?.value || 0,
            rent: document.getElementById('rent')?.value || 0,
            marketing: document.getElementById('marketing')?.value || 0,
            admin: document.getElementById('admin')?.value || 0,
            insurance: document.getElementById('insurance')?.value || 0,
            otherFixed: document.getElementById('otherFixed')?.value || 0,
            initialCapital: document.getElementById('initialCapital')?.value || 0,
            funding1: document.getElementById('funding1')?.value || 0,
            funding3: document.getElementById('funding3')?.value || 0,
            loan: document.getElementById('loan')?.value || 0,
            interestRate: document.getElementById('interestRate')?.value || 0,
            investment1: document.getElementById('investment1')?.value || 0,
            investment2: document.getElementById('investment2')?.value || 0,
            investment3: document.getElementById('investment3')?.value || 0,
            depreciationYears: document.getElementById('depreciationYears')?.value || 5,
            discountRate: document.getElementById('discountRate')?.value || 10,
            taxRate: document.getElementById('taxRate')?.value || 30,
            clientPaymentDays: document.getElementById('clientPaymentDays')?.value || 45,
            stockDays: document.getElementById('stockDays')?.value || 30,
            supplierPaymentDays: document.getElementById('supplierPaymentDays')?.value || 60,
            bfrRate: document.getElementById('bfrRate')?.value || 80
        },
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `business-plan-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Calcul automatique lors de la modification des valeurs
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', () => {
            const resultsSection = document.getElementById('results');
            if (resultsSection && resultsSection.style.display === 'block') {
                calculateFinancials();
            }
        });
    });
});
