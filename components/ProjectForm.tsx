// app/components/ProjectForm.tsx (Client Component)
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createProject } from "@/app/actions/projectActions";

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    url: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.url) return;
    try {
      const res = await createProject(formData);
      console.log("response", res);
      setFormData({ title: "", category: "", url: "" });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="p-2 border rounded w-full"
      />
      <input
        type="text"
        placeholder="URL"
        value={formData.url}
        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        className="p-2 border rounded w-full"
      />
      <Button type="submit" className="bg-blue-500 text-white">
        Create Project
      </Button>
    </form>
  );
}
