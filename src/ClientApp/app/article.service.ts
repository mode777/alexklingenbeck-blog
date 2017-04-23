import { Injectable } from '@angular/core';
import { Http, Response as HttpResponse } from '@angular/http';
import { Observable as RxObservable} from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

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
  html: Promise<string>;

  constructor(private http: Http, json: any){
    this.title = json.title;
    this.lead = json.lead;
    this.tags = json.tags;
    this.author = json.author;
    this.src = json.src;
    this.id = json.id;
    this.date = new Date(json.date);
    this.html = this.http
    .get(ARTICLE_ROOT + this.src)
    .toPromise()
    .then(res => this._renderContent(res))
    .catch(_catch);
  }


  private _renderContent(res: HttpResponse){
    console.log("downloaded: " + this.src);
    return marked(res.text());
  }

}

@Injectable()
export class ArticleService {

  articles: Promise<Article[]>;

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
    });

      this.articles = this._http.get(ARTICLE_ROOT + INDEX).toPromise()
        .then(res => {
          return res.json().map(a => new Article(this._http, a));
        })
        .catch(_catch);
  }

  getById(id: string): Promise<Article>{
    return this.articles
    .then(art => art.find(a => a.id.toUpperCase() == id.toUpperCase()))
    .catch(_catch)
  }

}
