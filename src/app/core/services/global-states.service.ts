import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', 
})
export class GlobalStatesService {
  private _acceptedAnimationsHover: string[] = ['hover-underline', 'hover-scale','hover-move-y','hover-move-x'];
  private _acceptAnimationsAppear: string[] = ['appear-height-zero','appear-width-zero','appear-movement-y-with-opacity','appear-text-writing','appear-button-scale-and-change-color'];
  private _acceptAnimationsLoop: string[] = ['loop-loading-card'];
  private _acceptedFormatsImages: string[] = ['.avif', '.bmp', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.tiff', '.webp'];
  private _acceptedLanguages : string[] = ['en','es'];
  private _acceptedAparts: string[] = [
    // Ecosistemas / entornos
    'net',
    'dotnet',
    // Herramientas de mercado / DevOps
    'docker',
    'kubernetes',
    'terraform',
    'ansible',

    // Frameworks / herramientas internas importantes
    'wpf',
    'net-maui',
    'express-js',
    'android-sdk',
    'react-native',
    'pygame',
    'angular',
    'react',
    'vuejs',
  ];
  private _animatedNavigation = signal<{ path: string; state?: any } | null>(null);
  private _language = signal<string>('en');
  private _router:Router = inject(Router);
  get language() : string {
    return this._language();
  }
  get animatedNavigation() {
    return this._animatedNavigation.asReadonly();
  }
  get acceptedAnimationsHover() : string[] { return this._acceptedAnimationsHover; }
  get acceptedAnimationsAppear() : string[] { return this._acceptAnimationsAppear; }
  get acceptedAnimationsLoop() :string[] {return this._acceptAnimationsLoop;}
  get acceptedFormatsImages() :string[] {return this._acceptedFormatsImages;}
  get acceptedAparts() : string[] {return this._acceptedAparts;}
  setLanguage(lang: string) {
    if(this._acceptedLanguages.includes(lang))
        this._language.set(lang);
  }
  navigateTo(urlToDestiny: string, opcionalObject: any = {}) {
    this._router.navigate([urlToDestiny], { state: opcionalObject });
  }
  requestAnimatedNavigation(path: string, state?: any) {
    this._animatedNavigation.set({ path, state });
  }
  reload() {
    const currentUrl = this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }
  redirectURL(url:string){
    window.open(url, '_blank');
  }
}

