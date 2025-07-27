// Panneau d'Administration - Business Plan Online
class AdminPanel {
    constructor() {
        this.isLoggedIn = false;
        this.adminCredentials = {
            username: 'admin',
            password: 'admin123'
        };
        this.init();
    }

    init() {
        this.checkAdminSession();
        this.setupEventListeners();
        if (this.isLoggedIn) {
            this.loadDashboard();
        }
    }

    // Vérifier la session admin
    checkAdminSession() {
        const adminSession = localStorage.getItem('adminSession');
        if (adminSession) {
            const session = JSON.parse(adminSession);
            // Vérifier si la session n'a pas expiré (24h)
            if (Date.now() - session.timestamp < 24 * 60 * 60 * 1000) {
                this.isLoggedIn = true;
                this.showDashboard();
            } else {
                localStorage.removeItem('adminSession');
            }
        }
    }

    setupEventListeners() {
        // Login admin
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAdminLogin();
            });
        }

        // Logout admin
        const logoutBtn = document.getElementById('adminLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleAdminLogout());
        }

        // Onglets
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Boutons d'action
        this.setupActionButtons();
    }

    setupActionButtons() {
        // Boutons utilisateurs
        const exportUsersBtn = document.getElementById('exportUsersBtn');
        const addUserBtn = document.getElementById('addUserBtn');
        
        if (exportUsersBtn) exportUsersBtn.addEventListener('click', () => this.exportUsers());
        if (addUserBtn) addUserBtn.addEventListener('click', () => this.showAddUserModal());

        // Recherche utilisateurs
        const userSearch = document.getElementById('userSearch');
        if (userSearch) {
            userSearch.addEventListener('input', (e) => this.searchUsers(e.target.value));
        }

        // Boutons données
        const backupDataBtn = document.getElementById('backupDataBtn');
        const clearDataBtn = document.getElementById('clearDataBtn');
        
        if (backupDataBtn) backupDataBtn.addEventListener('click', () => this.backupData());
        if (clearDataBtn) clearDataBtn.addEventListener('click', () => this.clearData());
    }

    // Gérer la connexion admin
    handleAdminLogin() {
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (username === this.adminCredentials.username && password === this.adminCredentials.password) {
            this.isLoggedIn = true;
            
            // Sauvegarder la session
            const session = {
                timestamp: Date.now(),
                username: username
            };
            localStorage.setItem('adminSession', JSON.stringify(session));

            this.showDashboard();
            this.loadDashboard();
        } else {
            this.showNotification('Identifiants incorrects', 'error');
        }
    }

    // Gérer la déconnexion admin
    handleAdminLogout() {
        this.isLoggedIn = false;
        localStorage.removeItem('adminSession');
        document.getElementById('adminLogin').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
    }

    // Afficher le dashboard
    showDashboard() {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
    }

    // Charger les données du dashboard
    loadDashboard() {
        this.loadStats();
        this.loadUsers();
        this.loadDataOverview();
        this.loadAnalytics();
        this.updateLastUpdate();
    }

    // Charger les statistiques
    loadStats() {
        const users = this.getAllUsers();
        const businessPlans = this.getAllBusinessPlans();
        
        document.getElementById('totalUsers').textContent = users.length;
        document.getElementById('totalBusinessPlans').textContent = businessPlans.length;
        document.getElementById('activeToday').textContent = this.getActiveToday();
        document.getElementById('totalExports').textContent = this.getTotalExports();
    }

    // Récupérer tous les utilisateurs
    getAllUsers() {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        return registeredUsers;
    }

    // Récupérer tous les business plans
    getAllBusinessPlans() {
        const users = this.getAllUsers();
        let businessPlans = [];
        
        users.forEach(user => {
            const userDataKey = `userData_${user.id}`;
            const userData = localStorage.getItem(userDataKey);
            if (userData) {
                const data = JSON.parse(userData);
                if (data.businessPlan) {
                    businessPlans.push({
                        userId: user.id,
                        userName: user.name,
                        data: JSON.parse(data.businessPlan)
                    });
                }
            }
        });

        // Ajouter les données anonymes
        const anonymousBusinessPlan = localStorage.getItem('businessPlan60Questions');
        if (anonymousBusinessPlan) {
            businessPlans.push({
                userId: 'anonymous',
                userName: 'Utilisateur anonyme',
                data: JSON.parse(anonymousBusinessPlan)
            });
        }

        return businessPlans;
    }

    // Calculer les utilisateurs actifs aujourd'hui
    getActiveToday() {
        // Simulation basée sur les données disponibles
        const users = this.getAllUsers();
        const today = new Date().toDateString();
        let activeCount = 0;

        users.forEach(user => {
            if (user.lastLogin && new Date(user.lastLogin).toDateString() === today) {
                activeCount++;
            }
        });

        return activeCount || Math.floor(users.length * 0.3); // Estimation
    }

    // Calculer le total des exports
    getTotalExports() {
        // Simulation basée sur les données disponibles
        const exportHistory = JSON.parse(localStorage.getItem('exportHistory') || '[]');
        return exportHistory.length || Math.floor(Math.random() * 50) + 20;
    }

    // Charger la liste des utilisateurs
    loadUsers() {
        const users = this.getAllUsers();
        const tbody = document.getElementById('usersTableBody');
        
        tbody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.company || '-'}</td>
                <td>${new Date(user.registrationDate).toLocaleDateString('fr-FR')}</td>
                <td>${user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : 'Jamais'}</td>
                <td>
                    <button class="action-btn view-btn" onclick="adminPanel.viewUser('${user.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="adminPanel.editUser('${user.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="adminPanel.deleteUser('${user.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Rechercher des utilisateurs
    searchUsers(query) {
        const users = this.getAllUsers();
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase()) ||
            (user.company && user.company.toLowerCase().includes(query.toLowerCase()))
        );

        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = '';

        filteredUsers.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.company || '-'}</td>
                <td>${new Date(user.registrationDate).toLocaleDateString('fr-FR')}</td>
                <td>${user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : 'Jamais'}</td>
                <td>
                    <button class="action-btn view-btn" onclick="adminPanel.viewUser('${user.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="adminPanel.editUser('${user.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="adminPanel.deleteUser('${user.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Voir un utilisateur
    viewUser(userId) {
        const users = this.getAllUsers();
        const user = users.find(u => u.id === userId);
        
        if (user) {
            const userDataKey = `userData_${userId}`;
            const userData = localStorage.getItem(userDataKey);
            
            let userInfo = `
                <h3>Informations utilisateur</h3>
                <p><strong>Nom:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Entreprise:</strong> ${user.company || 'Non spécifiée'}</p>
                <p><strong>Inscription:</strong> ${new Date(user.registrationDate).toLocaleString('fr-FR')}</p>
            `;

            if (userData) {
                const data = JSON.parse(userData);
                userInfo += `
                    <h4>Données sauvegardées:</h4>
                    <ul>
                        <li>Business Plan: ${data.businessPlan ? 'Oui' : 'Non'}</li>
                        <li>Données financières: ${data.financialData ? 'Oui' : 'Non'}</li>
                        <li>Analyse SWOT: ${data.swotAnalysis ? 'Oui' : 'Non'}</li>
                        <li>Scénarios: ${data.scenarios ? 'Oui' : 'Non'}</li>
                        <li>Dernière sync: ${data.lastSync ? new Date(data.lastSync).toLocaleString('fr-FR') : 'Jamais'}</li>
                    </ul>
                `;
            }

            this.showModal('Détails utilisateur', userInfo);
        }
    }

    // Supprimer un utilisateur
    deleteUser(userId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur et toutes ses données ?')) {
            let users = this.getAllUsers();
            users = users.filter(u => u.id !== userId);
            
            localStorage.setItem('registeredUsers', JSON.stringify(users));
            localStorage.removeItem(`userData_${userId}`);
            
            this.loadUsers();
            this.loadStats();
            this.showNotification('Utilisateur supprimé avec succès', 'success');
        }
    }

    // Charger l'aperçu des données
    loadDataOverview() {
        const businessPlans = this.getAllBusinessPlans();
        const users = this.getAllUsers();
        
        document.getElementById('businessPlansCount').textContent = `${businessPlans.length} business plans stockés`;
        
        let financialDataCount = 0;
        let swotAnalysisCount = 0;
        let scenariosCount = 0;

        users.forEach(user => {
            const userDataKey = `userData_${user.id}`;
            const userData = localStorage.getItem(userDataKey);
            if (userData) {
                const data = JSON.parse(userData);
                if (data.financialData) financialDataCount++;
                if (data.swotAnalysis) swotAnalysisCount++;
                if (data.scenarios) scenariosCount++;
            }
        });

        // Ajouter les données anonymes
        if (localStorage.getItem('financialModelData')) financialDataCount++;
        if (localStorage.getItem('swotAnalysis')) swotAnalysisCount++;
        if (localStorage.getItem('savedScenarios')) scenariosCount++;

        document.getElementById('financialDataCount').textContent = `${financialDataCount} modèles financiers`;
        document.getElementById('swotAnalysisCount').textContent = `${swotAnalysisCount} analyses SWOT`;
        document.getElementById('scenariosCount').textContent = `${scenariosCount} scénarios sauvegardés`;
    }

    // Charger les analytics
    loadAnalytics() {
        // Simulation de graphiques (en production, utiliser Chart.js ou similaire)
        this.drawSimpleChart('dailyUsageChart', 'Utilisation quotidienne');
        this.drawSimpleChart('templatesChart', 'Templates populaires');
        this.drawSimpleChart('exportsChart', 'Exports par format');
    }

    // Dessiner un graphique simple
    drawSimpleChart(canvasId, title) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Titre
        ctx.fillStyle = '#2c3e50';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(title, canvas.width / 2, 20);

        // Données simulées
        const data = [10, 25, 15, 30, 20, 35, 28];
        const maxValue = Math.max(...data);
        const barWidth = canvas.width / data.length - 10;
        const maxBarHeight = canvas.height - 60;

        // Barres
        data.forEach((value, index) => {
            const barHeight = (value / maxValue) * maxBarHeight;
            const x = index * (barWidth + 10) + 5;
            const y = canvas.height - barHeight - 30;

            ctx.fillStyle = '#3498db';
            ctx.fillRect(x, y, barWidth, barHeight);

            // Valeurs
            ctx.fillStyle = '#2c3e50';
            ctx.font = '10px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(value, x + barWidth / 2, y - 5);
        });
    }

    // Exporter les utilisateurs
    exportUsers() {
        const users = this.getAllUsers();
        const csvContent = "data:text/csv;charset=utf-8," 
            + "ID,Nom,Email,Entreprise,Date d'inscription,Dernière connexion\n"
            + users.map(user => 
                `${user.id},"${user.name}","${user.email}","${user.company || ''}","${user.registrationDate}","${user.lastLogin || ''}"`
            ).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `utilisateurs_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showNotification('Export des utilisateurs terminé', 'success');
    }

    // Sauvegarder toutes les données
    backupData() {
        const backup = {
            users: this.getAllUsers(),
            businessPlans: this.getAllBusinessPlans(),
            timestamp: new Date().toISOString(),
            version: '2.0.0'
        };

        // Ajouter toutes les données localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && !key.startsWith('admin')) {
                backup[key] = localStorage.getItem(key);
            }
        }

        const dataStr = JSON.stringify(backup, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup_business_plan_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Sauvegarde créée avec succès', 'success');
    }

    // Nettoyer les données
    clearData() {
        if (confirm('ATTENTION: Cette action supprimera TOUTES les données utilisateurs. Êtes-vous absolument sûr ?')) {
            if (confirm('Cette action est IRRÉVERSIBLE. Confirmez-vous la suppression ?')) {
                // Garder seulement les données admin
                const adminSession = localStorage.getItem('adminSession');
                localStorage.clear();
                if (adminSession) {
                    localStorage.setItem('adminSession', adminSession);
                }
                
                this.loadDashboard();
                this.showNotification('Toutes les données ont été supprimées', 'success');
            }
        }
    }

    // Changer d'onglet
    switchTab(tabName) {
        // Désactiver tous les onglets
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.admin-tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Activer l'onglet sélectionné
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}Tab`).classList.add('active');
    }

    // Mettre à jour la dernière mise à jour
    updateLastUpdate() {
        document.getElementById('lastUpdate').textContent = new Date().toLocaleString('fr-FR');
    }

    // Afficher un modal
    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'admin-modal';
        modal.innerHTML = `
            <div class="admin-modal-content">
                <div class="admin-modal-header">
                    <h3>${title}</h3>
                    <button class="admin-modal-close">&times;</button>
                </div>
                <div class="admin-modal-body">
                    ${content}
                </div>
            </div>
        `;

        modal.querySelector('.admin-modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        document.body.appendChild(modal);
    }

    // Afficher une notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `admin-notification admin-notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Fonctions globales pour les boutons
function viewBusinessPlans() {
    const businessPlans = adminPanel.getAllBusinessPlans();
    let content = '<h4>Business Plans stockés:</h4><ul>';
    businessPlans.forEach(bp => {
        const completionRate = Object.keys(bp.data).length;
        content += `<li><strong>${bp.userName}</strong> - ${completionRate} questions remplies</li>`;
    });
    content += '</ul>';
    adminPanel.showModal('Business Plans', content);
}

function viewFinancialData() {
    adminPanel.showModal('Données Financières', '<p>Détails des modèles financiers sauvegardés...</p>');
}

function viewSWOTData() {
    adminPanel.showModal('Analyses SWOT', '<p>Détails des analyses SWOT sauvegardées...</p>');
}

function viewScenarios() {
    adminPanel.showModal('Scénarios', '<p>Détails des scénarios sauvegardés...</p>');
}

// Initialiser le panneau d'administration
const adminPanel = new AdminPanel();
