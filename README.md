# **Cosmic Tools v3.0** 
**Free. Privacy-focused. Easy to use.** 

Cosmic Tools is a specialized suite designed for Forex traders to refine their edge in the markets. Built with a distinctive "dark cosmic" aesthetic, it provides a distraction-free environment for journaling, analyzing, and calculating risk without monetizing user data. *Trading is not just about numbers; it's about mastering the space between the charts.* 
## **Features** 
1. ### **Trading Journal** 
A robust, offline-first journaling solution. **All data is stored locally on your device.** 

- **Add Trade:** Detailed entry forms supporting custom symbols, timeframes, and strategies. Includes a screenshot uploader and simplified session statistics. 
- **View Trades:** Advanced filtering (by PnL, Timeframe, Date, Strategy) with a drag-and-drop arrangement feature. 
- **Analytics:** Deep-dive performance metrics including: 
  - Monthly & Symbol Performance 
  - Evolutive Winrate & Average Reward 
  - Performance Hierarchy (Pair/Timeframe) 
  - Cumulative PnL Heatmaps 
- **Accounts Manager:** Manage multiple trading accounts with JSON Import/Export functionality for secure backups. 
2. ### **Market Analyzer** 
A real-time dashboard integrating low-latency widgets from **TradingView** and **FinancialJuice**. 

- **News:** Live session timelines and rolling headlines. 
- **Calendar:** Switchable economic calendar widgets. 
- **Market:** Deep dive into specific pairs with Advanced Real-Time Charts, Mini Charts, and specific event filtering. 
3. ### **Risk Calculator** 
A custom-built tool to instantly calculate lot sizes, risk percentages, and position limits to protect capital efficiently. 
## **Tech Stack & Directory Structure** 
This project is built using **React (Vite)** and **Tailwind CSS**. Share/ 

`  `public/            # Static Assets (Images/Icons) 

`  `src/ 

`    `assets/          # React Assets 

`    `components/      # Reusable Components 

`      `context/       # Global State (TradeContext) 

`    `pages/ 

`      `analyzer/      # Market Analysis Widgets & Logic       journal/       # Journaling Logic & Dashboard 

`      `About.jsx      # Team & Mission 

`      `Contact.jsx    # Contact Forms 

`      `Home.jsx       # Main Hub 

`      `RiskCalculator.jsx 

`    `App.jsx          # Main Router 
## **The Team** 
**Gherman Paul** - *Founder & Website Developer* "Empowering traders with tools that respect their privacy." **Oprea Mihail** - *Co-Founder & Mobile Developer* "Bringing the cosmic experience to Android and iOS." 
## **Installation & Setup** 
1. **Clone the repository** 

   git clone [https://github.com/YourUsername/cosmic-tools-v3.0.git](https://github.com/YourUsern ame/cosmic-tools-v3.0.git) 

2. **Install Dependencies** cd cosmic-tools-v3.0 npm install 
2. **Run Development Server** npm run dev 
2. **Build for Production** npm run build 
## **Disclaimer & Privacy** 
**Privacy First:** Cosmic Tools v3.0 operates on a local-storage model. We do not host databases containing your trade history. Your journal data lives on your browser. Please use the "Export JSON" feature in the Accounts tab to back up your data regularly. 

**External Widgets:** This application utilizes embedded widgets from TradingView and FinancialJuice. While our app is privacy-focused, interactions with these third-party widgets 

are subject to their respective privacy policies. 
## **Contact & Community** 
- **Website Team:** paulgherman29@gmail.com 
- **Discord Community:** [Join the Server](https://discord.gg/Q5GQk6Gb6X) 

© 2026 Cosmic Tools v3.0 | Created with love by PaulFX 
