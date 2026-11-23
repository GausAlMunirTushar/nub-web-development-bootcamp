import Link from "next/link";

export const metadata = {
  title: "Dashboard | CampusConnect",
  description: "A sample dashboard route for CampusConnect.",
};

const projects = [
  { name: "Web Development", detail: "Bootcamp project", progress: "80%" },
  { name: "Campus Events", detail: "Team assignment", progress: "55%" },
  { name: "Study Planner", detail: "Personal project", progress: "35%" },
];

export default function DashboardPage() {
  return (
    <main className="content-page container">
      <section className="dashboard-heading">
        <div>
          <p className="eyebrow">Dashboard · /dashboard</p>
          <h1>Your projects</h1>
          <p className="lead">
            This page lives in <code>src/app/dashboard/page.js</code>.
          </p>
        </div>
        <Link className="button" href="/about">
          About this project
        </Link>
      </section>

      <section className="project-grid" aria-label="Sample projects">
        {projects.map((project, index) => (
          <article className="project-card" key={project.name}>
            <div className={`project-icon project-icon-${index + 1}`}>
              0{index + 1}
            </div>
            <p className="project-detail">{project.detail}</p>
            <h2>{project.name}</h2>
            <div className="progress-label">
              <span>Progress</span>
              <strong>{project.progress}</strong>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label={`${project.name} progress`}
              aria-valuenow={Number.parseInt(project.progress, 10)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ width: project.progress }} />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
