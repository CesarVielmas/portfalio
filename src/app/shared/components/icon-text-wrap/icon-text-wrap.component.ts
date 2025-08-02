import { NgStyle } from "@angular/common";
import { Component, effect, inject, Input } from "@angular/core";
import { GlobalStatesService } from "@app/core/services/global-states.service";
import { AnimationDirective } from "@app/shared/directives/animation.directive";
import { TranslateModule, TranslateService } from "@ngx-translate/core";


@Component({
    selector:'icon-text-wrap-component',
    imports:[NgStyle,TranslateModule,AnimationDirective],
    templateUrl:'./icon-text-wrap.component.html',
    styleUrl:'./icon-text-wrap.component.scss',
})

export class IconTextWrapComponent{
    @Input() iconUrl!: string;
    @Input() text!: string;
    @Input() textStyle !: { [key: string]: any };
    @Input() iconStyle !: { [key: string]: any };
    @Input() functionToDo : (args?:any) => void = ()=>{};
    @Input() typeAnimations : Record<string,Record<string,string>> = {};
    protected globalStates:GlobalStatesService =  inject(GlobalStatesService);
    protected translate: TranslateService = inject(TranslateService);
    constructor(){
        effect(()=>{
            this.translate.use(this.globalStates.language);
        });
    }

    getTypeAnimation(key: string): string {
        return this.typeAnimations[key]?.['typeAnimation'] ?? '';
    }
    getAnimationStyle(key: string): { [key: string]: string } {
        return this.typeAnimations[key] ?? {};
    }
    getIncludesUrlIcon() : boolean{
        let result:boolean = true;
        this.globalStates.acceptedFormatsImages.forEach(element => {
            if(this.iconUrl.includes(element))
                result = false
        });
        return result;
    }
    functionCall() : void{
        this.functionToDo();
    }
}