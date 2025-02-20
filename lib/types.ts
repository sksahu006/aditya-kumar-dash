export type Project = {
  title: string;
  url: string;
  categoryId: number | null;
};

export type ProjectWithCategory = {
  id: number;
  title: string;
  url: string;
  categoryId: number | null;
  category?: {
    name: string;
    id: number;
  } | null;
};
