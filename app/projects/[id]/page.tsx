// app/projects/[id]/page.jsx
import { getProjectsByCategory } from "@/app/actions/projectActions";
import { prisma } from "@/lib/prisma";

// Generate static params to pre-render pages for all categories
export async function generateStaticParams() {
    const categories = await prisma.category.findMany({
        select: { id: true }, // Only fetch category IDs
    });

    return categories.map((category: any) => ({
        id: category.id.toString(), // Convert to string as params expects strings
    }));
}

// Server Component with SSG
export default async function ProjectPage({ params }: { params: { id: string } }) {
    const categoryId = Number(params.id); // Convert id from string to number

    const response = await getProjectsByCategory(categoryId);

    if (response.status !== 200) {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">Projects</h1>
                <p>Error: {response.message}</p>
            </div>
        );
    }

    const projects = response.data;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Projects</h1>
            {projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="relative h-[400px] w-full overflow-hidden rounded-md">
                                <img
                                    src={project.url}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No projects found for this category.</p>
            )}
        </div>
    );
}

// Optional: Add revalidation time (ISR) if data changes frequently
export const revalidate = 3600; // Revalidate every hour (in seconds)