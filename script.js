// Multi-language support
const translations = {
    en: {
        appTitle: "Piscine de Horsdorf",
        subtitle: "Ticket Scanner",
        scanInstruction: "Position ticket in the frame",
        startCamera: "Start Camera",
        scanTicket: "Scan Ticket",
        scanSuccess: "✅ Valid ticket! Welcome to the pool!",
        scanFailure: "❌ Invalid ticket! Please try again.",
        cameraError: "Camera access denied or not available",
        cameraStarted: "Camera started successfully",
        cameraStopped: "Camera stopped"
    },
    de: {
        appTitle: "Piscine de Horsdorf",
        subtitle: "Ticket Scanner",
        scanInstruction: "Ticket im Rahmen positionieren",
        startCamera: "Kamera starten",
        scanTicket: "Ticket scannen",
        scanSuccess: "✅ Gültiges Ticket! Willkommen im Freibad!",
        scanFailure: "❌ Ungültiges Ticket! Bitte versuchen Sie es erneut.",
        cameraError: "Kamerazugriff verweigert oder nicht verfügbar",
        cameraStarted: "Kamera erfolgreich gestartet",
        cameraStopped: "Kamera gestoppt"
    },
    fr: {
        appTitle: "Piscine de Horsdorf",
        subtitle: "Scanner de billets",
        scanInstruction: "Positionnez le billet dans le cadre",
        startCamera: "Démarrer la caméra",
        scanTicket: "Scanner le billet",
        scanSuccess: "✅ Billet valide! Bienvenue à la piscine!",
        scanFailure: "❌ Billet invalide! Veuillez réessayer.",
        cameraError: "Accès à la caméra refusé ou non disponible",
        cameraStarted: "Caméra démarrée avec succès",
        cameraStopped: "Caméra arrêtée"
    }
};

class TicketScanner {
    constructor() {
        this.currentLanguage = 'en';
        this.isScanning = false;
        this.stream = null;
        this.successRate = 0.75; // 3:1 ratio for success
        
        this.initializeElements();
        this.setupEventListeners();
        this.initializeAudio();
        this.setLanguage('en');
    }

    initializeElements() {
        this.video = document.getElementById('camera-preview');
        this.startCameraBtn = document.getElementById('start-camera-btn');
        this.scanBtn = document.getElementById('scan-btn');
        this.resultMessage = document.getElementById('result-message');
        this.resultText = document.getElementById('result-text');
        this.cameraOverlay = document.getElementById('camera-overlay');
    }

    setupEventListeners() {
        this.startCameraBtn.addEventListener('click', () => this.toggleCamera());
        this.scanBtn.addEventListener('click', () => this.performScan());
        
        // Handle orientation changes on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                if (this.stream) {
                    this.adjustVideoDisplay();
                }
            }, 500);
        });
    }

    initializeAudio() {
        // Create audio context for better mobile support
        this.audioContext = null;
        
        // Initialize audio on first user interaction
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    }

    async playSuccessSound() {
        this.playTone(800, 0.3, 'square'); // High pitched success tone
    }

    async playFailureSound() {
        this.playTone(200, 0.5, 'sawtooth'); // Low pitched failure tone
    }

    playTone(frequency, duration, waveType = 'sine') {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = waveType;

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    async toggleCamera() {
        if (this.stream) {
            this.stopCamera();
        } else {
            await this.startCamera();
        }
    }

    async startCamera() {
        try {
            // Request camera with mobile-optimized constraints
            const constraints = {
                video: {
                    facingMode: 'environment', // Use back camera on mobile
                    width: { ideal: 1280, max: 1920 },
                    height: { ideal: 720, max: 1080 }
                },
                audio: false
            };

            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = this.stream;
            
            this.video.onloadedmetadata = () => {
                this.video.play();
                this.adjustVideoDisplay();
            };

            this.startCameraBtn.innerHTML = `<span>Stop Camera</span>`;
            this.scanBtn.disabled = false;
            this.cameraOverlay.style.display = 'flex';
            
            this.showMessage('cameraStarted', 'success');

        } catch (error) {
            console.error('Camera error:', error);
            this.showMessage('cameraError', 'failure');
        }
    }

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        this.video.srcObject = null;
        this.startCameraBtn.innerHTML = `<span id="start-camera-text">${translations[this.currentLanguage].startCamera}</span>`;
        this.scanBtn.disabled = true;
        this.cameraOverlay.style.display = 'flex';
        
        this.showMessage('cameraStopped', 'success');
    }

    adjustVideoDisplay() {
        // Ensure video fills container properly on mobile
        if (this.video.videoWidth && this.video.videoHeight) {
            const videoAspect = this.video.videoWidth / this.video.videoHeight;
            const containerAspect = this.video.clientWidth / this.video.clientHeight;
            
            if (videoAspect > containerAspect) {
                this.video.style.objectFit = 'cover';
            } else {
                this.video.style.objectFit = 'cover';
            }
        }
    }

    async performScan() {
        if (this.isScanning) return;
        
        this.isScanning = true;
        this.scanBtn.disabled = true;
        this.scanBtn.innerHTML = '<span>Scanning...</span>';

        // Add scanning animation
        this.cameraOverlay.style.background = 'rgba(255,255,255,0.2)';
        
        // Simulate scanning delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Random success/failure with 3:1 ratio
        const isSuccess = Math.random() < this.successRate;
        
        if (isSuccess) {
            this.showMessage('scanSuccess', 'success');
            await this.playSuccessSound();
        } else {
            this.showMessage('scanFailure', 'failure');
            await this.playFailureSound();
        }

        // Reset UI
        this.cameraOverlay.style.background = 'rgba(0,0,0,0.3)';
        this.scanBtn.innerHTML = `<span id="scan-text">${translations[this.currentLanguage].scanTicket}</span>`;
        this.scanBtn.disabled = false;
        this.isScanning = false;
    }

    showMessage(messageKey, type) {
        const message = translations[this.currentLanguage][messageKey];
        this.resultText.textContent = message;
        this.resultMessage.className = `result-message ${type}`;
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.resultMessage.className = 'result-message hidden';
        }, 3000);
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        this.updateUI();
        
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
    }

    updateUI() {
        const t = translations[this.currentLanguage];
        
        document.getElementById('subtitle').textContent = t.subtitle;
        document.getElementById('scan-instruction').textContent = t.scanInstruction;
        
        if (!this.stream) {
            document.getElementById('start-camera-text').textContent = t.startCamera;
        }
        
        if (document.getElementById('scan-text')) {
            document.getElementById('scan-text').textContent = t.scanTicket;
        }
    }
}

// Global function for language switching
function setLanguage(lang) {
    if (window.ticketScanner) {
        window.ticketScanner.setLanguage(lang);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ticketScanner = new TicketScanner();
    
    // Detect device language and set default
    const browserLang = navigator.language.substring(0, 2);
    if (translations[browserLang]) {
        window.ticketScanner.setLanguage(browserLang);
    }
});

// Handle page visibility changes to manage camera
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.ticketScanner && window.ticketScanner.stream) {
        // Optionally pause camera when tab is hidden
        // window.ticketScanner.stopCamera();
    }
});