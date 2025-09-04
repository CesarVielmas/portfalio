import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { GitProyect } from '../models/gitProyect.model';

@Injectable({
  providedIn: 'root', 
})
export class GithubApiService {
  private _http:HttpClient = inject(HttpClient);

  obtainInformacionGithub():Observable<GitProyect[]> {
    return this._http.get<GitProyect[]>('/api/github/get');
  }
}
