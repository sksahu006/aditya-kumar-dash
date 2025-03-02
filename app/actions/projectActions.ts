"use server";
import { prisma } from "@/lib/prisma";
import { Project, ProjectWithCategory } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createProject(data: Project) {
  try {
    const newProject = await prisma.portFolioProject.create({
      data,
    });
     // Revalidate dashboard
     revalidatePath("/dashboard");

    return {
      status: 200,
      data: newProject,
      message: "Project created successfully",
    };
  } catch (e) {
    console.log("error--->", e);
    return {
      status: 500,
      data: null,
      message: "Failed to create project",
    };
  }
}

export async function updateProject(id: number, data: Project) {
  try {
    const updatedProject = await prisma.portFolioProject.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard");

    return {
      status: 200,
      data: updatedProject,
      message: "Project updated successfully",
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      data: null,
      message: "Failed to update project",
    };
  }
}

export async function deleteProject(id: number) {
  try {
    const deletedProject = await prisma.portFolioProject.delete({
      where: {
        id,
      },
    });
    revalidatePath("/dashboard");

    return {
      status: 200,
      data: deletedProject,
      message: "Project deleted successfully",
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      data: null,
      message: "Failed to delete project",
    };
  }
}

export async function getProjects(categoryId: number | null, limit = 10, page = 1) {
  try {
    const skip = (page - 1) * limit;
    const projects = await prisma.portFolioProject.findMany({
      skip,
      take: limit,
      where: {
        categoryId: categoryId || undefined,
      },
      include: {
        category: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const totalCount = await prisma.portFolioProject.count({
      where: {
        categoryId: categoryId || undefined,
      },
    });

    return {
      status: 200,
      data: projects as ProjectWithCategory[],
      totalCount,
      message: "Projects fetched successfully",
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      data: null,
      message: "Failed to fetch projects",
    };
  }
}

export async function getProjectsByCategory(category: number) {
  try {
    const projects = await prisma.portFolioProject.findMany({
      where: {
        categoryId: category,
      },
      include: {
        category: true,
      },
    });
    revalidatePath("/dashboard");
    return {
      status: 200,
      data: projects,
      message: "Projects fetched successfully",
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      data: null,
      message: "Failed to fetch projects",
    };
  }
}

export async function getCategories (){
  try {
    const categories = await prisma.category.findMany();
    revalidatePath("/dashboard");
    return {
      status: 200,
      data: categories,
      message: "Categories fetched successfully",
    }
}catch(err){
  console.log(err)
  return {
    status: 500,
    data: null,
    message: "Failed to fetch categories",
  };
  }
}
