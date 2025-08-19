import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';

export interface SendEmailDto {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  fromName?: string;
  fromEmail?: string;
}
@Injectable({
  providedIn: 'root', 
})
export class GmailApiService {
  private _http:HttpClient = inject(HttpClient);

  sendMailContact(dto:SendEmailDto):Observable<void> {
    return this._http.post<void>('/api/gmailMe/send',{...dto});
  }
}
