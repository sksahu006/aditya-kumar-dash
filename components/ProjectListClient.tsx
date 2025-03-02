"use client";

import { useState } from "react";
import ProjectActions from "./ProjectActions";
import { ProjectWithCategory } from "@/lib/types";
import {  getProjects } from "@/app/actions/projectActions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

interface ProjectListClientProps {
  initialProjects: ProjectWithCategory[];
  initialCategories: { id: number; name: string }[];
  totalCount: number;
}

export default function ProjectListClient({ initialProjects, initialCategories, totalCount }: ProjectListClientProps) {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [projects, setProjects] = useState(initialProjects);
  const [categories] = useState(initialCategories);
  const [totalProjects, setTotalProjects] = useState(totalCount);
  const limit = 5;

  const handleCategoryChange = async (value: string) => {
    const newCategoryId = value === "all" ? null : Number(value); // Use "all" for the default option
    setCategoryId(newCategoryId);
    setPage(1);
    const { data, totalCount } = await getProjects(newCategoryId, limit, 1);
    setProjects(data ?? []);
    setTotalProjects(totalCount as number);
  };

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    const { data, totalCount } = await getProjects(categoryId, limit, newPage);
    setProjects(data ?? []);
    setTotalProjects(totalCount as number);
  };

  return (
    <div className="space-y-4">
      {/* Category Select Dropdown */}
      <Select onValueChange={handleCategoryChange} value={categoryId?.toString() || "all"}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem> {/* Use "all" as the value */}
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category?.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Project List */}
      <ul className="space-y-3">
        {projects?.map((project: ProjectWithCategory) => (
          <li key={project.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-600">{project?.category?.name}</p>
              {project.url && <img src={project.url} alt={project.title} className="w-24 h-24 object-cover mt-2" />}
              <a href={project.url} target="_blank" className="text-blue-500">
                Visit Project
              </a>
            </div>
            <ProjectActions project={project} />
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </Button>
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm">
              Page {page} of {Math.ceil(totalProjects / limit)}
            </span>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= Math.ceil(totalProjects / limit)}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}