import { Component } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent {
  aboutContent: string = ''; // Content for the "About Me" page

  constructor(private blogService: BlogService, private router: Router) {
    // Retrieve the existing "About Me" text from BlogService
    this.aboutContent = this.blogService.getAboutContent();
  }

  saveAbout() {
    // Save the edited changes in the "About Me" text using BlogService
    this.blogService.saveAboutContent(this.aboutContent);

    // Navigate back to the "About Me" page after saving
    this.router.navigate(['/about']);
  }

  shouldShowForm(): boolean {
    // Retrieve the ownership mode from BlogService
    const isOwnerMode = this.blogService.isOwnerPerspective();
    return isOwnerMode;
  }
}
