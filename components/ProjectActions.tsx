"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteProject, getCategories, updateProject } from "@/app/actions/projectActions";
import { Upload, Loader2, X, Pencil, Trash2, Link2, ImageIcon, LayoutTemplate } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectActions({ project }: {
  project: {
    id: number;
    title: string;
    category?: { name: string; id: number; } | null;
    categoryId: number | null;
    url: string;
    imageUrl?: string;
  }
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<{ id: number; name: string; }[] | null>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: project.title,
    categoryId: project.categoryId,
    url: project.url,
    imageFile: null as File | null,
    imageUrl: project.imageUrl || "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data?.data);
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteProject(project.id);
      toast({ title: "Project deleted successfully" });
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        let imageUrl = formData.url;
        if (formData.imageFile) {
          const cloudinaryUrl = await uploadImageToCloudinary(formData.imageFile);
          imageUrl = cloudinaryUrl;
        }

        await updateProject(project.id, {
          title: formData.title,
          categoryId: formData.categoryId,
          url: imageUrl,
        });

        setIsEditing(false);
        toast({ title: "Project updated successfully" });
      } catch (error) {
        toast({ title: "Error updating project", variant: "destructive" });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        >
          {isEditing ? "Edit Project" : project.title}
        </motion.h1>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          size="sm"
          className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          {isEditing ? (
            <X className="w-4 h-4 text-red-600" />
          ) : (
            <Pencil className="w-4 h-4 text-gray-600" />
          )}
        </Button>
      </div>

      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Edit Form */}
          <div className="space-y-4">
            <Card className="p-4 hover:shadow-md transition-shadow">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4 text-purple-600" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <InputField
                  icon={<Pencil className="w-4 h-4" />}
                  label="Title"
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, title: e.target.value }))}
                />
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium">Category</label>
                  <div className="relative">
                    <LayoutTemplate className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                      className="border rounded-md p-2 pl-10 text-sm w-full hover:border-purple-500 transition-colors"
                      value={formData.categoryId?.toString() ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          categoryId: value === "" ? null : Number(value),
                        }));
                      }}
                    >
                      <option value="" disabled>Select a category</option>
                      {categories?.map((category) => (
                        <option key={category.id} value={category.id.toString()}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <InputField
                  icon={<Link2 className="w-4 h-4" />}
                  label="Project URL"
                  type="url"
                  value={formData.url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, url: e.target.value }))}
                />
              </CardContent>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-purple-600" />
                  Media Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <label className="group relative aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                  {formData.imageUrl ? (
                    <>
                      <Image
                        src={formData.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="w-6 h-6 text-white mb-2" />
                        <span className="text-white text-sm">Click to replace image</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-gray-400 mb-2 group-hover:text-purple-500" />
                      <span className="text-gray-500 group-hover:text-purple-500">Drag & drop or click to upload</span>
                      <span className="text-xs text-gray-400 mt-1">PNG, JPG (max 5MB)</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <Card className="p-4 h-fit sticky top-4 hover:shadow-md transition-shadow">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border rounded-lg overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  {formData.imageUrl && (
                    <Image
                      src={formData.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-md">{formData.title || "Project Title"}</h3>
                  <p className="text-sm text-gray-500">{formData.categoryId}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-purple-600">
                    <Link2 className="w-4 h-4" />
                    <span>{formData.url || "your-project-url.com"}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isPending}
                  size="sm"
                  className="text-black hover:bg-gray-100"
                >
                  Discard
                </Button>
                <Button
                  onClick={handleUpdate}
                  disabled={isPending}
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                  {isPending ? "Saving..." : "Publish Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* View Mode */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
              {project.imageUrl && (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="space-y-3">
              <DetailItem label="Title" value={project.title} />
              <DetailItem label="Category" value={project?.category ? project?.category?.name : ""} />
              <DetailItem label="URL" value={project.url} />
            </div>
          </Card>

          <Card className="p-4 h-fit sticky top-4 hover:shadow-md transition-shadow">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-semibold">Project Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-2">
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 text-black hover:bg-purple-50"
              >
                <Pencil className="w-4 h-4" />
                Edit Project
              </Button>
              <Button
                onClick={handleDelete}
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2 text-red-600 hover:bg-red-50"
                disabled={isPending}
              >
                <Trash2 className="w-4 h-4" />
                {isPending ? "Deleting..." : "Delete Project"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

const InputField = ({ icon, label, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium flex items-center gap-2">
      {icon}
      {label}
    </label>
    <Input
      {...props}
      className="bg-white/50 border-gray-200 focus:border-purple-500 focus:ring-purple-500 text-sm"
    />
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string | number | null }) => (
  <div className="border-b pb-2 last:border-0">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-sm">{value}</p>
  </div>
);

// Cloudinary upload function remains the same
async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) throw new Error("Image upload failed");
  const data = await response.json();
  return data.secure_url;
}