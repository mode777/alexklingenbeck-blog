import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './home-view/home-view.component';
import { FeaturesViewComponent } from './features-view/features-view.component';
import { SupportViewComponent } from './support-view/support-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { ArticleService } from './article.service';
import { BlogOverviewViewComponent } from './blog-overview-view/blog-overview-view.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeViewComponent },
    { path: 'blog/:id', component: BlogViewComponent },
    { path: 'blog', component: BlogOverviewViewComponent },
    { path: 'support', component: SupportViewComponent },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: '**', component: NotFoundViewComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
