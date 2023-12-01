import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogPost } from '../blog.model';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  // Flag to determine if the user is in the owner's perspective
  isOwner: boolean;

  // Array to store blog posts
  posts: BlogPost[] = [];

  // Constructor to initialize the component with Router and BlogService
  constructor(private router: Router, public blogService: BlogService) {
    // Set the owner perspective using the BlogService
    this.blogService.setOwnerPerspective(true);

    // Get the current owner perspective
    this.isOwner = this.blogService.isOwnerPerspective();

    // Get the initial set of blog posts
    this.posts = this.blogService.getBlogPosts();
  }

  // Lifecycle hook called after Angular has initialized the component
  ngOnInit() {
    // Retrieve the blog posts again on component initialization
    this.posts = this.blogService.getBlogPosts();
  }

  // Navigate to the "Edit About" page
  openEditAbout() {
    this.router.navigate(['/edit-about']);
  }

  // Navigate to the "New Blog Post Form" page to create a new post
  createNewPost() {
    this.router.navigate(['/new-blog-post-form']);
  }

  // Handle the event emitted when a new blog post is created
  onNewBlogPost(newPost: BlogPost) {
    // Add the new blog post to the service
    this.blogService.addBlogPost(newPost);

    // Update the posts array with the latest blog posts
    this.posts = this.blogService.getBlogPosts();
  }
}
