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

const _catch = function(err: HttpResponse){
    return RxObservable.throw(err);
  }

export class Article {
  
  private _html: string = null;
  
  title: string;
  lead: string;
  tags: string[];
  content: string;
  author: string;
  date: Date;
  src: string;
  id: string;
  html: RxObservable<string>;

  constructor(private http: Http, json: any){
    this.title = json.title;
    this.lead = json.lead;
    this.tags = json.tags;
    this.author = json.author;
    this.src = json.src;
    this.id = json.id;
    this.date = new Date(json.date);
    console.log(this.src);

    this.html = this.http
    .get(ARTICLE_ROOT + this.src)
    .map(this._renderContent)
    .catch(_catch);
  }


  private _renderContent(res: HttpResponse){
    console.log(res);
    return marked(res.text());
  }

}

@Injectable()
export class ArticleService {

  constructor(private _http: Http) {
    
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
    return this._http
    .get(ARTICLE_ROOT + INDEX)
    .map(res => res.json().map(a => new Article(this._http, a)))
    .catch(_catch);
  }

}
