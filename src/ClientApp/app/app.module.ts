import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { DisqusModule } from "ng2-awesome-disqus";

import { AppComponent } from './app.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { FeaturesViewComponent } from './features-view/features-view.component';
import { SupportViewComponent } from './support-view/support-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { ArticleService } from './article.service';
import { AppRoutingModule } from './app-routing.module';
import { BlogOverviewViewComponent } from './blog-overview-view/blog-overview-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    FeaturesViewComponent,
    SupportViewComponent,
    NotFoundViewComponent,
    BlogViewComponent,
    BlogOverviewViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    DisqusModule
  ],
  providers: [ ArticleService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
