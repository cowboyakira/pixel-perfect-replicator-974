import { Link } from "@tanstack/react-router";
import {
  Bell, BookOpen, Brain, CalendarDays, FileText, LayoutDashboard, LineChart, Users,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" as const },
  { label: "Macro Desk", icon: LineChart, to: "/macro-desk" as const },
  { label: "Journal", icon: BookOpen },
  { label: "Psychology", icon: Brain },
  { label: "Calendar", icon: CalendarDays },
  { label: "Reports", icon: FileText },
  { label: "Community", icon: Users },
];

export function MacroSidebar({ active }: { active: string }) {
  return (
    <aside className="macro-sidebar">
      <div className="macro-brand"><span className="brand-mark">H</span><b>HybridTrader</b></div>
      <nav className="macro-nav">
        {navigation.map(({ label, icon: Icon, to }) => to ? (
          <Link key={label} to={to} className={`nav-item ${label === active ? "active" : ""}`} title={label}><Icon/><span>{label}</span></Link>
        ) : <button key={label} className="nav-item" title={label}><Icon/><span>{label}</span></button>)}
      </nav>
    </aside>
  );
}

export function MacroTopbar() {
  return (
    <header className="macro-topbar">
      <button className="icon-button" title="Notifications"><Bell/><i/></button>
      <div className="avatar">R</div>
    </header>
  );
}
