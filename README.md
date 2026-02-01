# Cosmic Tools

**Cosmic Tools** is a free, privacy-focused trading toolkit built by traders, for traders.
It is designed to help forex traders journal their trades, analyze performance, follow market conditions, and manage risk — all without collecting user data or relying on paid APIs.

The project combines a modern, dark, space-inspired interface with powerful local-first tools that work entirely in the browser.

---

## Vision & Purpose

After three years of active forex trading, the goal behind Cosmic Tools is simple:

* Improve personal trading discipline and performance
* Make professional-grade trading tools accessible to everyone
* Keep user data private, local, and under full user control
* Remove unnecessary complexity while maintaining analytical depth

Cosmic Tools is built as a long-term project, with both a web platform and a future mobile application.

---

## Key Principles

* **Free to use**
* **Privacy-first** (no cloud storage, no accounts, no tracking)
* **Local storage only**
* **Performance-optimized**
* **Clear, trader-oriented UI**
* **No paid or restrictive APIs**

---

## Tech Stack

* **Frontend Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **State Management:** React Context
* **Charts & Market Data:** TradingView widgets, FinancialJuice widgets
* **Storage:** Browser Local Storage (JSON-based)
* **Icons:** Bootstrap Icons

---

## Visual Identity

* Dark, cosmic, space-themed UI
* Background image: `background.jpg`

  * Candlestick chart in space
  * Low opacity for subtle visual depth
* Logo: `logo.png`
* Custom Bootstrap Icons
* Consistent watermark on all pages:

```
© 2026 Cosmic Tools v3.0 | Created with love by PaulFX
```

---

## Developers

* **Gherman Paul**
  Website Developer – Founder

* **Oprea Mihail**
  Android & iOS App Developer – Co-Founder

---

## Application Structure

### Main Hub (Landing Page)

The homepage acts as both a landing page and a router to all tools.

Features:

* Short project description and mission
* Overview of all three tools
* Individual tool cards with:

  * Title
  * Short description
  * Custom image
  * Navigation button
* About section with link to About page
* Contact call-to-action leading to Contact page

---

## Pages Overview

### About Page

* Project purpose and philosophy
* Team presentation section:

  * Two team members
  * Motto quote
  * Short personal description
  * Social media links
* Project motivation section with persuasive copy
* FAQ section (10 questions, editable later)

---

### Contact Page

* Website Team contact form

  * Email: `paulgherman29@gmail.com`
* App Team contact form

  * Email to be added later
* Discord community link:
  [https://discord.gg/Q5GQk6Gb6X](https://discord.gg/Q5GQk6Gb6X)

---

## Tools

## 1. Trading Journal

**Image:** `journal.png`

A full-featured local trading journal designed for deep analysis and discipline.

### Core Features

* Fully local data storage
* Optimized for smooth performance
* Multiple accounts support
* Advanced analytics
* Screenshot-based trade reviews

---

### Tabs

### a) Add Trade

#### Trade Information

* Trade Type: Buy / Sell
* Symbol:

  * Presets and custom entries
  * Must contain `/`
  * Stored and reused
* Timeframe:

  * Numeric or text input (`15`, `15min`)
  * Stored in `min` format
* Entry Strategy:

  * Candle Close
  * Flip
  * Candle Break
  * Custom (stored locally)
* Exit Strategy:

  * Take Profit (TP)
  * Stop Loss (SL)
  * Breakeven (BE)
  * Decision
* PnL (positive or negative numeric)
* Date picker
* Trade comment
* Save Trade
* Clear Form
* Withdrawal:

  * Amount
  * Date
  * Comment

#### Trade Screenshot

* Click-to-upload image
* Live preview
* Replaceable on click

#### Simplified Statistics

* Equity curve with:

  * Starting balance
  * Highest balance
  * Lowest balance
  * Current balance
* Cumulative PnL candlestick chart
* Up to 4 custom statistics
* Hover-based remove button

---

### b) View Trades

#### Filters

* Symbol
* Trade Type
* Timeframe
* Date (Newest, Oldest, Custom range)
* Profit order
* Exit Strategy order
* Custom drag-and-drop arrangement
* Delete trades with confirmation flow

#### Statistics

* Trade count
* Total PnL
* Win rate
* Average PnL

#### Trades List

* Trade cards with:

  * Screenshot preview
  * Trade details
* Click image to enlarge
* Click trade to open detailed side panel
* Detailed view includes:

  * Full trade info
  * Screenshot
  * Equity curve up to that trade

---

### c) Analytics

The most advanced section of the journal.

Includes:

* Summary statistics
* Advanced interactive equity curve
* Monthly performance
* Symbol performance
* Entry strategy performance
* Timeframe performance
* Trade type performance
* Cumulative PnL (multiple views)
* Average reward over time
* Evolutive win rate
* Day-of-week performance
* Hourly PnL
* Performance hierarchy by pair and timeframe

Accuracy, clarity, and usability are top priorities.

---

### d) Accounts

* Create multiple accounts
* Edit or delete accounts with confirmation
* Import / export JSON backups
* Fully portable local data

---

## 2. Analyzer

**Image:** `analyzer.png`

A real-time market analysis tool using embedded widgets.

### Tabs

### a) News

* Live session timelineCreate me a readme file based on this description/promp I used when creating the project:


I am a trader on the forex markets. I have been trading for 3 years, and I want to improve my skills in trading and help others trade easier.

Not only that, but I want to create a website with 3 tools designed for traders.

These tools will be free, privacy focused and easy to use.

I will list you the requirements for this project:


Name: Cosmic Tools

Style: 

-dark, cosmic, space, stars themed

-The background will have a with a trading view chart image I will add, that will have a low opacity level, so the candlesticks will be visible.

The background needs to look like a candlestick chart in space. The image will be named background.jpg

I also have a logo for the website, use it accordinglly: logo.png

-Custom icons from bootstrap icons.

Developers:

-Gherman Paul - Website developer - Founder

-Oprea Mihail - Android and iOS app developer - Co-Founder 

Important! - I want a small watermark on every page of the website. This watermark will be:

"© 2026 Cosmic Tools v3.0 | Created with love by PaulFX"


1. A main hub acting as a router to the 3 tools, and as a landing page for users.

- It will have a short description of the project and will help traders understand why we created this website and how it can help them.

- It will have the 3 tools listed, each with their own button that sends the user to the tool, a short description, a title and a custom photo that I will create.

- It will have a small about section with a button that sends the users to the about page.

- It will have a Contact CTA button that sends the user to the contact page.


2. An About page with a description about the purpose of the project.

- I want a short section that presents the people working on the project. It's going to be me and my friend, so two people. Each of us will have a small motto quote, a short description of ourselves and a couple of links to our social media profiles.

- Furthermore, I want another section designed to express the reason and purpose of the project, with a nicely crafted text that makes users want to use our tools.

- I want a section with questions and answers. You can add 10 of these, and we will update them accordingly later.


3. A Contact page

- A section where users can send emails to our team. This section will be split in two. We will have an email form for the website team and an email form for the app team. (Yes we are working on an app too)

Website Team: paulgherman29@gmail.com

App team: no email for now

- A discord link to my discord group: https://discord.gg/Q5GQk6Gb6X


4. The first tool - Trading Journal - image: journal.png

This will be a bit complicated to create, but here are the requirements and I don't want you to miss any of them.

- The tool will consist of 4 tabs, each with their own purpose

- The tool will store the data locally on the user's browser.

- The tool will be optimized for smooth operation.

a) The "Add Trade" tab:

*It will consist of 3 separate sections:

1. Trade information section

>Trade type - Buy/Sell

>Symbol - i.e. XAU/USD, EUR/USD, USD/JPY

This input will also be able to take custom entries, but the user must use a "/" when adding a pair. The pair entered by the user will be remembered and stored, and will show up in a drop-down menu when the Symbol input is clicked or hovered.

>Timeframe - i.e. 5min, 15min, 1h, 4h

This input will be similar to the Symbol input, allowing custom entries by the user. The user can wither input the timeframe as a simple number, "15" meaning 15min timeframe for example, or can input the timeframe as a number followed by "min" ("15min"). The timeframes will be stored just like the Symbols, and will show up in number+text format, meaning with the "min" extension.

>Entry Strategy - This will have 4 options: Candle close, Flip, Candle Break, with the 4th option being a custom input. When the user selects "Custom", the Entry Strategy input will allow the trader to enter a custom entry strategy. This will be stored in local data too, and remembered for future use by the trader.

>Exit Strategy - This will have 4 options: TP or Take Profit, SL or Stop Loss, BE or Breakeven, and Decision

>PnL - This input will allow an entry of this type: 100 (meaning 100 dollars) or -100 (meaning -100 dollars). 

>Date picker - This will be a date picker for the trade. The user can either enter the date manually or click a calendar icon that will show a date picker for easier use.

>Comment - This input allows the user to enter a comment for that particular trade, expressing his opinions on the setup, mistakes he might have made and any other kind of information they want.

>Save trade button - This button saves and logs the trade

>Clear button - This button will clear the form

>Withdrawal - This button will record a withdrawal from the user's account. When the button is clicked, there will be a popup with 3 inputs: Withdrawal amount in dollars, date, comment.

2. Trade screenshot section

>The user will be able to record a screenshot of their trade by clicking a container that opens their file explorer, letting them select a photo.

>When the file is selected, the container will have the preview photo the user selected.

>The user can change the photo by clicking the container again.

3. Simplified Statistics section

>Equity curve with a simple green or red line depending on win or loss. It will also have a Starting Balance line, highest balance line, lowest balance line, current balance line.

>Cummulative PnL represented by a candlestick chart. Make this one look great please. Make sure to make the whicks and body of the candles accurately represent the actual PnL.

>"Add" button, that lets the user add other statistics. The maximum allowed statitstics in this section will be 4.

>Each statistic container will have a small "X" button on the top right corner that will remove that statistic. The X will only appear on hover of the container.


b)The "View Trades" tab

*This tab will also have 3 simple sections:

1. The filters section

>Symbol filter

>Trade Type filter

>Timeframe filter

>Date filter:

-Newest

-Oldest

-Custom period (The user will use a date selector)

>Profit filer:

-Profit High to Low

-Profit Low to High

>Exit Strategy Filer

-TP first

-SL first

-BE first

-Decision first

>Custom arrangement button

-This lets the user use a custom drag and drop feature to arrange the trades however they like.

>Delete Trade button

-This allows the user to delete a trade by first clicking the Delete Trade button, then selecting a checkbox on the right of the particular trade they want to delete, and clicking a confirm button.

2. The Statistics section.

>Trades count

>Total PnL

>Win Rate (%)

>Average PnL

3. The Trades section

>Each trade will have it's own container with the following:

-Preview image

-Trade type

-Pair

-Timeframe

-Date

-PnL

-Entry

-Exit

>The preview image can be clicked to enlarge it, letting the user see the whole trade image

>The trade container can be clicked to open a detailed view of the trade. This detailed view will appear on the right of the screen as a whole separate section, letting the user see all the details of the trade.

>The detailed view will also include a simplified equity curve, only up to the point of the closed trade, and the preview image of the trade can also be clicked to enlarge it.


c) The Analytics section

*This will be the most complicated and most important tab

-This section will provide the user with Performance Analytics of their account.

1. Simplified Statistics section: This will show the exact simplified statistics as the View Trades tab (Trades count, Total PnL, Win Rate (%), Average PnL)

2. Advanced Equity curve

>This equity curve will allow the user to hover over its line and see a tooltip on top of the cursor.

3. Monthly Performance - bar chart

4. Symbol performance - bar chart

5. Entry Strategy performance - bar chart

6. Timeframe performance - bar chart

7. Trade Type performance - bar chart

8. Cumulative PnL All 

9. Cumulative PnL (By Timeframe and/or pair)

10. Average Reward (Win Size) Over Time

11. Evolutive Winrate

12. Monthly PnL

13. Cumulative performance by day of week (PnL)

14. Win Rate by Day of Week

15. Total PnL per hour

16. Performance hierarchy (by pair and timeframe)

*I want all of these to be accurate and work great, no bugs, issues or anything. I want it to be perfect, easy to understand and informative.*


d) The "Accounts" Tab

*The user can create multiple new accounts to log their trades

This will have three sections:

1. Create New Account section

>Account Name input

>Account Size input

>"Create Account" button

2. Your Accounts section

-Here the user's accounts will be listed. Each account will have 3 buttons next to it:

>Select button

>Edit button - user can edit the account details

>Delete button - there will be a "confirm delete" popup, warning the user that the respective account's data will be lost if they proceed.

3. Data section

-Here the user can import or export JSON backup files for their trading journal account. Since the data is stored locally, the user can export the file with their trades.


5. The second tool - Analyzer - image: analyzer.png

*This is the idea: The user can use the analyzer to analyze current market conditions, allowing them to check recent news, future programmed news and different charts

This tool will have 3 tabs:

a) The News Tab

*This tab will make use of simple embed code widgets from TradingView and FinancialJuice. This allows us to stay clear of complicated and expensive API's. This will have three sections:

1. The Live Session Timeline section

>This will be a simplified live session timeline at the top of the page.

2. The News section

>Will use the FinancialJuice "Headlines" widget to show the latest news in real time. This is the code:

<!-- FinancialJuice Widget-->

<div id="financialjuice-news-widget-container"  ></div>

<!--Place this script after </body> -->

<script type="text/javascript">

    var jo = document.createElement("script");

    jo.type = "text/javascript";

    jo.id= "FJ-Widgets";

    var r = Math.floor(Math.random() * (9999 - 0 + 1) + 0);

    jo.src = "https://feed.financialjuice.com/widgets/widgets.js?r=" + r + "";

    jo.onload = function(){ 

    var options = {};

     options.container = "financialjuice-news-widget-container";

    options.mode = "Dark";

    options.width= "500px";

    options.height= "600px";

    options.backColor= "1e222d";

    options.fontColor= "b2b5be";

    options.widgetType= "NEWS";

   new window.FJWidgets.createWidget(options);

        } 

     document.getElementsByTagName("head")[0].appendChild(jo);

</script>

>The widget will have a modified style to suit the style of the website

3. The Top Stories section

>Will use the TradingView "Top Stories" widget. This is the code:

<!-- TradingView Widget BEGIN -->

<div class="tradingview-widget-container">

  <div class="tradingview-widget-container__widget"></div>

  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/news/top-providers/tradingview/" rel="noopener nofollow" target="_blank"><span class="blue-text">Top stories</span></a><span class="trademark"> by TradingView</span></div>

  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async>

  {

  "displayMode": "regular",

  "feedMode": "all_symbols",

  "colorTheme": "dark",

  "isTransparent": false,

  "locale": "en",

  "width": 400,

  "height": 550

}

  </script>

</div>

<!-- TradingView Widget END -->

>The widget will have a modified style to suit the style of the website

b) The Calendar Tab

*This tab will use yet again embed code widgets from TradingView and FinancialJuice. This will have 2 sections:

1. The Live Session Timeline section

>This will be a simplified live session timeline at the top of the page.

2. The Calendar Section

>This section will use the either the FinancialJuice "Economic Calendar" widget, or the TradingView "Economic Calendar" widget. This is the code for both:

<!-- FinancialJuice Widget-->

<div id="financialjuice-eco-widget-container"  ></div>

<!--Place this script after </body> -->

<script type="text/javascript">

    var jo = document.createElement("script");

    jo.type = "text/javascript";

    jo.id= "FJ-Widgets";

    var r = Math.floor(Math.random() * (9999 - 0 + 1) + 0);

    jo.src = "https://feed.financialjuice.com/widgets/widgets.js?r=" + r + "";

    jo.onload = function(){ 

    var options = {};

     options.container = "financialjuice-eco-widget-container";

    options.mode = "standard";

    options.width= "340px";

    options.height= "600px";

    options.backColor= "1e222d";

    options.fontColor= "b2b5be";

    options.widgetType= "ECOCAL";

   new window.FJWidgets.createWidget(options);

        } 

     document.getElementsByTagName("head")[0].appendChild(jo);

</script>


<!-- TradingView Widget BEGIN -->

<div class="tradingview-widget-container">

  <div class="tradingview-widget-container__widget"></div>

  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/economic-calendar/" rel="noopener nofollow" target="_blank"><span class="blue-text">Economic Calendar</span></a><span class="trademark"> by TradingView</span></div>

  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-events.js" async>

  {

  "colorTheme": "dark",

  "isTransparent": false,

  "locale": "en",

  "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu",

  "importanceFilter": "-1,0,1",

  "width": 400,

  "height": 550

}

  </script>

</div>

<!-- TradingView Widget END -->

>There will be a "Change Widget" text that the user can click, and will be provided with two options: TradingView Widget, and FinancialJuice Widget. The default widget will be the one from FinancialJuice

c) The Market Tab

*This tab will use embed code too. This tab's purpose is to select a pair and get as much information on it as we could. There will be a couple of sections:

1. Select Pair Section

>The user will select a forex pair, and all the widgets will update to that pair and show information on that pair.

2. Mini Chart section

>This will use the TradingView "Mini Chart Compact" widget, this is the code:

<script type="module" src="https://widgets.tradingview-widget.com/w/en/tv-mini-chart.js"></script><tv-mini-chart symbol="NASDAQ:AAPL" style="width: 500px; height: 300px"></tv-mini-chart>

>The widget will have a modified style to suit the style of the website, and will show the pair selected by the user.

3. The Advanced Real-Time Chart section

>This will use the TradingView "Advanced Real-Time Chart" widget, this is the code:

<!-- TradingView Widget BEGIN -->

<div class="tradingview-widget-container" style="height:100%;width:100%">

  <div class="tradingview-widget-container__widget" style="height:calc(100% - 32px);width:100%"></div>

  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener nofollow" target="_blank"><span class="blue-text">AAPL stock chart</span></a><span class="trademark"> by TradingView</span></div>

  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>

  {

  "allow_symbol_change": true,

  "calendar": false,

  "details": false,

  "hide_side_toolbar": true,

  "hide_top_toolbar": false,

  "hide_legend": false,

  "hide_volume": false,

  "hotlist": false,

  "interval": "D",

  "locale": "en",

  "save_image": true,

  "style": "1",

  "symbol": "NASDAQ:AAPL",

  "theme": "dark",

  "timezone": "Etc/UTC",

  "backgroundColor": "#0F0F0F",

  "gridColor": "rgba(242, 242, 242, 0.06)",

  "watchlist": [],

  "withdateranges": false,

  "compareSymbols": [],

  "studies": [],

  "autosize": true

}

  </script>

</div>

<!-- TradingView Widget END -->

>The widget will have a modified style to suit the style of the website, and will only show the pair selected by the user.

4. The Upcoming Events section

>This will use the TradingView "Economic Calendar Widget", updated to show events that only concern the pair selected by the user.

>The widget will have a modified style to suit the style of the website

4. The Latest News section

>This will use the FinancialJuice "Headlines" widget, modified to only show news concerning the pair selected by the user.

>The widget will have a modified style to suit the style of the website

5. The Market Data section

>This section will use the TradingView "Forex Market Data" Widget, showing multiple pairs. This widget will not be affected by what pair the user selects, it will be the same everytime. This is the code:

<!-- TradingView Widget BEGIN -->

    <div class="tradingview-widget-container">

      <div class="tradingview-widget-container__widget"></div>

      <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/?utm_source=www.tradingview.com&amp;utm_medium=widget_new&amp;utm_campaign=market-quotes" rel="noopener nofollow" target="_blank"><span class="blue-text">Market summary</span></a><span class="trademark"> by TradingView</span></div>

      <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js" async>

      {

      "title": "Currencies",

      "title_link": "/markets/currencies/rates-major/",

      "width": "100%",

      "height": "100%",

      "locale": "en",

      "showSymbolLogo": true,

      "symbolsGroups": [

        {

          "name": "Major",

          "symbols": [

            {

              "name": "FX_IDC:EURUSD",

              "displayName": "EUR to USD"

            },

            {

              "name": "FX_IDC:USDJPY",

              "displayName": "USD to JPY"

            },

            {

              "name": "FX_IDC:GBPUSD",

              "displayName": "GBP to USD"

            },

            {

              "name": "FX_IDC:AUDUSD",

              "displayName": "AUD to USD"

            },

            {

              "name": "FX_IDC:USDCAD",

              "displayName": "USD to CAD"

            },

            {

              "name": "FX_IDC:USDCHF",

              "displayName": "USD to CHF"

            }

          ]

        },

        {

          "name": "Minor",

          "symbols": [

            {

              "name": "FX_IDC:EURGBP",

              "displayName": "EUR to GBP"

            },

            {

              "name": "FX_IDC:EURJPY",

              "displayName": "EUR to JPY"

            },

            {

              "name": "FX_IDC:GBPJPY",

              "displayName": "GBP to JPY"

            },

            {

              "name": "FX_IDC:CADJPY",

              "displayName": "CAD to JPY"

            },

            {

              "name": "FX_IDC:GBPCAD",

              "displayName": "GBP to CAD"

            },

            {

              "name": "FX_IDC:EURCAD",

              "displayName": "EUR to CAD"

            }

          ]

        },

        {

          "name": "Exotic",

          "symbols": [

            {

              "name": "FX_IDC:USDSEK",

              "displayName": "USD to SEK"

            },

            {

              "name": "FX_IDC:USDMXN",

              "displayName": "USD to MXN"

            },

            {

              "name": "FX_IDC:USDZAR",

              "displayName": "USD to ZAR"

            },

            {

              "name": "FX_IDC:EURTRY",

              "displayName": "EUR to TRY"

            },

            {

              "name": "FX_IDC:EURNOK",

              "displayName": "EUR to NOK"

            },

            {

              "name": "FX_IDC:GBPPLN",

              "displayName": "GBP to PLN"

            }

          ]

        }

      ],

      "colorTheme": "light"

    }

      </script>

    </div>

    <!-- TradingView Widget END -->

>The widget will have a modified style to suit the style of the website


6. The third tool - Risk Calculator - image: riskcalc.png

Here I will let you be creative and create a nice risk calculator tool. I count on you to make this great!


We are done with the tools.

I also want you to create a Privacy Policy page and a Disclaimer page. The disclaimer page will let the users know that we use external widgets.


# Directory Structure

```

Share/

  public/

    analyzer.png

    background.jpg

    journal.png

    logo.png

    riskcalc.png

    vite.svg

  src/

    assets/

      react.svg

    components/

      context/

        TradeContext.jsx

      CalendarView.jsx

      EditTradeModal.jsx

      Layout.jsx

    pages/

      analyzer/

        AnalyzerLayout.jsx

        CalendarTab.jsx

        LiveSessionTimeline.jsx

        MarketTab.jsx

        NewsTab.jsx

      journal/

        Accounts.jsx

        AddTradeTab.jsx

        Analytics.jsx

        Dashboard.jsx

        JournalLayout.jsx

        ViewTrades.jsx

      About.jsx

      Contact.jsx

      Home.jsx

      RiskCalculator.jsx

    App.css

    App.jsx

    index.css

    main.jsx

  eslint.config.js

  index.html

  package.json

  postcss.config.js

  README.md

  tailwind.config.js

  vite.config.js

```
* FinancialJuice headlines widget
* TradingView top stories widget
* Styled to match Cosmic Tools theme

### b) Calendar

* Live session timeline
* Economic calendar
* Switchable between:

  * FinancialJuice (default)
  * TradingView

### c) Market

* Pair selector
* Mini chart
* Advanced real-time chart
* Upcoming events filtered by pair
* Latest news filtered by pair
* Forex market data overview

All widgets are styled to fit the dark cosmic UI.

---

## 3. Risk Calculator

**Image:** `riskcalc.png`

A creative, intuitive risk management tool designed to help traders:

* Calculate position size
* Define risk per trade
* Visualize risk-to-reward scenarios

Designed to be simple, fast, and visually clear.

---

## Legal Pages

### Privacy Policy

* No data collection
* No tracking
* All data stored locally in the browser

### Disclaimer

* Use of third-party widgets (TradingView, FinancialJuice)
* Market data provided by external sources
* Not financial advice

---

## Directory Structure

```text
Share/
 public/
  analyzer.png
  background.jpg
  journal.png
  logo.png
  riskcalc.png
  vite.svg
 src/
  assets/
   react.svg
  components/
   context/
    TradeContext.jsx
   CalendarView.jsx
   EditTradeModal.jsx
   Layout.jsx
  pages/
   analyzer/
    AnalyzerLayout.jsx
    CalendarTab.jsx
    LiveSessionTimeline.jsx
    MarketTab.jsx
    NewsTab.jsx
   journal/
    Accounts.jsx
    AddTradeTab.jsx
    Analytics.jsx
    Dashboard.jsx
    JournalLayout.jsx
    ViewTrades.jsx
   About.jsx
   Contact.jsx
   Home.jsx
   RiskCalculator.jsx
  App.css
  App.jsx
  index.css
  main.jsx
 eslint.config.js
 index.html
 package.json
 postcss.config.js
 README.md
 tailwind.config.js
 vite.config.js
```

---

## Status

Cosmic Tools is under active development.
Web platform is the primary focus, with mobile applications planned for future releases.

---

## License

This project is proprietary.
All rights reserved © 2026 Cosmic Tools.

---
* Write Privacy Policy and Disclaimer pages
* Align the README tone more toward investors or users
