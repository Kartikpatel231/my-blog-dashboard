import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { CommentsComponent } from './comments/comments.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PdfComponent } from './pdf/pdf.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { PremiumPdfComponent } from './premium-pdf/premium-pdf.component';
import { AuthGuard } from './services/auth.guard';
import { SubscribersComponent } from './subscribers/subscribers.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
   {path:'pdfEdit',component:PdfComponent,canActivate:[AuthGuard]},
   {path:'pdfaction',component:PremiumPdfComponent},
  { path: 'categories', component: CategoriesComponent ,canActivate: [AuthGuard]},
  { path: 'posts', component: AllPostComponent,canActivate: [AuthGuard] },
  { path: 'posts/new', component: NewPostComponent,canActivate: [AuthGuard] },
  {path:'subscribers',component:SubscribersComponent,canActivate:[AuthGuard]},
  {path:'comment',component:CommentsComponent,canActivate:[AuthGuard]},
  {path:'contactUs',component:ContactComponent,canActivate:[AuthGuard]},
  {path:'chat',component:ChatAppComponent},
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
