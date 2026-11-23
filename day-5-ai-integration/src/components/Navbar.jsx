import Link from "next/link";

const navigationItems = [
  { href: "#projects", label: "Projects" },
  { href: "#ai-workflow", label: "AI workflow" },
  { href: "#architecture", label: "Architecture" },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">
            C
          </span>
          <span>CampusConnect</span>
        </Link>
        <div className="nav-links">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <span className="nav-badge">
            <span aria-hidden="true">✦</span> AI-ready
          </span>
        </div>
      </nav>
    </header>
  );
}
