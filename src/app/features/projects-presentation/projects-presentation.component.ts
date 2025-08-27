import { Component, inject} from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
    selector:'projects-presentation',
    imports:[TranslateModule],
    templateUrl:'./projects-presentation.component.html',
    styleUrl:'./projects-presentation.component.scss',
})

export class ProjectsPresentationComponent{
    protected translate:TranslateService = inject(TranslateService);
    
}