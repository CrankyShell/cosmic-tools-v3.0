Cosmic Tools v3.0

Cosmic Tools is a comprehensive, privacy-centric suite of utilities designed to assist Forex traders in refining their market execution and data analysis. The platform is built on the principle of transparency and user data sovereignty, ensuring that all trading-sensitive information remains stored locally on the user's device.

Core Philosophy

The project was founded by active traders to address the need for accessible, high-quality analytical tools that do not compromise user privacy. By utilizing local browser storage, Cosmic Tools provides a secure environment for traders to document their journey without external data collection or server-side vulnerabilities.

Primary Tools

1. Trading Journal

A multi-tabbed interface designed for high-performance logging and retrospective analysis.

Trade Management: Supports custom symbol entries, timeframe tracking, and strategy categorization (Candle close, Flip, Candle Break, and Custom).

Media Integration: Dedicated section for trade screenshots to provide visual context for every setup.

Performance Analytics: Features 16 distinct analytical metrics including advanced equity curves, monthly performance histograms, and win-rate distribution by day of the week.

Account Portability: Built-in JSON export and import functionality allows users to back up their data or migrate between devices without a centralized database.

2. Market Analyzer

A real-time data hub integrating professional market feeds for comprehensive situational awareness.

News Aggregation: Real-time headlines and top stories powered by FinancialJuice and TradingView widgets.

Economic Calendar: High-impact event tracking with customizable widget providers to suit user preference.

Technical Analysis: Advanced real-time charting and mini-charts synchronized to user-selected currency pairs.

3. Risk Calculator

A precision tool for calculating position sizing and risk-to-reward ratios, ensuring consistent capital management across various market conditions.

Technical Specifications

Architecture: React.js framework with Vite for optimized build performance.

Styling: Tailwind CSS implementation with a custom dark-themed space aesthetic.

Data Layer: LocalStorage API for client-side data persistence.

Integrations: Professional-grade financial widgets from TradingView and FinancialJuice.

Design Assets: Custom Bootstrap Icons and optimized graphical assets.

Directory Structure

public/
  ├── analyzer.png
  ├── background.jpg
  ├── journal.png
  ├── logo.png
  ├── riskcalc.png
  └── vite.svg
src/
  ├── assets/
  │   └── react.svg
  ├── components/
  │   ├── context/
  │   │   └── TradeContext.jsx
  │   ├── CalendarView.jsx
  │   ├── EditTradeModal.jsx
  │   └── Layout.jsx
  ├── pages/
  │   ├── analyzer/
  │   │   ├── AnalyzerLayout.jsx
  │   │   ├── CalendarTab.jsx
  │   │   ├── LiveSessionTimeline.jsx
  │   │   ├── MarketTab.jsx
  │   │   └── NewsTab.jsx
  │   ├── journal/
  │   │   ├── Accounts.jsx
  │   │   ├── AddTradeTab.jsx
  │   │   ├── Analytics.jsx
  │   │   ├── Dashboard.jsx
  │   │   ├── JournalLayout.jsx
  │   │   └── ViewTrades.jsx
  │   ├── About.jsx
  │   ├── Contact.jsx
  │   ├── Home.jsx
  │   └── RiskCalculator.jsx
  ├── App.css
  ├── App.jsx
  ├── index.css
  └── main.jsx
eslint.config.js
index.html
package.json
postcss.config.js
tailwind.config.js
vite.config.js


Team and Development

Gherman Paul – Founder and Lead Website Developer.

Oprea Mihail – Co-Founder and Mobile Application Developer (iOS/Android).

Disclaimer

Cosmic Tools provides financial tools for educational and organizational purposes only. This platform utilizes third-party widgets for market data. Users are encouraged to review the internal Disclaimer and Privacy Policy pages regarding the use of external data feeds and local storage protocols.

© 2026 Cosmic Tools v3.0 | Created by PaulFX