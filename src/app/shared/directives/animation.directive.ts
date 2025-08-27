import { ApplicationRef, Directive, ElementRef,inject , Input,OnInit, SecurityContext } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AnimationPushService } from "@app/core/services/animations-push.service";
import { GlobalStatesService } from "@app/core/services/global-states.service";
import { first } from "rxjs";

type MetodoConArgs = (...args: any[]) => any;
@Directive({
    selector:"[typeAnimation]",
    standalone:true
})
export class AnimationDirective implements OnInit {
    [key: string]: any;
    private globalStates: GlobalStatesService = inject(GlobalStatesService);
    private element: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
    private appRef:ApplicationRef = inject(ApplicationRef);
    private animationPushService: AnimationPushService = inject(AnimationPushService);
    private sanitizer:DomSanitizer = inject(DomSanitizer);
    private methodEventPass : Function = new Function();
    private methodOptionalEvent: Function = new Function();
    private typeEventElement: string = 'mouseover';
    private typeEventOptional: string = 'mouseleave';
    @Input() typeAnimation !: string;
    @Input() animationStyle !: { [key: string]: string };
    ngOnInit(){
       if(this.typeAnimation.includes("hover")){
            const acceptedAnimationsHover: string[] = this.globalStates.acceptedAnimationsHover;
            if(acceptedAnimationsHover.includes(this.typeAnimation)){
                this.methodEventPass = (this[this.typeAnimation.replace('-', '_')] as Function).bind(this);
                this.typeEventElement = 'mouseover';
                this.methodOptionalEvent = (this[this.typeAnimation.replace('-', '_') + '_leave'] as Function).bind(this);
                this.typeEventOptional = 'mouseleave';
                this.element.nativeElement.addEventListener(this.typeEventOptional, (e) => this.methodOptionalEvent(e));
            }
       }
       if(this.typeAnimation.includes("appear")){
            const acceptedAnimationsAppear:string[] = this.globalStates.acceptedAnimationsAppear;
            if(acceptedAnimationsAppear.includes(this.typeAnimation)){
                this.methodEventPass = (this[this.typeAnimation.replaceAll('-', '_')] as Function).bind(this);
                this.appRef.isStable.pipe(first(stable => stable)).subscribe(()=>{
                    this.methodEventPass();
                });
                return;
            }
       }
       this.element.nativeElement.addEventListener(this.typeEventElement, (e) => this.methodEventPass(e));
    }
    hover_underline(e:MouseEvent){
        this.element.nativeElement.classList.remove('hover-underline-animation-leave');
        this.element.nativeElement.classList.add('hover-underline-animation');
        this.applyAnimationStyle();
    }
    hover_underline_leave(e:MouseEvent){
        this.element.nativeElement.classList.replace('hover-underline-animation', 'hover-underline-animation-leave');
        this.applyAnimationStyle();
    }
    hover_scale(e:MouseEvent){
        this.element.nativeElement.classList.remove('hover-scale-animation-leave');
        this.element.nativeElement.classList.add('hover-scale-animation');
        this.applyAnimationStyle();
    }
    hover_scale_leave(e:MouseEvent){
        this.element.nativeElement.classList.replace('hover-scale-animation', 'hover-scale-animation-leave');
        this.applyAnimationStyle();
    }
    appear_text_writing(){
        const totalTime:number = Number(parseFloat(this.animationStyle['animationDuration']) * (this.animationStyle['animationDuration'].includes("s") ? 1000 : 60000));
        this.animationPushService.textWritingAnimation(this.element.nativeElement as HTMLElement,this.animationStyle);  
        if(('textToColor' in this.animationStyle) && ('textToColorColor' in this.animationStyle)){
           if(this.animationStyle['textToAnimate'].includes(this.animationStyle['textToColor'])){
                setTimeout(()=>{
                    const html = this.animationStyle['textToAnimate'].replace(this.animationStyle['textToColor'],`<span class="text-change-color" style="--text-change-color-duration:1s;--text-change-color-timing:ease-out;--text-change-color-initial:white;--text-change-color-final:${this.animationStyle['textToColorColor']};">${this.animationStyle['textToColor']}</span>`)
                    const safeHtml:SafeHtml  = this.sanitizer.bypassSecurityTrustHtml(html) || '';
                    const innerContent:string = this.sanitizer.sanitize(SecurityContext.HTML,safeHtml) || '';
                    this.element.nativeElement.innerHTML = innerContent;
                },totalTime + 1);
           }
        }
    }
    appear_movement_y_with_opacity(){
        this.animationPushService.movementYWithOpacityAppear(this.element.nativeElement as HTMLElement,this.animationStyle);
    }
    appear_width_zero(){
        this.animationPushService.widthZeroAnimationAppear(this.element.nativeElement as HTMLElement, this.animationStyle);
    }
    appear_button_scale_and_change_color(){
        this.element.nativeElement.classList.remove('background-change-color')
        this.element.nativeElement.classList.add('background-change-color')
        const animationScale = {
            scaleClickDuration: this.animationStyle['scaleClickDuration'],
            scaleClickPercentage: Number.parseFloat(this.animationStyle['scaleClickPercentage']),
            scaleClickTiming: this.animationStyle['scaleClickTiming']
        }
        this.animationStyle = {
            backgroundChangeColorDuration: this.animationStyle['backgroundChangeColorDuration'],
            backgroundChangeColorTiming: this.animationStyle['backgroundChangeColorTiming'],
            backgroundChangeColorInitial: this.animationStyle['backgroundChangeColorInitial'],
            backgroundChangeColorFinal: this.animationStyle['backgroundChangeColorFinal']
        };
        this.applyAnimationStyle();
        setTimeout(()=>{
            this.animationPushService.scaleAnimationClick(this.element.nativeElement as HTMLElement,animationScale);
        },Number(parseFloat(this.animationStyle['backgroundChangeColorDuration']) * (this.animationStyle['backgroundChangeColorDuration'].includes("s") ? 1000 : 60000)));
    }
    private clean_element_events(){
        this.element.nativeElement.removeEventListener(this.typeEventElement, this.methodEventPass as MetodoConArgs);
        this.element.nativeElement.removeEventListener(this.typeEventOptional, this.methodOptionalEvent as MetodoConArgs);
    }
    private convertToCssVariable(property: string): string {
        if (property.startsWith('--')) {
            return property;
        }
        return '--' + property
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
            .toLowerCase();
    }
    private applyAnimationStyle() {
        if (this.animationStyle) {
            Object.entries(this.animationStyle).forEach(([property, value]) => {
                const cssVariable = this.convertToCssVariable(property);
                this.element.nativeElement.style.setProperty(cssVariable, value);
            });
        }
    }
}