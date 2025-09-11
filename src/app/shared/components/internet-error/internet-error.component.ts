import { Component, effect, inject } from "@angular/core";
import { GlobalStatesService } from "@app/core/services/global-states.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";


@Component({
    selector:'internet-error-component',
    imports:[TranslateModule],
    templateUrl:'./internet-error.component.html',
    styleUrl:'./internet-error.component.scss',
})

export class InternetErrorComponent{
    protected globalStates:GlobalStatesService =  inject(GlobalStatesService);
    protected translate: TranslateService = inject(TranslateService);
    constructor(){
        effect(()=>{
            this.translate.use(this.globalStates.language);
        });
    }
}