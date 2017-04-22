import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  content = "";
  shortname = "alexklingenbeck";
  article = this._artService.getArticles().map(x => x[0]);
  
  constructor(private _artService: ArticleService, private _route: ActivatedRoute, private _router: Router) {

   }

  ngOnInit() {
  }

}
