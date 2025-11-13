export interface ContentItem {
  id: number;
  title: string;
  images: {
    artwork_portrait: string;
  };
}

export interface ApiResponse {
  collection: ContentItem[];
}
