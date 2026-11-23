import Link from "next/link";

export const metadata = {
  title: "About | CampusConnect",
  description: "Learn about the CampusConnect student project workspace.",
};

export default function AboutPage() {
  return (
    <main className="content-page container">
      <section className="content-panel">
        <p className="eyebrow">About · /about</p>
        <h1>Built for campus teams.</h1>
        <p className="lead">
          CampusConnect is a sample project workspace that helps students
          organize assignments, collaborate with teammates, and track progress.
        </p>
        <div className="learning-note">
          <h2>Why this URL?</h2>
          <p>
            In the App Router, the <code>src/app/about/page.js</code> file
            creates the <code>/about</code> route. The root layout and navigation
            are shared automatically.
          </p>
        </div>
        <Link className="text-link" href="/dashboard">
          See the dashboard <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
