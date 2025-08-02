import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', 
})
export class GlobalStatesService {
  private _acceptedAnimationsHover: string[] = ['hover-underline', 'hover-scale','hover-move-y','hover-move-x'];
  private _acceptAnimationsAppear: string[] = ['appear-height-zero','appear-movement-y-with-opacity','appear-text-writing']
  private _acceptedFormatsImages: string[] = ['.avif', '.bmp', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.tiff', '.webp'];
  private _acceptedLanguages : string[] = ['en','es'];
  private _language = signal<string>('en');
  private _router:Router = inject(Router);
  get language() : string {
    return this._language();
  }
  get acceptedAnimationsHover() : string[] { return this._acceptedAnimationsHover; }
  get acceptedAnimationsAppear() : string[] { return this._acceptAnimationsAppear; }
  get acceptedFormatsImages() :string[] {return this._acceptedFormatsImages;}
  setLanguage(lang: string) {
    if(this._acceptedLanguages.includes(lang))
        this._language.set(lang);
  }
  navigateTo(urlToDestiny:string) : void{
      this._router.navigate([urlToDestiny]);
  }
}
