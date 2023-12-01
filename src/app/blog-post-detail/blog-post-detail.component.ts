import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogPost } from '../blog.model';

@Component({
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.css']
})
export class BlogPostDetailComponent implements OnInit {
  postId: number;
  // Initialize a default blog post structure
  post: BlogPost = {
    id: 0,
    title: '',
    thumbnailUrl: '',
    secondImageUrl: '',
    body: '',
    creationDate: new Date(),
    likes: 0,
    dislikes: 0,
    comments: []
  };
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) {
    // Default post ID
    this.postId = 0;
  }
  
  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.params.subscribe(params => {
      // Extract the 'id' parameter from the route
      const id = +params['id'];
  
      // Check if the 'id' is a valid number
      if (!isNaN(id)) {
        // Set the post ID
        this.postId = id;
  
        // Fetch the blog post details from the service based on the ID
        const fetchedBlogPost = this.blogService.getBlogPostById(this.postId);
        
        // Check if the fetched blog post exists
        if (fetchedBlogPost) {
          // If additional details are available, use them; otherwise, use the basic structure
          this.post = {
            id: fetchedBlogPost.id || 0,
            title: fetchedBlogPost.title || '',
            thumbnailUrl: fetchedBlogPost.thumbnailUrl || '',
            secondImageUrl: fetchedBlogPost.secondImageUrl || '',
            body: fetchedBlogPost.body || '',
            creationDate: fetchedBlogPost.creationDate || new Date(),
            likes: fetchedBlogPost.likes || 0,
            dislikes: fetchedBlogPost.dislikes || 0,
            comments: fetchedBlogPost.comments || [],
          };
  
          // Fetch saved comments from localStorage for the current blog post
          const savedComments = localStorage.getItem(`blog_post_${this.postId}_comments`);
          if (savedComments) {
            this.post.comments = JSON.parse(savedComments);
          }
  
          // Load likes and dislikes from localStorage
          this.loadLikesFromLocalStorage();
        } else {
          console.error(`Blog post with ID ${this.postId} not found.`);
        }
      } else {
        console.error(`Invalid or undefined ID provided.`);
      }
    });
  }

  // Increment the 'likes' count for the post
  likePost() {
    this.post.likes++;
    this.saveLikesToLocalStorage();
  }

  // Increment the 'dislikes' count for the post
  dislikePost() {
    this.post.dislikes++;
    this.saveLikesToLocalStorage();
  }

  // Save 'likes' and 'dislikes' counts to localStorage
  private saveLikesToLocalStorage() {
    const likesKey = `blog_post_${this.postId}_likes`;
    localStorage.setItem(likesKey, JSON.stringify({ likes: this.post.likes, dislikes: this.post.dislikes }));
  }

  // Load 'likes' and 'dislikes' counts from localStorage
  private loadLikesFromLocalStorage() {
    const likesKey = `blog_post_${this.postId}_likes`;
    const savedLikes = localStorage.getItem(likesKey);

    if (savedLikes) {
      const { likes, dislikes } = JSON.parse(savedLikes);
      this.post.likes = likes;
      this.post.dislikes = dislikes;
    }
  }

  // Add a comment to the post
  addComment() {
    // Check if the new comment is not empty
    if (this.newComment.trim() !== '') {
      // Add the new comment to the post
      this.post.comments.push(this.newComment);
      this.newComment = '';

      // Filter out empty comments and save to localStorage
      const nonEmptyComments = this.post.comments.filter(comment => comment.trim() !== '');
      localStorage.setItem(`blog_post_${this.postId}_comments`, JSON.stringify(nonEmptyComments));
    }
  }
}
