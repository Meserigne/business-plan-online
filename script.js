// Variables globales
let currentStep = 1;
const totalSteps = 4;
let businessPlanData = {};

// Éléments DOM
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const stepCounter = document.getElementById('step-counter');
const steps = document.querySelectorAll('.step');
const mainContent = document.querySelector('.main-content');
const summarySection = document.getElementById('summary');

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    updateStepCounter();
    loadSavedData();
    
    // Event listeners
    prevBtn.addEventListener('click', previousStep);
    nextBtn.addEventListener('click', nextStep);
    
    // Export buttons
    document.getElementById('export-pdf').addEventListener('click', exportToPDF);
    document.getElementById('save-data').addEventListener('click', saveData);
    document.getElementById('restart').addEventListener('click', restartForm);
    
    // Auto-save on input change
    document.addEventListener('input', autoSave);
    document.addEventListener('change', autoSave);
});

// Navigation
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        } else {
            showSummary();
        }
        updateProgress();
        updateStepCounter();
        updateNavigation();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        showMainContent();
        updateProgress();
        updateStepCounter();
        updateNavigation();
    }
}

function showStep(stepNumber) {
    steps.forEach((step, index) => {
        step.classList.toggle('active', index + 1 === stepNumber);
    });
}

function showMainContent() {
    mainContent.style.display = 'block';
    summarySection.style.display = 'none';
}

function showSummary() {
    saveAllData();
    generateSummary();
    mainContent.style.display = 'none';
    summarySection.style.display = 'block';
}

// Mise à jour de l'interface
function updateProgress() {
    const progressPercentage = currentStep <= totalSteps ? 
        (currentStep / totalSteps) * 100 : 100;
    progress.style.width = progressPercentage + '%';
}

function updateStepCounter() {
    if (currentStep <= totalSteps) {
        stepCounter.textContent = `Étape ${currentStep} sur ${totalSteps}`;
    } else {
        stepCounter.textContent = 'Résumé final';
    }
}

function updateNavigation() {
    prevBtn.disabled = currentStep === 1;
    
    if (currentStep < totalSteps) {
        nextBtn.innerHTML = 'Suivant <i class="fas fa-arrow-right"></i>';
    } else {
        nextBtn.innerHTML = 'Voir le résumé <i class="fas fa-file-alt"></i>';
    }
}

// Validation
function validateCurrentStep() {
    let isValid = true;
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    const requiredFields = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    
    // Pour cette démonstration, on ne rend pas les champs obligatoires
    // mais on peut ajouter la validation si nécessaire
    
    return isValid;
}

// Sauvegarde des données
function saveAllData() {
    // Étape 1 - Marché
    businessPlanData.marche = {
        taille: document.getElementById('market-size').value,
        nombreClients: document.getElementById('target-clients').value,
        situation: document.getElementById('market-situation').value,
        nouveauxActeurs: document.getElementById('new-actors').value
    };
    
    // Étape 2 - Offre
    businessPlanData.offre = {
        typeActivite: document.getElementById('business-type').value,
        phaseMarche: document.getElementById('market-phase').value,
        beneficesClients: document.getElementById('customer-benefits').value,
        criteresAchat: document.getElementById('purchase-criteria').value
    };
    
    // Étape 3 - Concurrence
    businessPlanData.concurrence = {
        typeConcurrence: document.getElementById('competition-type').value,
        concurrents: document.getElementById('competitors').value,
        avantageConcurrentiel: document.getElementById('competitive-advantage').value
    };
    
    // Étape 4 - Ressources
    businessPlanData.ressources = {
        ressourcesHumaines: document.getElementById('human-resources').value,
        ressourcesFinancieres: document.getElementById('financial-resources').value,
        ressourcesMaterielles: document.getElementById('material-resources').value,
        calendrier: document.getElementById('timeline').value
    };
}

function autoSave() {
    saveAllData();
    localStorage.setItem('businessPlanData', JSON.stringify(businessPlanData));
}

function loadSavedData() {
    const savedData = localStorage.getItem('businessPlanData');
    if (savedData) {
        businessPlanData = JSON.parse(savedData);
        populateForm();
    }
}

function populateForm() {
    if (businessPlanData.marche) {
        document.getElementById('market-size').value = businessPlanData.marche.taille || '';
        document.getElementById('target-clients').value = businessPlanData.marche.nombreClients || '';
        document.getElementById('market-situation').value = businessPlanData.marche.situation || '';
        document.getElementById('new-actors').value = businessPlanData.marche.nouveauxActeurs || '';
    }
    
    if (businessPlanData.offre) {
        document.getElementById('business-type').value = businessPlanData.offre.typeActivite || '';
        document.getElementById('market-phase').value = businessPlanData.offre.phaseMarche || '';
        document.getElementById('customer-benefits').value = businessPlanData.offre.beneficesClients || '';
        document.getElementById('purchase-criteria').value = businessPlanData.offre.criteresAchat || '';
    }
    
    if (businessPlanData.concurrence) {
        document.getElementById('competition-type').value = businessPlanData.concurrence.typeConcurrence || '';
        document.getElementById('competitors').value = businessPlanData.concurrence.concurrents || '';
        document.getElementById('competitive-advantage').value = businessPlanData.concurrence.avantageConcurrentiel || '';
    }
    
    if (businessPlanData.ressources) {
        document.getElementById('human-resources').value = businessPlanData.ressources.ressourcesHumaines || '';
        document.getElementById('financial-resources').value = businessPlanData.ressources.ressourcesFinancieres || '';
        document.getElementById('material-resources').value = businessPlanData.ressources.ressourcesMaterielles || '';
        document.getElementById('timeline').value = businessPlanData.ressources.calendrier || '';
    }
}

// Génération du résumé
function generateSummary() {
    const summaryContent = document.getElementById('summary-content');
    let html = '';
    
    // Section Marché
    html += `
        <div class="summary-item">
            <h3><i class="fas fa-bullseye"></i> Analyse du Marché</h3>
            <p><strong>Taille du marché :</strong> ${getDisplayValue(businessPlanData.marche?.taille)}</p>
            <p><strong>Nombre de clients cibles :</strong> ${getDisplayValue(businessPlanData.marche?.nombreClients)}</p>
            <p><strong>Situation du marché :</strong> ${getDisplayValue(businessPlanData.marche?.situation)}</p>
            ${businessPlanData.marche?.nouveauxActeurs ? 
                `<p><strong>Nouveaux acteurs potentiels :</strong> ${businessPlanData.marche.nouveauxActeurs}</p>` : ''}
        </div>
    `;
    
    // Section Offre
    html += `
        <div class="summary-item">
            <h3><i class="fas fa-store"></i> Votre Offre</h3>
            <p><strong>Type d'activité :</strong> ${getDisplayValue(businessPlanData.offre?.typeActivite)}</p>
            <p><strong>Alignement avec le marché :</strong> ${getDisplayValue(businessPlanData.offre?.phaseMarche)}</p>
            ${businessPlanData.offre?.beneficesClients ? 
                `<p><strong>Bénéfices clients :</strong> ${businessPlanData.offre.beneficesClients}</p>` : ''}
            ${businessPlanData.offre?.criteresAchat ? 
                `<p><strong>Critères d'achat :</strong> ${businessPlanData.offre.criteresAchat}</p>` : ''}
        </div>
    `;
    
    // Section Concurrence
    html += `
        <div class="summary-item">
            <h3><i class="fas fa-users"></i> Environnement Concurrentiel</h3>
            <p><strong>Type de concurrence :</strong> ${getDisplayValue(businessPlanData.concurrence?.typeConcurrence)}</p>
            ${businessPlanData.concurrence?.concurrents ? 
                `<p><strong>Principaux concurrents :</strong> ${businessPlanData.concurrence.concurrents}</p>` : ''}
            ${businessPlanData.concurrence?.avantageConcurrentiel ? 
                `<p><strong>Avantage concurrentiel :</strong> ${businessPlanData.concurrence.avantageConcurrentiel}</p>` : ''}
        </div>
    `;
    
    // Section Ressources
    html += `
        <div class="summary-item">
            <h3><i class="fas fa-cogs"></i> Ressources Nécessaires</h3>
            ${businessPlanData.ressources?.ressourcesHumaines ? 
                `<p><strong>Ressources humaines :</strong> ${businessPlanData.ressources.ressourcesHumaines}</p>` : ''}
            <p><strong>Budget initial :</strong> ${businessPlanData.ressources?.ressourcesFinancieres ? 
                businessPlanData.ressources.ressourcesFinancieres + ' €' : 'Non spécifié'}</p>
            ${businessPlanData.ressources?.ressourcesMaterielles ? 
                `<p><strong>Ressources matérielles :</strong> ${businessPlanData.ressources.ressourcesMaterielles}</p>` : ''}
            ${businessPlanData.ressources?.calendrier ? 
                `<p><strong>Calendrier :</strong> ${businessPlanData.ressources.calendrier}</p>` : ''}
        </div>
    `;
    
    summaryContent.innerHTML = html;
}

function getDisplayValue(value) {
    if (!value) return 'Non spécifié';
    
    // Traduction des valeurs pour un affichage plus lisible
    const translations = {
        'local': 'Local',
        'national': 'National',
        'international': 'International',
        'mondial': 'Mondial',
        'penurie': 'Pénurie d\'offre',
        'equilibre': 'Offre équilibrée',
        'exces': 'Excès d\'offre',
        'b2b-soustraitance': 'B to B - Sous-traitance',
        'b2b-distribution': 'B to B - Relation avec grande distribution',
        'b2c': 'B to C - Relation directe consommateur',
        'mixte': 'Mixte',
        'oui': 'Oui, parfaitement en phase',
        'majoritairement': 'Majoritairement en phase',
        'partiellement': 'Partiellement en phase',
        'non': 'Non, pas en phase',
        'frontale': 'Concurrence frontale (directe)',
        'partielle': 'Concurrence partielle (indirecte)',
        'aucune': 'Aucune concurrence',
        'emergente': 'Concurrence émergente'
    };
    
    return translations[value] || value;
}

// Fonctions d'export et sauvegarde
function exportToPDF() {
    showMessage('Fonctionnalité d\'export PDF en cours de développement', 'info');
    
    // Ici on pourrait intégrer une bibliothèque comme jsPDF
    // Pour l'instant, on ouvre la fenêtre d'impression
    window.print();
}

function saveData() {
    saveAllData();
    localStorage.setItem('businessPlanData', JSON.stringify(businessPlanData));
    
    // Télécharger en JSON
    const dataStr = JSON.stringify(businessPlanData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'business-plan-' + new Date().toISOString().split('T')[0] + '.json';
    link.click();
    URL.revokeObjectURL(url);
    
    showMessage('Données sauvegardées avec succès !', 'success');
}

function restartForm() {
    if (confirm('Êtes-vous sûr de vouloir recommencer ? Toutes les données seront perdues.')) {
        localStorage.removeItem('businessPlanData');
        businessPlanData = {};
        currentStep = 1;
        
        // Reset form
        document.querySelectorAll('input, select, textarea').forEach(field => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                field.checked = false;
            } else {
                field.value = '';
            }
        });
        
        showStep(1);
        showMainContent();
        updateProgress();
        updateStepCounter();
        updateNavigation();
        
        showMessage('Formulaire réinitialisé', 'info');
    }
}

// Fonction utilitaire pour afficher des messages
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Insérer le message au début du container
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    // Supprimer le message après 3 secondes
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Gestion du clavier
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        nextStep();
    }
    if (e.key === 'ArrowLeft' && e.ctrlKey) {
        if (currentStep > 1) previousStep();
    }
    if (e.key === 'ArrowRight' && e.ctrlKey) {
        nextStep();
    }
});

// Animation au chargement
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 