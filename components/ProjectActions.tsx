"use client";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteProject, updateProject } from "@/app/actions/projectActions";
import { Upload, Loader2, X, Pencil, Trash2, Link2, ImageIcon, LayoutTemplate } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function ProjectActions({ project }: { 
  project: { 
    id: number; 
    title: string; 
    category: string; 
    url: string; 
    imageUrl?: string; 
}}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: project.title,
    category: project.category,
    url: project.url,
    imageFile: null as File | null,
    imageUrl: project.imageUrl || "",
  });

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
        console.log(imageUrl)
        if (formData.imageFile) {
          const cloudinaryUrl = await uploadImageToCloudinary(formData.imageFile);
          imageUrl = cloudinaryUrl;
        }

        await updateProject(project.id, { 
          title: formData.title,
          category: formData.category,
          url: imageUrl,
          // imageUrl
        });

        setIsEditing(false);
        toast({ title: "Project updated successfully" });
      } catch (error) {
        toast({ title: "Error updating project", variant: "destructive" });
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          {isEditing ? "Edit Project" : project.title}
        </h1>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          className="rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isEditing ? (
            <X className="w-5 h-5 text-red-600" />
          ) : (
            <Pencil className="w-5 h-5 text-gray-600" />
          )}
        </Button>
      </div>

      {isEditing ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Edit Form */}
          <div className="space-y-6">
            <div className="bg-glass p-6 rounded-xl shadow-inset">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-purple-600" />
                Project Details
              </h2>
              
              <div className="space-y-4">
                <InputField 
                  icon={<Pencil className="w-4 h-4" />}
                  label="Title"
                  value={formData.title}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, title: e.target.value }))}
                />
                <InputField 
                  icon={<LayoutTemplate className="w-4 h-4" />}
                  label="Category"
                  value={formData.category}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, category: e.target.value }))}
                />
                <InputField 
                  icon={<Link2 className="w-4 h-4" />}
                  label="Project URL"
                  type="url"
                  value={formData.url}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setFormData(p => ({ ...p, url: e.target.value }))}
                />
              </div>
            </div>

            <div className="bg-glass p-6 rounded-xl shadow-inset">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                Media Upload
              </h2>
              
              <label className="group relative aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition-colors">
                {formData.imageUrl ? (
                  <>
                    <Image
                      src={formData.imageUrl}
                      alt="Preview"
                      fill
                      className="object-cover rounded-xl group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload className="w-8 h-8 text-white mb-2" />
                      <span className="text-white text-sm">Click to replace image</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2 group-hover:text-purple-500" />
                    <span className="text-gray-500 group-hover:text-purple-500">Drag & drop or click to upload</span>
                    <span className="text-sm text-gray-400 mt-1">PNG, JPG (max 5MB)</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-glass p-6 rounded-xl h-fit sticky top-6 shadow-inset">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              Live Preview
            </h2>
            
            <div className="border rounded-xl overflow-hidden">
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
              <div className="p-4">
                <h3 className="font-semibold text-lg">{formData.title || "Project Title"}</h3>
                <p className="text-sm text-gray-500">{formData.category || "Category"}</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-purple-600">
                  <Link2 className="w-4 h-4" />
                  <span>{formData.url || "your-project-url.com"}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isPending}
                className="text-black"
              >
                Discard
              </Button>
              <Button 
                onClick={handleUpdate} 
                disabled={isPending}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
                {isPending ? "Saving..." : "Publish Changes"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* View Mode */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-glass p-6 rounded-xl shadow-inset">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
              {project.imageUrl && (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            
            <div className="space-y-4">
              <DetailItem label="Title" value={project.title} />
              <DetailItem label="Category" value={project.category} />
              <DetailItem label="URL" value={project.url} />
            </div>
          </div>

          <div className="bg-glass p-6 rounded-xl shadow-inset h-fit sticky top-6">
            <h2 className="text-lg font-semibold mb-6">Project Actions</h2>
            <div className="space-y-4">
              <Button 
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="w-full justify-start gap-2 text-black hover:bg-purple-50"
              >
                <Pencil className="w-4 h-4" />
                Edit Project
              </Button>
              <Button 
                onClick={handleDelete}
                variant="outline"
                className="w-full justify-start gap-2 text-red-600 hover:bg-red-50"
                disabled={isPending}
              >
                <Trash2 className="w-4 h-4" />
                {isPending ? "Deleting..." : "Delete Project"}
              </Button>
            </div>
          </div>
        </div>
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
      className="bg-white/50 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
    />
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="border-b pb-3 last:border-0">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
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