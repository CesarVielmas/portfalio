import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', 
})
export class AnimationPushService {
    scaleAnimationClick(el:HTMLElement,styles:Record<string,any> = {}){
        el.classList.remove("click-scale-animation-in");
        el.classList.remove("click-scale-animation-out");
        if(!styles)
            return;
        if(!('scaleClickDuration' in styles))
            return;
        el.classList.add("click-scale-animation-in");
        const timer:string = styles['scaleClickDuration'];
        setTimeout(() => {
            el.classList.replace("click-scale-animation-in","click-scale-animation-out");
            this._applyAnimationStyle(styles,el);
        }, Number(parseFloat(timer) * (timer.includes("s") ? 1000 : 60000) / 2));
        this._applyAnimationStyle(styles,el);
    }
    rotateAnimationClick(el:HTMLElement,styles:Record<string,any> = {}){
        el.classList.remove("click-rotate-animation");
        if(!styles)
            return;
        if(!('rotateClickDuration' in styles))
            return;
        el.classList.add("click-rotate-animation");
        const timer:string = styles['rotateClickDuration'];
        setTimeout(() => {
            el.classList.remove("click-rotate-animation");
        }, Number(parseFloat(timer) * (timer.includes("s") ? 1000 : 60000)));
        this._applyAnimationStyle(styles,el);
    }
    heightZeroAnimationAppear(el:HTMLElement,styles:Record<string,any> = {}){
        el.classList.remove("appear-height-zero-animation");
        if(!styles)
            return;
        if(!('heightZeroAppearDuration' in styles))
            return;
        el.classList.add("appear-height-zero-animation");
        const timer:string = styles['heightZeroAppearDuration'];
        setTimeout(() => {
            el.classList.remove("appear-height-zero-animation");
            el.style.height = styles['heightZeroAppearHeightFinal'];
        }, Number(parseFloat(timer) * (timer.includes("s") ? 1000 : 60000)));
        this._applyAnimationStyle(styles,el);
    }
    widthZeroAnimationAppear(el:HTMLElement,styles:Record<string,any> = {}){
        el.classList.remove("appear-width-zero-animation");
        if(!styles)
            return;
        if(!('widthZeroAppearDuration' in styles))
            return;
        el.classList.add("appear-width-zero-animation");
        const timer:string = styles['widthZeroAppearDuration'];
        setTimeout(() => {
            el.classList.remove("appear-width-zero-animation");
            el.style.width = styles['widthZeroAppearWidth'];
        }, Number(parseFloat(timer) * (timer.includes("s") ? 1000 : 60000)));
        this._applyAnimationStyle(styles,el);
    }
    movementYWithOpacityAppear(el:HTMLElement,styles:Record<string,any> = {}){
        el.classList.remove("appear-movement-y-with-opacity-animation");
        if(!styles)
            return;
        if(!('movementYWithOpacityAppearDuration' in styles))
            return;
        const timer:string = styles['movementYWithOpacityAppearDuration'];
        let timerInit:string = '0s';
        el.style.opacity = '0';
        if(('movementYWithOpacityAppearInitDuration') in styles)
            timerInit = styles['movementYWithOpacityAppearInitDuration'];
        setTimeout(()=>{
            el.classList.add("appear-movement-y-with-opacity-animation");
            setTimeout(() => {
                el.style.opacity = '1';
                el.classList.remove("appear-movement-y-with-opacity-animation");
            }, Number(parseFloat(timer) * (timer.includes("s") ? 1000 : 60000)));
        },Number(parseFloat(timerInit) * (timerInit.includes("s") ? 1000 : 60000)))
        this._applyAnimationStyle(styles,el);
    }
    textWritingAnimation(el:HTMLElement,styles:Record<string,any> = {}){
        if(!styles)
            return;
        if(!('textToAnimate' in styles) || !('animationDuration' in styles))
            return;
        el.textContent = "";
        const totalTime:number = Number(parseFloat(styles['animationDuration']) * (styles['animationDuration'].includes("s") ? 1000 : 60000));
        const totalWords:number = (styles['textToAnimate'] as string).length;
        let actualWord:number = 0;
        const intervalWord = setInterval(()=>{
            if(actualWord < totalWords){
                el.textContent = (el.textContent as string).replace("|","");
                el.textContent = el.textContent + (styles['textToAnimate'] as string)[actualWord] + "|";
                actualWord ++;
            }
        },totalTime/totalWords);
        setTimeout(()=>{
            el.textContent = styles['textToAnimate'];
            clearInterval(intervalWord);
        },totalTime);
    }
    changeColorAnimation(el:HTMLElement,style:Record<string,any> = {}){

    }
    private _convertToCssVariable(property: string): string {
        if (property.startsWith('--')) {
            return property;
        }
        return '--' + property
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
            .toLowerCase();
    }
    private _applyAnimationStyle(styles:Record<string,any>,element:HTMLElement) {
        if (styles) {
            Object.entries(styles).forEach(([property, value]) => {
                const cssVariable = this._convertToCssVariable(property);
                element.style.setProperty(cssVariable, value);
            });
        }
    }
}
