import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { OwnerComponent } from './owner/owner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';

import { EditAboutComponent } from './edit-about/edit-about.component';
import { FooterComponent } from './footer/footer.component';
import { BlogService } from './blog.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BlogPostDetailComponent } from './blog-post-detail/blog-post-detail.component';
import { NewBlogPostFormComponent } from './new-blog-post-form/new-blog-post-form.component';

@NgModule({
  declarations: [
    // List of all components used in the application
    AppComponent,
    UserComponent,
    OwnerComponent,
    NavbarComponent,
    AboutComponent,
    
    EditAboutComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    BlogPostDetailComponent,
    NewBlogPostFormComponent,
  ],
  imports: [
    // Modules used in the application
    BrowserModule, // Module to run Angular in a browser
    AppRoutingModule, // Module for application routing
    FormsModule, // Module to use Angular forms
    ReactiveFormsModule,
  ],
  providers: [
    // List of all services used in the application
    BlogService, // Service for blog-related functionality
  ],
  bootstrap: [
    // Main component that starts the application
    AppComponent,
  ]
})
export class AppModule { }
