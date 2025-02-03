// app/components/ProjectList.tsx (Server Component)
import { getProjects } from "@/app/actions/projectActions";
import { PortFolioProject } from "@prisma/client";
import ProjectActions from "./ProjectActions";

export default async function ProjectList() {
  const { status, data, message } = await getProjects();

  if (status !== 200) {
    return <div>{message}</div>;
  }

  if (data?.length === 0) {
    return <div>No projects found</div>;
  }

  return (
    <ul className="space-y-3">
      {data?.map((project: PortFolioProject) => (
        <li key={project.id} className="p-4 border rounded flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-600">{project.category}</p>
            {project.url && (
              <img src={project.url} alt={project.title} className="w-24 h-24 object-cover mt-2" />
            )}
            <a href={project.url} target="_blank" className="text-blue-500">
              Visit Project
            </a>
          </div>
          <ProjectActions project={project} />
        </li>
      ))}
    </ul>
  );
}