import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const INDEX_URL = 'dist/assets/articles/index.json';

export interface Article {
  title: string,
  lead: string;
  tags: string[];
  html: string;
  author: string;
  date: Date;
  src: string;
}

@Injectable()
export class ArticleServiceService {

  constructor(private http: Http) {
    Observable 
  }

  getArticles(): Observable<Response> {
    return this.http
    .get(INDEX_URL)
    // .map(this._extractData)
    // .catch(this._catch);
  }

  private _extractData(res: Response){
    let content = res.json();
    return content;
  }

  private _catch(err: Response){
    return Observable.throw(err.text());
  }

}
