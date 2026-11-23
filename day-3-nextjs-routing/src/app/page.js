import Link from "next/link";

const routeCards = [
  {
    number: "01",
    title: "Home",
    path: "/",
    description: "The root route, rendered by src/app/page.js.",
  },
  {
    number: "02",
    title: "About",
    path: "/about",
    description: "A nested route from the app/about/page.js folder.",
  },
  {
    number: "03",
    title: "Dashboard",
    path: "/dashboard",
    description: "Another route, created by app/dashboard/page.js.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-content">
          <p className="eyebrow">Day 3 · Next.js App Router</p>
          <h1>One folder.<br />One route.</h1>
          <p className="hero-description">
            Explore how Next.js maps folders to pages and shares a common
            layout across a CampusConnect website.
          </p>
          <Link className="button" href="/dashboard">
            Explore dashboard
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="hero-decoration" aria-hidden="true">
          <span className="decor-card decor-card-one">app/</span>
          <span className="decor-card decor-card-two">page.js</span>
          <span className="decor-orbit" />
        </div>
      </section>

      <section className="routes-section container" aria-labelledby="routes-title">
        <div className="section-heading">
          <p className="eyebrow">Routing in action</p>
          <h2 id="routes-title">Explore the pages</h2>
          <p>Each card points to a route created by the App Router.</p>
        </div>
        <div className="route-grid">
          {routeCards.map((route) => (
            <article className="route-card" key={route.path}>
              <span className="route-number">{route.number}</span>
              <h3>{route.title}</h3>
              <code>{route.path}</code>
              <p>{route.description}</p>
              <Link href={route.path} aria-label={`Visit ${route.title} page`}>
                Visit page <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
