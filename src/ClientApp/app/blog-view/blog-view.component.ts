import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  content = "";

  constructor(private _artService: ArticleService) { }

  ngOnInit() {
    this._artService.getArticles().subscribe(articles => {
      this._artService.loadContent(articles[0]).subscribe(article => {
        this.content = article.content;
      }, (e) => { throw(e) });
    });
  }

}
