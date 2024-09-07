export type CategoryType = {
  id: string;
  slug: string;
  title: string;
  image: string;
}

export type PostType = {
  id: string;
  title: string;
  desc: string;
  content: string;
  cateSlug: string;
  createdAt: string;
  slug: string;
  image?: string;
  views: number;
  userEmail: string;
  user: {
    id: string;
    name: string;
    image: string;
    emailVerified?: boolean;
    email: string;
  }
  editorPick: boolean;
}

export type Comment = {
  id: string;
  desc: string;
  createdAt: string;
  userEmail: string;
  user: {
    id: string;
    name: string;
    image: string;
    emailVerified?: boolean;
    email: string;
  }
  postSlug: string;
}