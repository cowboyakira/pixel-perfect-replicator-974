import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Bell, BookOpen, Brain, CalendarDays, ChevronDown, ChevronUp, FileText,
  LayoutDashboard, LineChart, Settings2, TrendingDown, Users,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/macro-desk")({
  head: () => ({
    meta: [
      { title: "AI Market Bias — HybridTrader" },
      { name: "description", content: "Deep institutional market analysis with AI-driven clarity." },
      { property: "og:title", content: "AI Market Bias — HybridTrader" },
      { property: "og:description", content: "Institutional market bias and AI analysis for major assets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MacroDesk,
});

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" as const },
  { label: "Macro Desk", icon: LineChart, to: "/macro-desk" as const },
  { label: "Journal", icon: BookOpen },
  { label: "Psychology", icon: Brain },
  { label: "Calendar", icon: CalendarDays },
  { label: "Reports", icon: FileText },
  { label: "Community", icon: Users },
];

const assets = [
  {
    symbol: "EURUSD", flag: "🇪🇺", confidence: 90, updated: "15h ago",
    summary: "ECB's Lagarde flags Eurozone growth deterioration, hinting at an October rate cut. This dovish stance, coupled with hotter US CPI, strengthens the dollar and pushes the Euro to multi-month lows.",
    bullets: [
      "ECB President Lagarde signalled deteriorating Eurozone growth and hinted at an October rate cut, directly weakening the Euro's prospects.",
      "Hotter-than-expected US Core CPI at 2.9% this week forced markets to trim Fed pivot expectations for Q4, strengthening the dollar.",
      "German Industrial Production fell for a third consecutive month, exacerbating Eurozone economic concerns due to persistent energy costs.",
      "A bearish technical picture on higher timeframes reinforces the fundamental weakness in EURUSD.",
    ],
  },
  {
    symbol: "XAUUSD", flag: "🟡", confidence: 85, updated: "14h ago",
    summary: "Hot US PPI at 5.4% and crude oil topping $100 fuel hawkish Fed rate hike bets for September 15–16. Rising Treasury yields underscore Gold's retreat to £4,300, signalling continued downside pressure.",
    bullets: [
      "US Producer Price Index accelerated to 5.4% in August, beating market expectations and solidifying the case for a hawkish Fed response.",
      "Treasury yields remain elevated while demand for defensive assets continues to soften.",
      "Gold remains below its short-term momentum range, keeping the directional outlook bearish.",
    ],
  },
];

function MacroDesk() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ EURUSD: true });
  return (
    <main className="macro-shell">
      <aside className="macro-sidebar">
        <div className="macro-brand"><span className="brand-mark">H</span><b>HybridTrader</b></div>
        <nav className="macro-nav">
          {navigation.map(({ label, icon: Icon, to }) => to ? (
            <Link key={label} to={to} className={`nav-item ${label === "Macro Desk" ? "active" : ""}`} title={label}><Icon/><span>{label}</span></Link>
          ) : <button key={label} className="nav-item" title={label}><Icon/><span>{label}</span></button>)}
        </nav>
      </aside>
      <div className="macro-main">
        <header className="macro-topbar"><button className="icon-button" title="Notifications"><Bell/><i/></button><div className="avatar">R</div></header>
        <div className="macro-content">
          <div className="macro-heading">
            <h1>AI Market Bias <span>Where deep institutional analysis meets AI-driven clarity</span></h1>
            <button className="asset-button"><Settings2/> Manage assets</button>
          </div>
          <div className="sentiment-strip">
            <div>Overall market sentiment: <b>Risk-on</b></div>
            <div>Confidence index: <b>60%</b></div>
            <div>Page update: <b className="update-pill">1s ago</b></div>
          </div>
          <section className="macro-cards" aria-label="Market bias assets">
            {assets.map((asset) => {
              const isOpen = Boolean(expanded[asset.symbol]);
              return <article className="macro-card" key={asset.symbol}>
                <div className="macro-card-head"><span className={`asset-roundel ${asset.symbol === "XAUUSD" ? "gold" : ""}`}>{asset.flag}</span><h2>{asset.symbol}</h2><span className="trend-mini">⌁ &nbsp;0%</span><em className="bearish">● Bearish</em></div>
                <div className="macro-card-body">
                  <div className="macro-confidence"><span>Confidence</span><strong>{asset.confidence}%</strong><div><i style={{ width: `${asset.confidence}%` }}/></div></div>
                  <p className="last-update">⟳ Last update: {asset.updated}</p>
                  <div className="macro-analysis"><strong>◇ AI Analysis</strong><p>{asset.summary}.. <a href="#details">Read more</a></p></div>
                  <div className="macro-actions"><button onClick={() => setExpanded((current) => ({ ...current, [asset.symbol]: !isOpen }))}>Quick Overview &nbsp; {isOpen ? <ChevronUp size={10}/> : <ChevronDown size={10}/>}</button><button>Deep Dive &nbsp; ↗</button></div>
                  {isOpen && <div className="macro-details" id="details">
                    <ul>{asset.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                    <div className="accuracy"><span>Model accuracy (30 days)</span><b>0%</b></div>
                    <h3 className="layers-title">ANALYSIS LAYERS</h3>
                    <div className="layers"><span className="active">◉ Macro</span><span>○ Sentiment</span><span className="active">◉ Technical</span></div>
                  </div>}
                </div>
              </article>;
            })}
          </section>
        </div>
      </div>
    </main>
  );
}