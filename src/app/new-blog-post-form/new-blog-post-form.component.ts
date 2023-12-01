import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-new-blog-post-form',
  templateUrl: './new-blog-post-form.component.html',
  styleUrls: ['./new-blog-post-form.component.css']
})
export class NewBlogPostFormComponent {
  // Define a FormGroup to represent the blog post form
  blogPostForm: FormGroup;

  // Constructor to initialize the form using FormBuilder and inject BlogService
  constructor(private formBuilder: FormBuilder, private blogService: BlogService) {
    // Create the form structure with form controls and validators
    this.blogPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      thumbnailUrl: [''],
      secondImageUrl: [''],
      body: ['', Validators.required]
    });
  }

  // Define the onSubmit method to handle form submission
  onSubmit() {
    // Check if the form is valid
    if (this.blogPostForm.valid) {
      // Create a new blog post object using the form values
      const newPost = {
        title: this.blogPostForm.value.title,
        thumbnailUrl: this.blogPostForm.value.thumbnailUrl,
        secondImageUrl: this.blogPostForm.value.secondImageUrl,
        body: this.blogPostForm.value.body,
        creationDate: new Date(),
        likes: 0,
        dislikes: 0,
        comments: []
      };

      // Add the new blog post using the BlogService
      this.blogService.addBlogPost(newPost);

      // Log the new blog post and reset the form
      console.log('New blog post added:', newPost);
      this.blogPostForm.reset();
    }
  }
}
