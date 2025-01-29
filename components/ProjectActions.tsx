// app/components/ProjectActions.tsx (Client Component)
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteProject, updateProject } from "@/app/actions/projectActions";

export default function ProjectActions({ project }: { project: { id: number; title: string; category: string; url: string; } }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: project.title, category: project.category, url: project.url });

  async function handleDelete() {
    await deleteProject(project.id);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    await updateProject(project.id, formData);
    setIsEditing(false);
  }

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-2">
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="p-2 border rounded w-full" />
          <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="p-2 border rounded w-full" />
          <input type="text" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} className="p-2 border rounded w-full" />
          <Button type="submit" className="bg-green-500 text-white">Save</Button>
          <Button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white">Cancel</Button>
        </form>
      ) : (
        <div className="space-x-2">
          <Button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white">Edit</Button>
          <Button onClick={handleDelete} className="bg-red-500 text-white">Delete</Button>
        </div>
      )}
    </div>
  );
}
