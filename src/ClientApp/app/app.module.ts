import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './home-view/home-view.component';
import { FeaturesViewComponent } from './features-view/features-view.component';
import { SupportViewComponent } from './support-view/support-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { BlogViewComponent } from './blog-view/blog-view.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeViewComponent },
    { path: 'blog', component: BlogViewComponent },
    { path: 'support', component: SupportViewComponent },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: '**', component: NotFoundViewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    FeaturesViewComponent,
    SupportViewComponent,
    NotFoundViewComponent,
    BlogViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
