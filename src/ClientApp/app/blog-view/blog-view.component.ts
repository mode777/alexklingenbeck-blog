import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../article.service';
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
  article: Observable<Article>;
  
  constructor(private _artService: ArticleService, private _route: ActivatedRoute, private _router: Router) {
    this.article = this._route.params.flatMap(params => _artService.getById(params["id"]));    
   }

  ngOnInit() {
    // this._route.params.subscribe(params => {
    //   console.log(params)
    //   this.article = this._artService.getById(this._route.params["id"])
    // })
  }

}
