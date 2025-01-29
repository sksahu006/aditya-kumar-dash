// app/dashboard/page.tsx (Server Component)

import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";

export default async function Dashboard() {

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ProjectForm />
      <ProjectList />
    </div>
  );
}
