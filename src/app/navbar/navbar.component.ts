// Importing necessary modules from Angular core and router
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// Importing the BlogService for accessing blog-related functionality
import { BlogService } from '../blog.service';

@Component({
  // Component metadata, specifying the selector, template, and styles
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Property to track whether the current user is the owner
  isOwner: boolean = false;

  // Constructor with injected Router and BlogService instances
  constructor(private router: Router, public blogService: BlogService) {}

  // Lifecycle hook - ngOnInit runs after the component has been initialized
  ngOnInit() {
    // Initialize isOwner based on the owner perspective from BlogService
    this.isOwner = this.blogService.isOwnerPerspective();
  }

  // Method to switch between user and owner perspectives
  switchPerspective(perspective: string) {
    // Navigate to the corresponding route based on the selected perspective
    if (perspective === 'user') {
      this.router.navigate(['/user']);
    } else if (perspective === 'owner') {
      this.router.navigate(['/owner']);
    }
    // Update the isOwner property based on the selected perspective
    this.isOwner = perspective === 'owner';
  }

  // Method to handle the click event when adding a new blog post
  addNewPostClick() {
    // Navigate to the route for creating a new blog post
    this.router.navigate(['/new-blog-post-form']);
  }
}
