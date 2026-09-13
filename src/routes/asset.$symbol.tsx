import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ChevronDown, Clock, ExternalLink, HelpCircle, Activity, AudioLines } from "lucide-react";
import { useState } from "react";
import { MacroSidebar, MacroTopbar } from "@/components/macro-chrome";

export const Route = createFileRoute("/asset/$symbol")({
  head: ({ params }) => {
    const symbol = params.symbol.toUpperCase();
    const title = `${symbol} Deep Dive — HybridTrader`;
    const description = `Institutional deep dive for ${symbol}: edge factor, market mood, policy outlook, flow, volatility and relative strength.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AssetDeepDive,
});

const assetInfo: Record<string, { name: string; price: string; change: string; flag: string }> = {
  XAUUSD: { name: "Gold Spot vs US Dollar", price: "4,346.68", change: "+0.51%", flag: "🪙" },
  EURUSD: { name: "Euro vs US Dollar", price: "1.0421", change: "-0.32%", flag: "🇪🇺" },
};

const news = [
  { source: "cnn.com", time: "1h ago", title: "Top WH economic advisor: 'Yes' Trump will accept potential Fed interest rate hike", body: "Top White House Economic Advisor Kevin Hassett says President Trump will accept if the Federal Reserve raises interest r..." },
  { source: "philstockworld.com", time: "2h ago", title: "Get Ready for the Week Ahead – FOMC Decision on Wednesday As Rats Leave the Sinking Ship of State", body: "Highlights from Roy and Penny's podcast: Traditional foreign sovereign anchors of the U.S. Treasury market are in active..." },
  { source: "ambcrypto.com", time: "1h ago", title: "Bitcoin vs. Gold: Where would $10K perform better in the next macro shock?", body: "Bitcoin continues to hold strong despite rising Treasury yields, creating a potential setup for crypto to outperform gol..." },
];

const miniTickers = [
  { symbol: "XAGUSD", name: "Silver Spot vs US Dollar", price: "64.39", change: "+1.13%", up: true },
  { symbol: "USOIL", name: "WTI Crude Oil", price: "96.79", change: "-2.92%", up: false },
  { symbol: "BTCUSD", name: "Bitcoin vs US Dollar", price: "77169", change: "-0.25%", up: false },
  { symbol: "AUDUSD", name: "Australian Dollar vs US Dollar", price: "0.71713", change: "+0.19%", up: true },
];

const sessions = [
  { label: "Sydney", left: 5, width: 12, named: false },
  { label: "Tokyo", left: 5, width: 16, named: false },
  { label: "London", left: 20, width: 37, named: true },
  { label: "New York", left: 30, width: 38, named: true },
  { label: "Sydney ", left: 62, width: 13, named: true },
  { label: "Tokyo ", left: 68, width: 11, named: true },
];

const upPath = "M0 34 L8 30 L16 33 L24 24 L32 27 L40 18 L48 22 L56 10 L64 14 L72 8 L80 12 L88 6 L100 9";
const downPath = "M0 8 L8 12 L16 10 L24 18 L32 15 L40 24 L48 21 L56 30 L64 27 L72 33 L80 30 L88 35 L100 32";

function Spark({ up }: { up: boolean }) {
  return (
    <svg className="spark" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      <path d={`${up ? upPath : downPath} L100 40 L0 40 Z`} className={up ? "spark-fill-up" : "spark-fill-down"} />
      <path d={up ? upPath : downPath} className={up ? "spark-line-up" : "spark-line-down"} />
    </svg>
  );
}

function AssetDeepDive() {
  const { symbol } = Route.useParams();
  const key = symbol.toUpperCase();
  const info = assetInfo[key] ?? { name: `${key} Spot`, price: "—", change: "0.00%", flag: "◍" };
  const [range, setRange] = useState("1D");

  return (
    <main className="macro-shell">
      <MacroSidebar active="Macro Desk" />
      <div className="macro-main">
        <MacroTopbar />
        <div className="deep-content">
          <div className="deep-topline">
            <Link to="/macro-desk" className="back-link"><ArrowLeft size={13}/> Back to AI Macro Desk</Link>
            <div className="deep-chips">
              <span><Clock size={9}/> Updated 10m ago</span>
              <span><HelpCircle size={9}/> 1 note</span>
            </div>
          </div>

          <div className="deep-hero">
            <div className="deep-title">
              <span className="hero-roundel">{info.flag}</span>
              <div>
                <h1>{key}</h1>
                <p>{info.name}</p>
              </div>
            </div>
            <div className="edge-card">
              <div className="edge-score">
                <div className="edge-ring">53</div>
                <span>Cautious Bearish Bias</span>
              </div>
              <div className="edge-body">
                <h2>Edge Factor <HelpCircle size={9}/></h2>
                <p>Technicals and macro are leaning defensive, with tradable volatility despite uneven participation. Maintain a bearish lean but demand confirmation and reduce position size until the edge strengthens.</p>
                <button>Show breakdown <ChevronDown size={10}/></button>
              </div>
            </div>
          </div>

          <div className="deep-grid">
            <section className="deep-col-left">
              <div className="deep-panel price-panel">
                <div className="price-head">
                  <div>
                    <strong>{info.price}</strong>
                    <em className="gain"><ArrowUpRight size={11}/> {info.change}</em>
                  </div>
                  <div className="range-tabs">
                    {["1D", "5D", "1M"].map((r) => (
                      <button key={r} className={range === r ? "active" : ""} onClick={() => setRange(r)}>{r}</button>
                    ))}
                  </div>
                </div>
                <div className="price-chart">
                  <div className="axis">
                    <span>4,401.75</span><span>4,377.35</span><span>4,352.95</span><span>4,328.55</span>
                  </div>
                  <Spark up />
                </div>
              </div>

              <div className="deep-panel news-panel">
                <h2>News Stories</h2>
                <div className="news-list">
                  {news.map((item) => (
                    <article className="news-item" key={item.title}>
                      <header>
                        <span className="news-source"><i/>{item.source} · {item.time}</span>
                        <ExternalLink size={10}/>
                      </header>
                      <h3><Activity size={11}/> {item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="deep-col-right">
              <div className="deep-panel ai-overview">
                <h2>✧ AI overview</h2>
                <p>Hot US PPI at 5.4% and crude oil topping $100 fuel hawkish Fed rate hike bets for September 15-16. Rising Treasury yields underscore Gold's retreat to £4,300, signalling continued downside pressure.</p>
              </div>

              <div className="duo-grid">
                <div className="deep-panel tinted-loss">
                  <div className="panel-line"><span>Market Mood</span><em><Clock size={9}/> 1d ago</em></div>
                  <div className="mood-body">
                    <div className="gauge">
                      <div className="gauge-arc"><i/></div>
                      <b className="loss">RISK-OFF</b>
                    </div>
                    <div>
                      <h3>Investor Positioning</h3>
                      <p>Market sentiment is firmly risk-off as hot US inflation data and surging Treasury yields amplify expectations for a Fed rate hike. Gold is under significant pressure, currently retreating towards the £4,300 support zone.</p>
                    </div>
                  </div>
                  <button className="foot-note"><span><HelpCircle size={9}/> <b>Risk-Off:</b> Investors are cautious and seeking safer assets.</span><ChevronDown size={11}/></button>
                </div>

                <div className="deep-panel">
                  <div className="panel-line"><span>Market Policy</span><em><Clock size={9}/> 1d ago</em></div>
                  <div className="mood-body">
                    <div className="neutral-mark">NEUTRAL</div>
                    <div>
                      <h3>Global Economic Outlook</h3>
                      <p>August's elevated US PPI at 5.4% and Core CPI at 4.6% have firmly shifted market expectations, with a 60-70% probability now priced in for a Federal Reserve rate hike at the upcoming September 15-16 meeting.</p>
                    </div>
                  </div>
                  <button className="foot-note"><span><HelpCircle size={9}/> <b>NEUTRAL:</b> Central banks maintaining a neutral stance.</span><ChevronDown size={11}/></button>
                </div>
              </div>

              <div className="trio-grid">
                <div className="deep-panel">
                  <div className="panel-line"><span>Flow</span></div>
                  <div className="metric-head"><AudioLines size={22} className="amber"/><b className="amber">SUBDUED</b></div>
                  <div className="scale"><i className="amber-bar"/><i className="green-bar"/><i className="red-bar"/><span className="marker" style={{ left: "18%" }}/></div>
                  <div className="scale-labels"><span>Subdued</span><span>Normal</span><span>Stretched</span></div>
                  <p className="metric-note">Range and trend strength are both subdued</p>
                  <ul>
                    <li>The current true range is small against its recent average</li>
                    <li>ADX is low, so there is little directional conviction behind the move</li>
                    <li>Breakout attempts are more likely to stall until range expands</li>
                  </ul>
                </div>

                <div className="deep-panel tinted-loss">
                  <div className="panel-line"><span>Bearing</span></div>
                  <div className="metric-head column"><b className="loss">SMOOTH DOWN</b><Spark up={false}/></div>
                  <p className="metric-note">Clean downtrend — trend-following conditions are healthy</p>
                  <ul>
                    <li>EMA stack aligned bearish with negative slope</li>
                    <li>Low RSI chop — participants are committed to the downside</li>
                    <li>Rallies to EMA resistance are sellable</li>
                  </ul>
                </div>

                <div className="deep-panel">
                  <div className="panel-line"><span>Pulse</span></div>
                  <div className="metric-head"><Activity size={22} className="gain"/><b className="gain">TRADABLE</b></div>
                  <div className="scale"><i className="grey-bar"/><i className="green-bar"/><i className="red-bar"/><span className="marker" style={{ left: "52%" }}/></div>
                  <div className="scale-labels"><span>Quiet</span><span>Tradable</span><span>Wild</span></div>
                  <p className="metric-note">Volatility in normal range — setups have room to breathe</p>
                  <ul>
                    <li>ATR and BB width within historical norms</li>
                    <li>Standard risk-reward ratios are achievable</li>
                    <li>Normal stop sizing applies</li>
                  </ul>
                </div>
              </div>

              <div className="mini-ticker-grid">
                {miniTickers.map((item) => (
                  <div className="deep-panel mini-ticker" key={item.symbol}>
                    <div className="mini-head">
                      <div><b>{item.symbol}</b><span>{item.name}</span></div>
                      <div className="mini-price"><b>{item.price}</b><em className={item.up ? "gain" : "loss"}>{item.up ? "↗" : "↘"} {item.change}</em></div>
                    </div>
                    <Spark up={item.up} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="bottom-grid">
            <div className="deep-panel">
              <div className="panel-line big"><h2>Market Sessions</h2><em>GMT-3 Timezone</em></div>
              <div className="sessions-chart">
                <div className="hours">{["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"].map((h) => <span key={h}>{h === "24:00" ? "00:00" : h}</span>)}</div>
                <div className="now-line"><i/><b>01:09 PM</b></div>
                {sessions.map((s) => (
                  <div className="session-row" key={s.label}>
                    <span className="session-bar" style={{ marginLeft: `${s.left}%`, width: `${s.width}%` }}>{s.named ? s.label.trim() : ""}</span>
                    <small style={{ marginLeft: `${s.left}%` }}>CLOSED</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="deep-panel">
              <div className="panel-line big"><h2>Relative Strength <HelpCircle size={10}/></h2><em>Basket: XAGUSD, BTCUSD, USOIL, AUDUSD</em></div>
              <div className="rs-chart">
                <div className="axis">
                  <span>0.003</span><span>0.0015</span><span>0</span><span>-0.0015</span><span>-0.003</span>
                </div>
                <div className="rs-plot">
                  <span className="rs-zero"/>
                  <svg viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 30 L10 34 L20 32 L32 40 L44 38 L54 47 L62 44 L70 52 L78 46 L86 54 L92 40 L100 44" className="spark-line-down"/>
                  </svg>
                  <b className="tag-gain">XAUUSD</b>
                  <b className="tag-loss">Basket Avg.</b>
                </div>
              </div>
              <div className="rs-hours"><span>12 de set., 01:30 PM</span><span>12 de set., 08:30 PM</span><span>13 de set., 03:30 AM</span><span>13 de set., 01:00 PM</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
