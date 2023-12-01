import { Component } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent { 
  // Constructor to initialize the component with BlogService
  constructor(private blogService: BlogService) {
    // Set the owner perspective to false when in the user view
    this.blogService.setOwnerPerspective(false);
  }
}
