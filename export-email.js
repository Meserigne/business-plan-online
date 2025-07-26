// Module d'export et d'envoi par email
class ExportEmailManager {
    constructor() {
        this.businessPlanData = {};
        this.financialData = {};
        this.loadData();
    }

    loadData() {
        // Charger les données du business plan
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

    // Générer un rapport PDF complet
    async generatePDFReport() {
        try {
            // Utiliser jsPDF pour créer le PDF
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Configuration
            const pageWidth = doc.internal.pageSize.width;
            const margin = 20;
            let yPosition = 30;

            // En-tête
            doc.setFontSize(20);
            doc.setTextColor(44, 62, 80);
            doc.text('BUSINESS PLAN ONLINE', pageWidth / 2, yPosition, { align: 'center' });
            
            yPosition += 15;
            doc.setFontSize(14);
            doc.setTextColor(127, 140, 141);
            doc.text('Rapport Complet du Business Plan', pageWidth / 2, yPosition, { align: 'center' });
            
            yPosition += 20;
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0);
            doc.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, yPosition, { align: 'center' });

            yPosition += 30;

            // Section 1: Résumé Exécutif
            doc.setFontSize(16);
            doc.setTextColor(52, 152, 219);
            doc.text('1. RÉSUMÉ EXÉCUTIF', margin, yPosition);
            yPosition += 15;

            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            
            // Informations de base
            const projectName = this.businessPlanData[0] || 'Non spécifié';
            const marketSize = this.businessPlanData[1] || 'Non spécifié';
            const targetClients = this.businessPlanData[2] || 'Non spécifié';

            doc.text(`Nom du projet: ${projectName}`, margin, yPosition);
            yPosition += 8;
            doc.text(`Taille du marché: ${marketSize}`, margin, yPosition);
            yPosition += 8;
            doc.text(`Clients cibles: ${targetClients}`, margin, yPosition);
            yPosition += 20;

            // Section 2: Analyse Financière
            doc.setFontSize(16);
            doc.setTextColor(52, 152, 219);
            doc.text('2. ANALYSE FINANCIÈRE', margin, yPosition);
            yPosition += 15;

            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);

            if (this.financialData.totalRevenue) {
                doc.text(`Chiffre d'affaires prévisionnel (5 ans): ${this.formatCurrency(this.financialData.totalRevenue)}`, margin, yPosition);
                yPosition += 8;
                doc.text(`ROI: ${this.financialData.roi?.toFixed(1)}%`, margin, yPosition);
                yPosition += 8;
                doc.text(`Marge brute moyenne: ${this.financialData.avgGrossMarginRate?.toFixed(1)}%`, margin, yPosition);
                yPosition += 8;
            }

            // Nouvelle page si nécessaire
            if (yPosition > 250) {
                doc.addPage();
                yPosition = 30;
            }

            // Section 3: Stratégie Marketing
            yPosition += 15;
            doc.setFontSize(16);
            doc.setTextColor(52, 152, 219);
            doc.text('3. STRATÉGIE MARKETING', margin, yPosition);
            yPosition += 15;

            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            
            const marketingStrategy = this.businessPlanData[25] || 'Non spécifié';
            const splitText = doc.splitTextToSize(marketingStrategy, pageWidth - 2 * margin);
            doc.text(splitText, margin, yPosition);
            yPosition += splitText.length * 6;

            // Section 4: Analyse des Risques
            yPosition += 15;
            doc.setFontSize(16);
            doc.setTextColor(52, 152, 219);
            doc.text('4. ANALYSE DES RISQUES', margin, yPosition);
            yPosition += 15;

            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            doc.text('• Risques de marché: Concurrence accrue, évolution des besoins clients', margin, yPosition);
            yPosition += 8;
            doc.text('• Risques financiers: Retard de paiement, fluctuation des coûts', margin, yPosition);
            yPosition += 8;
            doc.text('• Risques opérationnels: Problèmes de recrutement, défaillance technique', margin, yPosition);

            // Pied de page
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(127, 140, 141);
                doc.text(`Business Plan Online - Page ${i}/${pageCount}`, pageWidth / 2, 285, { align: 'center' });
            }

            return doc;
        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error);
            throw error;
        }
    }

    // Télécharger le rapport PDF
    async downloadPDF() {
        try {
            const doc = await this.generatePDFReport();
            const fileName = `business-plan-${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);
            this.showNotification('Rapport PDF téléchargé avec succès !', 'success');
        } catch (error) {
            this.showNotification('Erreur lors du téléchargement PDF', 'error');
        }
    }

    // Générer et télécharger un fichier Excel
    async downloadExcel() {
        try {
            // Créer un workbook Excel
            const wb = XLSX.utils.book_new();

            // Feuille 1: Informations générales
            const generalData = [
                ['BUSINESS PLAN ONLINE - RAPPORT EXCEL'],
                [''],
                ['Généré le:', new Date().toLocaleDateString('fr-FR')],
                [''],
                ['INFORMATIONS GÉNÉRALES'],
                ['Nom du projet:', this.businessPlanData[0] || 'Non spécifié'],
                ['Taille du marché:', this.businessPlanData[1] || 'Non spécifié'],
                ['Clients cibles:', this.businessPlanData[2] || 'Non spécifié'],
                ['Situation du marché:', this.businessPlanData[3] || 'Non spécifié'],
                [''],
                ['ANALYSE CONCURRENTIELLE'],
                ['Concurrents principaux:', this.businessPlanData[11] || 'Non spécifié'],
                ['Avantages concurrentiels:', this.businessPlanData[13] || 'Non spécifié'],
                [''],
                ['STRATÉGIE MARKETING'],
                ['Stratégie marketing:', this.businessPlanData[25] || 'Non spécifié'],
                ['Canaux de distribution:', this.businessPlanData[26] || 'Non spécifié']
            ];

            const ws1 = XLSX.utils.aoa_to_sheet(generalData);
            XLSX.utils.book_append_sheet(wb, ws1, 'Informations Générales');

            // Feuille 2: Données financières
            if (this.financialData.revenues) {
                const financialData = [
                    ['PROJECTIONS FINANCIÈRES'],
                    [''],
                    ['Année', 'Revenus', 'Coûts', 'Marge Brute', 'Marge Nette'],
                ];

                this.financialData.revenues.forEach((revenue, index) => {
                    const year = `Année ${index + 1}`;
                    const costs = this.financialData.costs ? this.financialData.costs[index] : 0;
                    const grossMargin = revenue - costs;
                    const netMargin = grossMargin * 0.8; // Estimation

                    financialData.push([
                        year,
                        revenue,
                        costs,
                        grossMargin,
                        netMargin
                    ]);
                });

                financialData.push(['']);
                financialData.push(['INDICATEURS CLÉS']);
                financialData.push(['ROI:', `${this.financialData.roi?.toFixed(1)}%`]);
                financialData.push(['Marge brute moyenne:', `${this.financialData.avgGrossMarginRate?.toFixed(1)}%`]);
                financialData.push(['CA total (5 ans):', this.financialData.totalRevenue]);

                const ws2 = XLSX.utils.aoa_to_sheet(financialData);
                XLSX.utils.book_append_sheet(wb, ws2, 'Projections Financières');
            }

            // Feuille 3: Réponses complètes (60 questions)
            const questionsData = [
                ['RÉPONSES COMPLÈTES DU BUSINESS PLAN'],
                [''],
                ['Question', 'Réponse']
            ];

            const questions = [
                'Nom du projet/entreprise',
                'Taille du marché cible',
                'Nombre de clients potentiels',
                'Situation actuelle du marché',
                'Description du produit/service',
                // Ajouter d\'autres questions selon vos besoins
            ];

            questions.forEach((question, index) => {
                const answer = this.businessPlanData[index] || 'Non renseigné';
                questionsData.push([question, answer]);
            });

            const ws3 = XLSX.utils.aoa_to_sheet(questionsData);
            XLSX.utils.book_append_sheet(wb, ws3, 'Réponses Complètes');

            // Télécharger le fichier Excel
            const fileName = `business-plan-${new Date().toISOString().split('T')[0]}.xlsx`;
            XLSX.writeFile(wb, fileName);
            
            this.showNotification('Rapport Excel téléchargé avec succès !', 'success');
        } catch (error) {
            console.error('Erreur lors de la génération Excel:', error);
            this.showNotification('Erreur lors du téléchargement Excel', 'error');
        }
    }

    // Envoyer le rapport par email
    async sendByEmail() {
        try {
            // Créer le modal d'envoi d'email
            const modal = this.createEmailModal();
            document.body.appendChild(modal);
            modal.style.display = 'flex';
        } catch (error) {
            this.showNotification('Erreur lors de l\'ouverture du formulaire email', 'error');
        }
    }

    // Créer le modal d'envoi d'email
    createEmailModal() {
        const modal = document.createElement('div');
        modal.className = 'email-modal';
        modal.innerHTML = `
            <div class="email-modal-content">
                <div class="email-modal-header">
                    <h3><i class="fas fa-envelope"></i> Envoyer le rapport par email</h3>
                    <button class="email-modal-close">&times;</button>
                </div>
                <div class="email-modal-body">
                    <form id="emailForm">
                        <div class="form-group">
                            <label for="recipientEmail">Email du destinataire *</label>
                            <input type="email" id="recipientEmail" required placeholder="exemple@email.com">
                        </div>
                        <div class="form-group">
                            <label for="senderName">Votre nom</label>
                            <input type="text" id="senderName" placeholder="Votre nom">
                        </div>
                        <div class="form-group">
                            <label for="emailSubject">Sujet</label>
                            <input type="text" id="emailSubject" value="Business Plan - Rapport complet" placeholder="Sujet de l'email">
                        </div>
                        <div class="form-group">
                            <label for="emailMessage">Message personnalisé</label>
                            <textarea id="emailMessage" rows="4" placeholder="Ajoutez un message personnalisé (optionnel)">Bonjour,

Veuillez trouver ci-joint le rapport complet de mon business plan généré avec Business Plan Online.

Cordialement</textarea>
                        </div>
                        <div class="form-group">
                            <label>Formats à inclure:</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" id="includePDF" checked> PDF</label>
                                <label><input type="checkbox" id="includeExcel" checked> Excel</label>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel">Annuler</button>
                            <button type="submit" class="btn-send">
                                <i class="fas fa-paper-plane"></i> Envoyer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Ajouter les événements
        const closeBtn = modal.querySelector('.email-modal-close');
        const cancelBtn = modal.querySelector('.btn-cancel');
        const form = modal.querySelector('#emailForm');

        closeBtn.onclick = () => this.closeEmailModal(modal);
        cancelBtn.onclick = () => this.closeEmailModal(modal);
        form.onsubmit = (e) => this.handleEmailSubmit(e, modal);

        // Fermer en cliquant à l'extérieur
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeEmailModal(modal);
            }
        };

        return modal;
    }

    // Fermer le modal d'email
    closeEmailModal(modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    }

    // Gérer l'envoi d'email
    async handleEmailSubmit(e, modal) {
        e.preventDefault();
        
        const recipientEmail = document.getElementById('recipientEmail').value;
        const senderName = document.getElementById('senderName').value;
        const subject = document.getElementById('emailSubject').value;
        const message = document.getElementById('emailMessage').value;
        const includePDF = document.getElementById('includePDF').checked;
        const includeExcel = document.getElementById('includeExcel').checked;

        if (!recipientEmail) {
            this.showNotification('Veuillez saisir l\'email du destinataire', 'error');
            return;
        }

        try {
            // Générer les fichiers selon les options sélectionnées
            let attachments = [];
            
            if (includePDF) {
                const pdfDoc = await this.generatePDFReport();
                const pdfBlob = pdfDoc.output('blob');
                attachments.push({
                    name: `business-plan-${new Date().toISOString().split('T')[0]}.pdf`,
                    data: pdfBlob,
                    type: 'application/pdf'
                });
            }

            // Créer le lien mailto avec les informations
            const emailBody = encodeURIComponent(message + '\n\n---\nGénéré avec Business Plan Online\nhttps://businessplan.lightbulb-agency.com');
            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
            
            // Ouvrir le client email par défaut
            window.location.href = mailtoLink;
            
            // Télécharger les fichiers pour que l'utilisateur puisse les joindre manuellement
            if (includePDF) {
                await this.downloadPDF();
            }
            if (includeExcel) {
                await this.downloadExcel();
            }

            this.closeEmailModal(modal);
            this.showNotification('Client email ouvert. Les fichiers ont été téléchargés pour que vous puissiez les joindre.', 'info');
            
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            this.showNotification('Erreur lors de la préparation de l\'email', 'error');
        }
    }

    // Utilitaire pour formater les devises
    formatCurrency(amount) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
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
        
        // Animation d'apparition
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Suppression automatique
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }
}

// Fonctions globales pour l'interface
window.exportEmailManager = new ExportEmailManager();

function downloadPDFReport() {
    window.exportEmailManager.downloadPDF();
}

function downloadExcelReport() {
    window.exportEmailManager.downloadExcel();
}

function sendReportByEmail() {
    window.exportEmailManager.sendByEmail();
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    window.exportEmailManager = new ExportEmailManager();
});
