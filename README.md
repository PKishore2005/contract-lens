# Contract Lens - AI Legal Analysis Platform

A sophisticated AI-powered legal document analyzer with dual modules for contract analysis and scam detection. Built with React, TypeScript, Tailwind CSS, and Google Gemini AI.

## 🎭 Demo Mode

Contract Lens includes a **Demo Mode** that allows you to explore all features without setting up the Google Gemini API. This is perfect for:

- **Trying the application** before committing to API setup
- **Development and testing** without API costs
- **Demonstrations** and presentations

### Demo Mode Features:
- ✅ **Full UI Experience**: All components and interactions work perfectly
- ✅ **Sample Analysis Results**: Realistic contract and scam analysis examples
- ✅ **Multilingual Support**: Demo content available in all 12 supported languages
- ✅ **Responsive Design**: Test mobile and desktop layouts
- ✅ **No API Required**: Works immediately without any configuration

### Switching to Real AI Analysis:
1. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file: `VITE_API_KEY=your_api_key_here`
3. Restart the development server
4. The app will automatically switch to real AI analysis

The **API Test** panel (bottom-right corner) shows your current status and provides setup guidance.

---

## 🚀 Features

### 📄 Contract Lens Module
- **Smart Legal Analysis**: AI-powered contract review using Google Gemini
- **Risk Assessment**: 0-100 risk scoring with visual gauge
- **Plain English Translation**: Complex legalese converted to understandable language
- **Suggested Fixes**: Actionable recommendations for problematic clauses
- **Multi-format Support**: PDF, images, and DOCX files

### 🛡️ Scam Shield Module
- **Real-time Fraud Detection**: Live analysis of suspicious content
- **Dual Input Modes**: Screenshot upload or URL scanning
- **Web Grounding**: Google Search integration for verification
- **Visual Cue Analysis**: Identifies psychological manipulation tactics
- **Verdict System**: Clear SAFE/DANGER/CAUTION classifications

### 🌍 Global-First Design
- **12 Languages**: English, Spanish, Hindi, Tamil, French, German, Chinese, Japanese, Arabic, Portuguese, Bengali, Russian
- **17+ Jurisdictions**: Localized legal context and emergency resources
- **Smart Defaults**: Automatic jurisdiction selection based on language
- **Emergency Resources**: Direct links to cyber crime reporting centers

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Build Tool**: Vite 4.4
- **AI Integration**: Google Generative AI (Gemini 1.5 Flash)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Mobile-First**: Responsive design with PWA capabilities

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Google Gemini API key

### Setup Steps

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd contract-lens
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env and add your Google Gemini API key
   VITE_API_KEY=your_google_gemini_api_key_here
   ```

3. **Get Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with Google account
   - Create new API key
   - Copy to `.env` file

4. **Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

5. **Production Build**
   ```bash
   npm run build
   npm run preview
   ```

## 🎯 Usage Guide

### Contract Analysis
1. Navigate to "Contract Lens" module
2. Upload PDF, image, or DOCX contract
3. Select language and jurisdiction
4. Click "Run Analysis"
5. Review risk score and red flag details
6. Implement suggested fixes

### Scam Detection
1. Navigate to "Scam Shield" module
2. Choose input method:
   - **Screenshot**: Upload suspicious images
   - **URL Check**: Paste suspicious links
3. Click "Live Scan URL" or "Run Analysis"
4. Review verdict and evidence sources
5. Check visual manipulation cues

### Language & Jurisdiction
- Use header dropdowns to change settings
- Language changes auto-update jurisdiction
- Emergency resources update accordingly

## 🏗️ Project Structure

```
contract-lens/
├── src/
│   ├── components/          # React components
│   │   ├── GlobalSettings.tsx
│   │   ├── FileUpload.tsx
│   │   ├── ContractResult.tsx
│   │   ├── ScamResult.tsx
│   │   ├── RiskGauge.tsx
│   │   └── ScanningOverlay.tsx
│   ├── services/           # Business logic
│   │   └── geminiService.ts
│   ├── utils/              # Utilities
│   │   └── translations.ts
│   ├── App.tsx             # Main component
│   ├── types.ts            # Type definitions
│   └── index.css           # Global styles
├── public/                 # Static assets
├── dist/                   # Build output
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🔧 Configuration

### Environment Variables
- `VITE_API_KEY`: Google Gemini API key (required)

### Tailwind CSS
- Custom animations and components
- Dark theme optimized
- Mobile-first responsive design
- Custom scrollbars and utilities

### TypeScript
- Strict mode enabled
- Path aliases configured (`@/` → `src/`)
- Vite environment types included

## 🚀 Performance Optimizations

### Build Optimizations
- **Code Splitting**: Vendor, UI, and AI chunks separated
- **Tree Shaking**: Unused code eliminated
- **Asset Optimization**: Images and fonts optimized
- **Gzip Compression**: ~70% size reduction

### Runtime Optimizations
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Debounced Inputs**: Reduced API calls
- **Efficient Re-renders**: Optimized state management

### Bundle Analysis
```bash
npm run build
# Check dist/ folder for chunk sizes
# Vendor: ~141KB (React, React-DOM)
# UI: ~367KB (Lucide, Recharts)  
# AI: ~27KB (Google Generative AI)
# Main: ~52KB (Application code)
```

## 🧪 Testing & Verification

### Manual Testing Checklist
- [ ] Home page loads with dark theme
- [ ] Language/jurisdiction dropdowns work
- [ ] Contract upload and analysis
- [ ] Scam detection (both modes)
- [ ] Mobile responsive design
- [ ] All 12 languages functional
- [ ] Emergency resources links work

### Performance Testing
```bash
# Build size analysis
npm run build

# Development server
npm run dev

# Type checking
npm run type-check
```

## 🔒 Security & Privacy

- **No Data Persistence**: Files processed client-side only
- **Secure API Calls**: Direct Google Gemini integration
- **Environment Variables**: API keys properly secured
- **HTTPS Ready**: Production deployment ready
- **Content Security**: XSS protection enabled

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 📱 Mobile Support

- **Progressive Web App**: Installable on mobile devices
- **Touch Optimized**: Finger-friendly interface
- **Bottom Navigation**: Mobile-specific navigation
- **Safe Area Support**: Notch and gesture compatibility
- **Offline Capable**: Service worker integration ready

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README
- **Issues**: GitHub Issues tab
- **API Issues**: [Google AI Studio Support](https://makersuite.google.com/)
- **Emergency Resources**: Built-in per jurisdiction

## 🔄 Version History

- **v1.0.0**: Initial release with full feature set
- **v1.1.0**: Performance optimizations and mobile improvements
- **v1.2.0**: Additional language support and UI enhancements

---

**Built with ❤️ for global legal accessibility and fraud prevention**