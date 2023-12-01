import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { OwnerComponent } from './owner/owner.component';
import { AboutComponent } from './about/about.component';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { HomeComponent } from './home/home.component';
import { BlogPostDetailComponent } from './blog-post-detail/blog-post-detail.component';
import { NewBlogPostFormComponent } from './new-blog-post-form/new-blog-post-form.component';

// Define the routes for the application
const routes: Routes = [
  { path: 'user', component: UserComponent }, // Path for user view
  { path: 'user/blog', component: HomeComponent }, // Path for user's blog
  { path: 'owner', component: OwnerComponent }, // Path for owner view
  { path: 'about', component: AboutComponent }, // Path for About section
  { path: 'home', component: HomeComponent}, // Path for home component
  { path: 'edit-about', component: EditAboutComponent }, // Path for edit view of About section
  { path: 'blog/:id', component: BlogPostDetailComponent }, // Dynamic path to view details of a blog post
  { path: 'new-blog-post-form', component: NewBlogPostFormComponent },
  { path: '', redirectTo: '/user', pathMatch: 'full' }, // Default redirection to user view for empty path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
