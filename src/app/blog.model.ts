export interface BlogPost {
  id?: number; // An optional number for identifying the blog post
  title: string; // The title of the blog post
  thumbnailUrl: string; // URL for an image or thumbnail associated with the blog post
  secondImageUrl: string; // URL for a second image or thumbnail associated with the blog post
  body: string; // Content of the blog post
  creationDate: Date; // Date when the blog post was created
  likes: number; // Number of likes for the blog post
  dislikes: number; // Number of dislikes for the blog post
  comments: string[]; // Array of comments or another structure to store comments
}
