import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable()
export class SearchService {

  private database = ['banana', 'tomate', 'morando', 'abóbora', 'abacate'];

  readonly dataList = new BehaviorSubject([]);
  readonly formData = new BehaviorSubject({});

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.formData.next(params);
      this.shuffleArray();
      console.log(this.database);
      this.dataList.next(this.database);
      this.urls(params);
    });
  }

  updateSearch(data: any) {
    this.router.navigate([], { queryParams: data, relativeTo: this.activatedRoute });
  }

  private shuffleArray() {
    for (var i = this.database.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.database[i];
      this.database[i] = this.database[j];
      this.database[j] = temp;
    }
  }

  private urls(obj) {
    const propertiesBack = [];
    Object.entries(obj).forEach(([key, value]) => {
      propertiesBack.push(`${key} LIKE "*${value}*"`);
    });

    const joinedProperties = propertiesBack.join(' AND ');

    const urlSearchBack = new URLSearchParams();
    urlSearchBack.set('search', joinedProperties);
    const paramsBackend = urlSearchBack.toString();
    console.log(paramsBackend);
  }


}
