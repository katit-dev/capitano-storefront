import { atom } from "jotai";

export type ContentPreviewData = {
  image: string;
  imageAlt?: string;
  title: string;
  description?: string;
};

export type ContentPreview = {
  content: ContentPreviewData;
  mode: "image" | "details";
};

export const contentPreviewAtom = atom<ContentPreview | null>(null);
