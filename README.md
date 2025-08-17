# Piscine de Horsdorf - Ticket Scanner

A fun, browser-based ticket scanner app for the fictional "Piscine de Horsdorf" swimming pool. This application provides an entertaining simulation of a ticket validation system without actually validating real tickets.

## 🏊‍♀️ Features

- **Camera Integration**: Uses device camera to "scan" tickets
- **Multi-language Support**: Available in English, German, and French
- **Mobile Optimized**: Designed to work perfectly on iPhone and other mobile devices
- **Audio Feedback**: Provides success/failure sounds with a 3:1 success ratio
- **Swimming Pool Theme**: Beautiful aquatic design with blue gradient backgrounds
- **No Server Required**: Runs completely in the browser

## 🚀 Live Demo

The app is automatically deployed to GitHub Pages: [https://danielmeixner.github.io/Freibad-Scanner/](https://danielmeixner.github.io/Freibad-Scanner/)

## 📱 How to Use

1. **Open the app** in your web browser (preferably on a mobile device)
2. **Select your language** using the language buttons (EN/DE/FR)
3. **Start the camera** by clicking the "Start Camera" button
4. **Grant camera permissions** when prompted by your browser
5. **Position a ticket** (or any object) in the scanning frame
6. **Tap "Scan Ticket"** to perform the scan
7. **Listen for audio feedback** - you'll hear either a success or failure sound

## 🎯 Purpose

This is a **fun demonstration app** that simulates a ticket scanner experience. It doesn't actually validate real tickets or connect to any database. The app randomly generates success/failure results with a 75% success rate to make the experience entertaining.

Perfect for:
- Demonstrating camera API usage
- Mobile web development showcase
- Entertainment at events
- Learning progressive web app concepts

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Structure and semantic markup
- **CSS3**: Responsive design with swimming pool theming
- **Vanilla JavaScript**: Camera API, audio synthesis, and app logic
- **GitHub Actions**: Automated deployment to GitHub Pages

### Browser Compatibility
- Chrome/Safari on iOS (iPhone/iPad)
- Chrome/Firefox/Safari on Android
- Modern desktop browsers
- Requires HTTPS for camera access (automatically provided by GitHub Pages)

### Camera Features
- Uses `getUserMedia()` API for camera access
- Optimized for mobile devices with rear camera preference
- Responsive video display that adapts to screen orientation
- Graceful fallback when camera is not available

### Audio System
- Uses Web Audio API for sound generation
- Generates tones programmatically (no audio files needed)
- Mobile-optimized audio playback
- Different tones for success (high pitch) and failure (low pitch)

## 🔧 Development

### Local Development
1. Clone the repository
2. Serve the files using any HTTP server (required for camera access)
3. For example, using Python: `python -m http.server 8000`
4. Open `http://localhost:8000` in your browser

### File Structure
```
├── index.html          # Main HTML structure
├── styles.css          # Swimming pool themed CSS
├── script.js           # App functionality and camera handling
├── .github/workflows/
│   └── deploy.yml      # GitHub Actions deployment
└── README.md           # This file
```

## 🌍 Languages

The app supports three languages with automatic browser language detection:
- **English** (EN) - Default
- **German** (DE) - Deutsch
- **French** (FR) - Français

## 🔒 Privacy

- The app only accesses your camera with explicit permission
- No images or video are stored or transmitted anywhere
- Everything runs locally in your browser
- No personal data is collected or processed

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Fun Fact

"Piscine de Horsdorf" is a fictional swimming pool name that combines French (piscine = swimming pool) with a German-sounding location name, reflecting the multilingual nature of the app!
