import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


export class RestProvider {
 films: Observable<any>;
  
  constructor(public httpClient: HttpClient) {
   this.films = this.httpClient.get('https://swapi.co/api/films');
   this.films
    .subscribe(data => {
      console.log('my data: ', data);
    })
    console.log('Hello RestProvider Provider');
  }




}
