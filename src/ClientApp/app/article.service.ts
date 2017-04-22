import { Injectable } from '@angular/core';
import { Http, Response as HttpResponse } from '@angular/http';
import { Observable as RxObservable } from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import * as marked from 'marked';
import * as hljs from 'highlight.js';

const INDEX = 'index.json';
const ARTICLE_ROOT = 'dist/assets/articles/';

export interface Article {
  title: string,
  lead: string;
  tags: string[];
  content: string;
  author: string;
  date: Date;
  src: string;
}

@Injectable()
export class ArticleService {

  constructor(private http: Http) {
    
    marked.setOptions({
      highlight: (code, lang) => {
          let res: any;
          if (!lang)
              res = hljs.highlightAuto(code).value;
          else
              res = hljs.highlight(lang, code).value;

          return res;
        }
    })
  }

  getArticles(): RxObservable<Article[]> {
    return this.http
    .get(ARTICLE_ROOT + INDEX)
    .map(this._parseArticle)
    .catch(this._catch);
  }

  loadContent(article: Article): RxObservable<Article> {
    return this.http
    .get(ARTICLE_ROOT + article.src)
    .map(response => this._renderContent(response, article))
    .catch(this._catch)
  }

  private _parseArticle(res: HttpResponse){
    let content = <Article[]>res.json();
    content.forEach(a => {
      a.date = new Date(a.date);
    });
    return content;
  }

  private _renderContent(res: HttpResponse, article: Article){
    article.content = marked(res.text());
    return article;
  }

  private _catch(err: HttpResponse){
    return RxObservable.throw(err);
  }

}
