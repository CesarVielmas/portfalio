import { isPlatformBrowser } from '@angular/common';
import { Injectable, HostListener, inject, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DetectDeviceService {
    private platformId = inject(PLATFORM_ID);

  isDesktop(): boolean {
    if(!isPlatformBrowser(this.platformId)){
        return false;
    }
    return window.innerWidth >= 1024;
  }
}
