import { getCategories, getProjects } from "@/app/actions/projectActions";
import ProjectListClient from "./ProjectListClient";
import { ProjectWithCategory } from "@/lib/types";

export default async function ProjectList() {
  const { status, data, message, totalCount } = await getProjects(null, 10, 1);
  const { data: categories } = await getCategories();

  if (status !== 200) {
    return <div>{message}</div>;
  }

  if (data?.length === 0) {
    return <div>No projects found</div>;
  }

  return (
    <ProjectListClient initialProjects={data ?? []} initialCategories={categories ?? []} totalCount={totalCount as number} />
  );
}
