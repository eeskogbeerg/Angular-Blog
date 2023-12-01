// Import necessary modules from Angular core
import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Import BlogService to interact with blog data
import { BlogService } from '../blog.service';

// Component decorator to define metadata for the component
@Component({
  selector: 'app-about', // Selector for the component in HTML
  templateUrl: './about.component.html', // HTML template for the component
  styleUrls: ['./about.component.css'] // Stylesheet for the component
})

// AboutComponent class definition
export class AboutComponent { 
  // Constructor to initialize the component with Router and BlogService
  constructor(private router: Router, public blogService: BlogService) {
    // Assign the instance of BlogService as a property in the component
    this.blogService = blogService; 

    // Get the owner mode status from BlogService
    this.isOwnerMode = this.blogService.isOwnerPerspective();

    // Get the content for the "About Us" page from BlogService
    this.aboutContent = this.blogService.getAboutContent();
  }

  // Property to track whether the application is in owner mode
  isOwnerMode: boolean = false;

  // Property to store the content of the "About Us" page
  aboutContent: string = '';

  // Properties for the contact form
  contactName: string = '';
  contactEmail: string = '';
  contactMessage: string = '';

  // Method to submit the contact form
  submitContactForm() {
    // Log data to the console
    console.log('Namn:', this.contactName);
    console.log('E-post:', this.contactEmail);
    console.log('Meddelande:', this.contactMessage);

    // Reset fields to empty strings after submitting the form
    this.contactName = '';
    this.contactEmail = '';
    this.contactMessage = '';
  }

  // Method to navigate to the editing page for "About Us"
  editAbout() {
    this.router.navigate(['/edit-about']);
  }
}
