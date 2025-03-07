// app/api/random-projects/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allProjects = await prisma.portFolioProject.findMany();
    // Shuffle projects and take the first 10
    const randomProjects = allProjects
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    return NextResponse.json(randomProjects);
  } catch (error) {
    console.error("Error fetching random projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch random projects" },
      { status: 500 }
    );
  }
}