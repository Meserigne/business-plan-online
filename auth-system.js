// Système d'authentification et de collaboration
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUserSession();
        this.createAuthUI();
        this.setupEventListeners();
    }

    // Charger la session utilisateur
    loadUserSession() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIForLoggedInUser();
        }
    }

    // Créer l'interface d'authentification
    createAuthUI() {
        const authContainer = document.createElement('div');
        authContainer.id = 'authContainer';
        authContainer.className = 'auth-container';
        
        if (!this.currentUser) {
            authContainer.innerHTML = `
                <div class="auth-buttons">
                    <button id="loginBtn" class="auth-btn auth-btn-login">
                        <i class="fas fa-sign-in-alt"></i> Se connecter
                    </button>
                    <button id="registerBtn" class="auth-btn auth-btn-register">
                        <i class="fas fa-user-plus"></i> S'inscrire
                    </button>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <div class="user-info">
                    <div class="user-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="user-details">
                        <span class="user-name">${this.currentUser.name}</span>
                        <span class="user-email">${this.currentUser.email}</span>
                    </div>
                    <div class="user-actions">
                        <button id="shareBtn" class="user-action-btn" title="Partager">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <button id="settingsBtn" class="user-action-btn" title="Paramètres">
                            <i class="fas fa-cog"></i>
                        </button>
                        <button id="logoutBtn" class="user-action-btn" title="Déconnexion">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        // Insérer dans le header
        const header = document.querySelector('.header');
        if (header) {
            header.appendChild(authContainer);
        }
    }

    setupEventListeners() {
        // Boutons d'authentification
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const shareBtn = document.getElementById('shareBtn');
        const settingsBtn = document.getElementById('settingsBtn');

        if (loginBtn) loginBtn.addEventListener('click', () => this.showLoginModal());
        if (registerBtn) registerBtn.addEventListener('click', () => this.showRegisterModal());
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());
        if (shareBtn) shareBtn.addEventListener('click', () => this.showShareModal());
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.showSettingsModal());
    }

    // Afficher le modal de connexion
    showLoginModal() {
        const modal = this.createModal('Connexion', `
            <form id="loginForm">
                <div class="form-group">
                    <label for="loginEmail">Email</label>
                    <input type="email" id="loginEmail" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Mot de passe</label>
                    <input type="password" id="loginPassword" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel">Annuler</button>
                    <button type="submit" class="btn-primary">Se connecter</button>
                </div>
            </form>
        `);

        modal.querySelector('#loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(modal);
        });

        this.showModal(modal);
    }

    // Afficher le modal d'inscription
    showRegisterModal() {
        const modal = this.createModal('Inscription', `
            <form id="registerForm">
                <div class="form-group">
                    <label for="registerName">Nom complet</label>
                    <input type="text" id="registerName" required>
                </div>
                <div class="form-group">
                    <label for="registerEmail">Email</label>
                    <input type="email" id="registerEmail" required>
                </div>
                <div class="form-group">
                    <label for="registerPassword">Mot de passe</label>
                    <input type="password" id="registerPassword" required minlength="6">
                </div>
                <div class="form-group">
                    <label for="registerCompany">Entreprise (optionnel)</label>
                    <input type="text" id="registerCompany">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel">Annuler</button>
                    <button type="submit" class="btn-primary">S'inscrire</button>
                </div>
            </form>
        `);

        modal.querySelector('#registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister(modal);
        });

        this.showModal(modal);
    }

    // Gérer la connexion
    handleLogin(modal) {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simulation d'authentification (en production, utiliser une vraie API)
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                company: user.company,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.closeModal(modal);
            this.updateUIForLoggedInUser();
            this.showNotification('Connexion réussie !', 'success');
        } else {
            this.showNotification('Email ou mot de passe incorrect', 'error');
        }
    }

    // Gérer l'inscription
    handleRegister(modal) {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const company = document.getElementById('registerCompany').value;

        // Vérifier si l'email existe déjà
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        if (users.find(u => u.email === email)) {
            this.showNotification('Cet email est déjà utilisé', 'error');
            return;
        }

        // Créer le nouvel utilisateur
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // En production, hasher le mot de passe
            company,
            registrationDate: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(users));

        // Connecter automatiquement
        this.currentUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            company: newUser.company,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.closeModal(modal);
        this.updateUIForLoggedInUser();
        this.showNotification('Inscription réussie ! Vous êtes maintenant connecté.', 'success');
    }

    // Déconnexion
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        location.reload();
    }

    // Mettre à jour l'UI pour utilisateur connecté
    updateUIForLoggedInUser() {
        // Recréer l'interface d'authentification
        const authContainer = document.getElementById('authContainer');
        if (authContainer) {
            authContainer.remove();
        }
        this.createAuthUI();
        this.setupEventListeners();

        // Ajouter des fonctionnalités collaboratives
        this.enableCollaborativeFeatures();
    }

    // Activer les fonctionnalités collaboratives
    enableCollaborativeFeatures() {
        // Ajouter un indicateur de sauvegarde cloud
        this.addCloudSaveIndicator();
        
        // Synchroniser les données avec le "cloud" (localStorage avec prefix utilisateur)
        this.syncUserData();
    }

    // Ajouter un indicateur de sauvegarde cloud
    addCloudSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'cloud-save-indicator';
        indicator.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <span>Sauvegardé</span>
        `;
        
        const header = document.querySelector('.header');
        if (header) {
            header.appendChild(indicator);
        }

        // Simuler la synchronisation
        setInterval(() => {
            this.syncUserData();
            indicator.classList.add('syncing');
            setTimeout(() => {
                indicator.classList.remove('syncing');
            }, 1000);
        }, 30000); // Sync toutes les 30 secondes
    }

    // Synchroniser les données utilisateur
    syncUserData() {
        if (!this.currentUser) return;

        const userDataKey = `userData_${this.currentUser.id}`;
        const userData = {
            businessPlan: localStorage.getItem('businessPlan60Questions'),
            financialData: localStorage.getItem('financialModelData'),
            swotAnalysis: localStorage.getItem('swotAnalysis'),
            scenarios: localStorage.getItem('savedScenarios'),
            lastSync: new Date().toISOString()
        };

        localStorage.setItem(userDataKey, JSON.stringify(userData));
    }

    // Afficher le modal de partage
    showShareModal() {
        const modal = this.createModal('Partager le Business Plan', `
            <div class="share-options">
                <div class="share-option">
                    <i class="fas fa-link"></i>
                    <div>
                        <h4>Lien de partage</h4>
                        <p>Générer un lien pour partager votre business plan</p>
                        <button class="btn-generate-link">Générer le lien</button>
                    </div>
                </div>
                <div class="share-option">
                    <i class="fas fa-users"></i>
                    <div>
                        <h4>Inviter des collaborateurs</h4>
                        <p>Inviter des personnes à collaborer sur votre projet</p>
                        <input type="email" placeholder="Email du collaborateur">
                        <button class="btn-invite">Inviter</button>
                    </div>
                </div>
                <div class="share-option">
                    <i class="fas fa-eye"></i>
                    <div>
                        <h4>Mode lecture seule</h4>
                        <p>Partager en lecture seule pour présentation</p>
                        <button class="btn-readonly">Créer lien lecture</button>
                    </div>
                </div>
            </div>
        `);

        this.showModal(modal);
    }

    // Afficher le modal des paramètres
    showSettingsModal() {
        const modal = this.createModal('Paramètres', `
            <div class="settings-sections">
                <div class="settings-section">
                    <h4>Profil</h4>
                    <div class="form-group">
                        <label>Nom</label>
                        <input type="text" value="${this.currentUser.name}">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" value="${this.currentUser.email}">
                    </div>
                    <div class="form-group">
                        <label>Entreprise</label>
                        <input type="text" value="${this.currentUser.company || ''}">
                    </div>
                </div>
                <div class="settings-section">
                    <h4>Préférences</h4>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" checked> Notifications par email
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" checked> Sauvegarde automatique
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox"> Mode sombre
                        </label>
                    </div>
                </div>
                <div class="settings-section">
                    <h4>Données</h4>
                    <button class="btn-export-data">Exporter mes données</button>
                    <button class="btn-delete-account">Supprimer le compte</button>
                </div>
            </div>
        `);

        this.showModal(modal);
    }

    // Créer un modal générique
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-content">
                <div class="auth-modal-header">
                    <h3>${title}</h3>
                    <button class="auth-modal-close">&times;</button>
                </div>
                <div class="auth-modal-body">
                    ${content}
                </div>
            </div>
        `;

        // Événements de fermeture
        modal.querySelector('.auth-modal-close').addEventListener('click', () => this.closeModal(modal));
        modal.querySelector('.btn-cancel')?.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });

        return modal;
    }

    // Afficher un modal
    showModal(modal) {
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    }

    // Fermer un modal
    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
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
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialiser le système d'authentification
document.addEventListener('DOMContentLoaded', function() {
    window.authSystem = new AuthSystem();
});
