import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { CategoriesComponent } from './categories/categories.component';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import {AngularFireStorageModule}  from '@angular/fire/storage';
import { LoginComponent } from './auth/login/login.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { CommentsComponent } from './comments/comments.component';
import { ContactComponent } from './contact/contact.component';
import { PdfComponent } from './pdf/pdf.component';
import { PremiumPdfComponent } from './premium-pdf/premium-pdf.component';
import { ChatAppComponent } from './chat-app/chat-app.component';
import {  MatAutocompleteModule, MatCardModule, MatFormFieldModule, MatInputModule, MatList, MatListItem, MatRipple, MatRippleModule, MatTab, MatTabBody, MatTabGroup, MatTabHeader, MatTabsModule } from '@angular/material';
import { PortalModule } from '@angular/cdk/portal';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    AllPostComponent,
    NewPostComponent,
    LoginComponent,
    SubscribersComponent,
    CommentsComponent,
    ContactComponent,
    PdfComponent,
    PremiumPdfComponent,
    ChatAppComponent,
    MatListItem,
    MatList,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularEditorModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatRippleModule,
    PortalModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
