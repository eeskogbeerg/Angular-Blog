import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogPost } from '../blog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Flag to determine if the user is the owner
  isOwner: boolean;
  
  // Array to store blog posts
  blogPosts: BlogPost[] = [];

  // Constructor to initialize the component with required services
  constructor(private router: Router, public blogService: BlogService) {
    // Set the isOwner flag based on the owner perspective from BlogService
    this.isOwner = this.blogService.isOwnerPerspective();
  }

  // Lifecycle hook - ngOnInit is called after the component is initialized
  async ngOnInit(): Promise<void> {
    // Call the method to update the list of blog posts
    this.updateBlogPosts();
  }

  // Private method to update the list of blog posts
  private updateBlogPosts() {
    try {
      // Fetch blog posts from the service
      this.blogPosts = this.blogService.getBlogPosts();

      // Check for stored posts in localStorage
      const storedPosts = localStorage.getItem('blogPosts');
      if (storedPosts) {
        const newPosts = JSON.parse(storedPosts);

        // Add new posts to the existing ones if they don't already exist
        newPosts.forEach((newPost: BlogPost) => {
          const exists = this.blogPosts.some(post => post.id === newPost.id);
          if (!exists) {
            this.blogPosts.push(newPost);
          }
        });
      }

      // Add hardcoded posts to the existing posts
      const hardcodedPosts = this.blogService.getHardcodedBlogPosts();
      this.blogPosts = [...this.blogPosts, ...hardcodedPosts];
    } catch (error) {
      console.error('Error fetching and adding blog posts:', error);
    }
  }

  // Method to delete a specific blog post
  deletePost(postId: number | undefined) {
    if (postId === undefined) {
      console.error('Invalid post ID:', postId);
      return;
    }

    // Confirm deletion with the user
    if (confirm('Are you sure you want to delete this post?')) {
      // Remove the blog post using the service
      this.blogService.removeBlogPost(postId);
      // Update blog posts after removing a post
      this.updateBlogPosts();
    }
  }

  // Method to view details for a specific blog post
  viewPostDetails(postId: number) {
    console.log('View Details clicked for post ID:', postId);
    // Navigate to the blog-post-detail component with the selected post's ID
    this.router.navigate(['/blog', postId]);
  }
}
