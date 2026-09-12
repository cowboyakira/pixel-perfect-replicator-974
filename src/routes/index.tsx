import { createFileRoute } from "@tanstack/react-router";
import {
  Activity, Bell, BookOpen, Brain, CalendarDays, ChevronDown, CircleDollarSign,
  Clock3, FileText, Gauge, LayoutDashboard, LineChart, Newspaper, Send, Settings2,
  Sparkles, TrendingUp, Users, WandSparkles,
} from "lucide-react";
import { useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trading Dashboard — HybridTrader" },
      { name: "description", content: "AI-powered trading intelligence, market analysis, journal, and psychology dashboard." },
      { property: "og:title", content: "Trading Dashboard — HybridTrader" },
      { property: "og:description", content: "AI-powered trading intelligence and market analysis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const marketBars = [
  ["USDJPY", 72, "+1.04"], ["USDCHF", 44, "+0.16"], ["COPPER", 5, "+0.1"],
  ["USDJPY", -2, "0"], ["EURUSD", -3, "-0.03"], ["GBPUSD", -4, "-0.03"],
  ["XAUUSD", -5, "-0.03"], ["DXY", -7, "-0.05"], ["US30", -12, "-0.06"],
  ["US500", -14, "-0.06"], ["UKOIL", -16, "-0.07"], ["VIX", -82, "-1.8"],
] as const;

const ticker = [
  ["EURUSD", "1.15989", "+0.00%"], ["XAUUSD", "4346.68", "+0.06%"],
  ["XAGUSD", "64.39", "+0.00%"], ["BTCUSD", "77126", "-0.24%"],
  ["AUDUSD", "0.71713", "+0.00%"], ["USOIL", "96.79", "-0.02%"],
] as const;

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>{children}</section>;
}

function PanelTitle({ icon, title, subtitle, action }: { icon: ReactNode; title: string; subtitle: string; action?: string }) {
  return <div className="panel-title"><div className="title-icon">{icon}</div><div className="min-w-0"><h2>{title} <span>ⓘ</span></h2><p>{subtitle}</p></div>{action && <button className="text-action">{action} →</button>}</div>;
}

function MiniLine({ red = false }: { red?: boolean }) {
  return <svg viewBox="0 0 300 70" className="mini-line" preserveAspectRatio="none" aria-hidden="true"><path d="M0 63 L36 56 L69 49 L108 41 L150 33 L192 27 L233 20 L300 11" className={red ? "stroke-loss" : "stroke-gain"}/><path d="M0 63 L36 56 L69 49 L108 41 L150 33 L192 27 L233 20 L300 11 L300 70 L0 70Z" className={red ? "fill-loss" : "fill-gain"}/></svg>;
}

function CurrencyChart() {
  const lines = [
    "M0 63 C25 30 46 64 70 36 S114 19 138 52 S179 72 204 48 S252 58 300 37",
    "M0 45 C28 55 43 14 70 38 S111 79 139 42 S183 24 214 50 S260 67 300 49",
    "M0 27 C26 33 42 53 68 32 S108 40 134 25 S170 60 203 35 S260 19 300 29",
    "M0 70 C32 76 44 26 75 60 S120 70 151 47 S199 28 222 39 S270 32 300 51",
    "M0 54 C35 47 44 74 78 62 S123 16 154 29 S196 59 232 31 S271 55 300 22",
  ];
  return <svg viewBox="0 0 300 90" className="currency-chart" preserveAspectRatio="none" aria-label="Currency strength chart">
    {[15,30,45,60,75].map(y => <line key={y} x1="0" x2="300" y1={y} y2={y} className="grid-line"/>)}
    {lines.map((d, i) => <path d={d} key={d} className={`chart-line chart-${i + 1}`}/>)}</svg>;
}

function Dashboard() {
  const [range, setRange] = useState("Last week");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const nav = [[LayoutDashboard,"Dashboard"],[LineChart,"Macro Desk"],[BookOpen,"Journal"],[Brain,"Psychology"],[CalendarDays,"Calendar"],[FileText,"Reports"],[Users,"Community"]] as const;

  return <main className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">H</span><b>HybridTrader</b></div>
      <nav>{nav.map(([Icon,label],i)=><button key={label} className={`nav-item ${i===0?"active":""}`} title={label}><Icon/><span>{label}</span></button>)}</nav>
    </aside>

    <div className="workspace">
      <header className="topbar"><div/><button className="icon-button" title="Notifications"><Bell/><i/></button><div className="avatar">R</div></header>
      <div className="dashboard">
        <div className="welcome-row"><div><h1>Good afternoon, Rai.</h1><p><Sparkles/> Trading assistant that never sleeps.</p></div><button className="personalize"><Settings2/> Personalize</button></div>
        <div className="sessions">
          {["SYDNEY","ASIA","LONDON","NEW YORK"].map((x,i)=><div key={x}><b><i/> {x}</b><span>CLOSES {i===0?"opens in 2h 14m":"opens in 3h 14m"}</span></div>)}
          <div className="session-clock"><Clock3/> 15:45:19 <small>GMT-3</small></div><div className="session-clock"><Clock3/> 18:45:19 <small>UTC</small></div>
        </div>

        <div className="top-grid">
          <Panel><PanelTitle icon={<TrendingUp/>} title="AI Macro Desk" subtitle="Market bias analysis" action="View All"/>
            <div className="bias-grid">
              {[{symbol:"XAUUSD",flag:"🟡",confidence:85,text:"Hot US PPI at 5.4% and crude oil topping $100 fuel hawkish Fed rate hike bets for September '25–'26. Rising Treasury yields underscore Gold's retreat to £4,300, signalling continued downside pressure."},{symbol:"EURUSD",flag:"🇪🇺",confidence:90,text:"ECB's Lagarde flags Eurozone growth deterioration, hinting at an October rate cut. This dovish stance, coupled with hotter US CPI, strengthens the dollar and pushes the Euro to multi-month lows. Outlook firmly bearish."}].map(item=><article className="bias-card" key={item.symbol}><div className="card-head"><b>{item.flag} {item.symbol}</b><em>↘ Bearish</em></div><div className="confidence"><span>Confidence</span><b>{item.confidence}%</b><div><i style={{width:`${item.confidence}%`}}/></div></div><div className="analysis"><b>↗ AI Analysis</b><p>{item.text}</p></div></article>)}
            </div>
          </Panel>
          <Panel><PanelTitle icon={<Newspaper/>} title="Capital flow" subtitle="Follow the money across markets"/>
            <article className="headline"><div className="headline-tags"><span>🇬🇧 LONDON</span><span>BREAKING</span><em>Cadence</em></div><h3>Equities Push Higher While Data Gaps Cloud the Broader Tape</h3><p>The London open shows a clear bid in the Nasdaq 100 and Dow Jones, though our view is limited by missing live data for the Dollar and Treasury yields. While the VIX is trading at its lowest levels in months compared to the yearly average, we lack fresh readings on Copper and Brent crude to confirm...</p></article>
            <div className="flow-update"><div className="update-head"><span>↗ Last Update 21:00</span><b>● Live</b></div>{marketBars.map(([name,val,num])=><div className="bar-row" key={name}><strong>{name}</strong><div><i className={val>=0?"positive":"negative"} style={{width:`${Math.abs(val)}%`}}/></div><span className={val>=0?"gain":"loss"}>{num}</span></div>)}</div>
          </Panel>
        </div>

        <div className="ticker">{ticker.map(([name,value,delta])=><div key={name}><b>{name}</b><span>{value}</span><em className={delta.startsWith("-")?"loss":"gain"}>{delta}</em><small>{name==="BTCUSD"?"Bitcoin vs US Dollar":"Euro vs US Dollar"}</small></div>)}</div>

        <div className="mid-grid">
          <Panel><PanelTitle icon={<BookOpen/>} title="Trading Journal" subtitle="Your trade diary" action="View Journal"/>
            <button className="range" onClick={()=>setRange(range==="Last week"?"This month":"Last week")}>{range} <ChevronDown/></button>
            <div className="stats-grid"><div className="stat wide"><span>Net P&L</span><b className="loss">-$4.34</b><MiniLine red/><small>7 de set.</small><small>8 de set.</small></div><div className="stat"><span>Win rate</span><b>36.4%</b><small>Losses: 7 <i className="gain">Wins: 4</i></small><div className="donut"><b>7</b><span>LOSSES</span></div></div><div className="stat"><span>Avg. win / loss</span><b>1.7x</b><div className="split"><i/><em/></div></div></div>
            <div className="trades"><div className="subhead">Recent trades <button>View all →</button></div>{[["EURUSD","+$147.73"],["XAUUSD","-$51.85"],["XAUUSD","+$4.63"],["XAUUSD","+$4.56"]].map(([pair,pnl],i)=><div className="trade" key={i}><b>＋ {pair}</b><span>Sep 10, 2026</span><em>SHORT</em><small>FTMO 10K</small><strong className={pnl.startsWith("+")?"gain":"loss"}>{pnl}</strong>{i>1&&<button>↗ Reflect</button>}</div>)}</div>
            <div className="ai-note"><b>↗ AI Analysis</b><h3>Your journal patterns are taking shape</h3><p>Recently, you have been actively trading with a directional confidence level. While your overall net P&L is slightly negative, there are promising signs in specific areas, such as your performance with SHORT trades and during the New York session.</p></div>
          </Panel>
          <Panel><PanelTitle icon={<Brain/>} title="AI Psychologist" subtitle="Your mindset coach" action="View analysis"/>
            <div className="psy-grid"><div className="risk-box"><span>Risk <em>● Now</em></span><div className="gauge"><Gauge/><b>HIGH RISK</b></div><p>Driven mainly by elevated revenge risk (100.0%) during New York, with post-loss aggression.</p></div><div className="psych-stat"><span>Last trade: EURUSD</span><b className="gain">+147.73 USD</b><p>Your most recent closed trade was a win.</p></div><div className="risk-box discipline"><span>Discipline <em>Last 30 days</em></span><div className="gauge"><CircleDollarSign/><b>84% DISCIPLINE</b></div><p>0 pts this month</p></div><div className="psych-stat"><span>New York session</span><b className="gain">60%</b><p>Strongest session for you. Win rate 60% over the window.</p></div><div className="psych-stat"><span>Current window</span><b>No data available</b><p>No window activity yet.</p></div></div>
            <div className="ai-note"><b>↗ AI Analysis</b><h3>Psychological Intelligence Briefing</h3><p>Across your latest 11 closed trades, your average R of 1.72 shows winners are carrying real weight even with a 36.4% win rate. Nearly half of those same trades carried a mistake flag while discipline sat at 50.</p></div>
          </Panel>
        </div>

        <div className="lower-grid">
          <Panel><PanelTitle icon={<Activity/>} title="News Feed" subtitle=""/><span className="live">● Live</span><div className="feed">{["Why Some Retirees Keep 25% of Their Portfolio in Cash and Treasuries","Pacific Empire Minerals Corp. in Focus Across Canada's Mineral E...","Canstar Resources and the Changing Mineral Exploration Landscape","A.I.S. Resources in Focus Across Canada's Mineral Exploration Se"].map((x,i)=><article key={x}><div className={`source source-${i}`}>{i?"●":"24"}</div><div><b>{i?"kalkinemedia.com":"247wallst.com"} <small>· {i+1}h ago</small></b><p>{x}</p><span>General</span></div><button>↗</button></article>)}</div></Panel>
          <Panel><PanelTitle icon={<LineChart/>} title="Currency Strength" subtitle="Real-time currency performance"/><span className="live">● Live</span><CurrencyChart/><div className="chart-labels">JPY　 GBP　 USD　 EUR　 CHF　 CAD　 AUD</div></Panel>
        </div>

        <div className="bottom-grid">
          <Panel><PanelTitle icon={<CalendarDays/>} title="Calendar" subtitle="Upcoming events" action="View All"/><div className="events">{[["Low","Consumer Price Index (YoY)","Economic Indicator　 Inflation　 CPI"],["Medium","ECB's Schnabel speech","Economic Indicator　 Monetary Policy　 Central Bank Speech"]].map(([impact,event,tags])=><article key={event}><div><span>{impact}</span><time>1h 14m 19s</time></div><h3>{event}</h3><p>{event.includes("Schnabel")&&"Schnabel speaks in a packed EUR session (10 releases/24h) after ECB's latest rate rise; Klass says it's 'understandable' markets see more hikes."}</p><small>{tags}</small></article>)}</div></Panel>
          <Panel><PanelTitle icon={<WandSparkles/>} title="Trading Assistant" subtitle="Ask me anything"/><div className="assistant-box"><textarea value={message} onChange={e=>{setMessage(e.target.value);setSent(false)}} placeholder="Ask about markets, trades, or analysis..."/><button className="send" title="Send message" onClick={()=>{if(message.trim())setSent(true)}}><Send/></button></div><small className="helper">{sent?"Message sent to your trading assistant.":"Tip: detailed prompts produce better answers."}</small><div className="quick"><b>Quick Questions</b>{["What's moving?","Calendar next 24h","Outlook","Trade plan","Explain like I'm new","Risk assessment","Bias on EURUSD","Bias on Gold"].map(q=><button key={q} onClick={()=>setMessage(q)}>⊙ {q}</button>)}</div></Panel>
        </div>
      </div>
    </div>
  </main>;
}