"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProject, getCategories } from "@/app/actions/projectActions";
import { useToast } from "@/hooks/use-toast";

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    categoryId: 1,
    url: "",
    imageFile: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id:number, name: string }[] | null>(null);
  const { toast } = useToast();

    useEffect(() => {
      const fetchCategories = async () => {
        const data = await getCategories();
        setCategories(data?.data);
      };
      fetchCategories();
    }, []);
  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title || !formData.categoryId) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      let cloudinaryImageUrl = formData.url;
      if (formData.imageFile) {
        cloudinaryImageUrl = await uploadImageToCloudinary(formData.imageFile);
      }

      await createProject({
        title: formData.title,
        categoryId: formData.categoryId,
        url: cloudinaryImageUrl,
      });

      toast({ title: "Success", description: "Project created successfully" });
      setFormData({ title: "", categoryId: 1, url: "", imageFile: null });
    } catch (error) {
      toast({ title: "Error", description: "Failed to create project", variant: "destructive" });
      console.error("Error creating project:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md max-w-md mx-auto">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          className="text-black"
          placeholder="Enter project title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          className="text-black w-full p-2 border rounded-md"
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
        >
          <option disabled value="">Select Category</option>
          {categories?.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category?.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="image">Upload Image</Label>
        <Input className="text-black" id="image" type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating..." : "Create Project"}
      </Button>
    </form>
  );
}

async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "");

  const response = await fetch("https://api.cloudinary.com/v1_1/" + process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME + "/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to upload image");
  const data = await response.json();
  return data.secure_url;
}
