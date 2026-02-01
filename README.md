Cosmic Tools v3.0Free. Privacy-focused. Easy to use.Cosmic Tools is a specialized suite designed for Forex traders to refine their edge in the markets. Built with a "dark cosmic" aesthetic, it provides a distraction-free environment for journaling, analyzing, and calculating risk without selling user data."Trading is not just about numbers; it's about mastering the space between the charts."Features1. Trading JournalA robust, offline-first journaling solution. All data is stored locally on your device.Add Trade: Detailed entry forms supporting custom symbols, timeframes, and strategies. Includes a screenshot uploader and simplified session stats.View Trades: Advanced filtering (by PnL, Timeframe, Date, Strategy) with a drag-and-drop arrangement feature.Analytics: Deep-dive performance metrics including:Monthly & Symbol PerformanceEvolutive Winrate & Average RewardPerformance Hierarchy (Pair/Timeframe)Cumulative PnL HeatmapsAccounts Manager: Manage multiple trading accounts with JSON Import/Export functionality for backups.2. Market AnalyzerA real-time dashboard integrating low-latency widgets from TradingView and FinancialJuice.News: Live session timelines and rolling headlines.Calendar: Switchable economic calendar widgets.Market: Deep dive into specific pairs with Advanced Real-Time Charts, Mini Charts, and specific event filtering.3. Risk CalculatorA custom-built tool to instantly calculate lot sizes, risk percentages, and position limits to protect your capital.Tech Stack & Directory StructureThis project is built using React (Vite) and Tailwind CSS.Share/
  public/            # Static Assets (Images/Icons)
  src/
    assets/          # React Assets
    components/      # Reusable Components
      context/       # Global State (TradeContext)
    pages/
      analyzer/      # Market Analysis Widgets & Logic
      journal/       # Journaling Logic & Dashboard
      About.jsx      # Team & Mission
      Contact.jsx    # Contact Forms
      Home.jsx       # Main Hub
      RiskCalculator.jsx
    App.jsx          # Main Router
The TeamGherman Paul - Founder & Website Developer"Empowering traders with tools that respect their privacy."Oprea Mihail - Co-Founder & Mobile Developer"Bringing the cosmic experience to Android and iOS."Installation & SetupClone the repositorygit clone [https://github.com/YourUsername/cosmic-tools-v3.0.git](https://github.com/YourUsername/cosmic-tools-v3.0.git)
Install Dependenciescd cosmic-tools-v3.0
npm install
Run Development Servernpm run dev
Build for Productionnpm run build
Disclaimer & PrivacyPrivacy First: Cosmic Tools v3.0 operates on a local-storage model. We do not host databases containing your trade history. Your journal data lives on your browser. Please use the "Export JSON" feature in the Accounts tab to back up your data regularly.External Widgets: This application utilizes embedded widgets from TradingView and FinancialJuice. While our app is privacy-focused, interactions with these third-party widgets are subject to their respective privacy policies.Contact & CommunityWebsite Team: paulgherman29@gmail.comDiscord Community: Join the Server© 2026 Cosmic Tools v3.0 | Created with love by PaulFX
