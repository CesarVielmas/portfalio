import { Component, Input, Signal} from "@angular/core";
import { AnimationDirective } from "@app/shared/directives/animation.directive";

@Component({
    selector:'loading-square-component',
    imports:[AnimationDirective],
    templateUrl:'./loading-square.component.html',
    styleUrl:'./loading-square.component.scss',
})

export class LoadingSquareComponent{
    @Input() backgroundInactive!:string;
    @Input() backgroundActive!:string;
    @Input() durationAnimationLoop!:string;
    @Input() widthAnimationLoop!:string;
    @Input() borderRadius!:string;
}