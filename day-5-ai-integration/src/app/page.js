import Dashboard from "@/components/Dashboard";
import { connection } from "next/server";
import { Suspense } from "react";

async function loadInitialProjects() {
  const apiUrl =
    process.env.CAMPUS_API_URL || "http://127.0.0.1:3004";

  try {
    const response = await fetch(`${apiUrl}/api/projects`, {
      cache: "no-store",
    });
    const payload = await response.json();

    if (!response.ok) {
      return {
        projects: [],
        error: payload.error || `Could not load projects (${response.status}).`,
      };
    }

    return { projects: payload.projects, error: "" };
  } catch (error) {
    return {
      projects: [],
      error: `Could not connect to the Day 4 API: ${error.message}`,
    };
  }
}

async function DashboardPage() {
  await connection();
  const { projects, error } = await loadInitialProjects();
  return <Dashboard initialProjects={projects} initialError={error} />;
}

function DashboardFallback() {
  return (
    <main className="page-fallback" role="status">
      Loading your project workspace…
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardPage />
    </Suspense>
  );
}
