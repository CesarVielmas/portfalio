import { NgStyle } from "@angular/common";
import { Component, computed, Input, signal, Signal } from "@angular/core";
import { standardCardParameters } from "@app/core/services/interfaces/standardCardParameters.config";

@Component({
    selector:'standard-card-component',
    imports:[NgStyle],
    templateUrl:'./standard-card.component.html',
    styleUrl:'./standard-card.component.scss',
})

export class StandardCardComponent{
    @Input() cardConfig!: standardCardParameters;
    @Input() _stateChildCard: Signal<boolean> = signal(false);
    protected stateChildCard:Signal<boolean> = computed(()=> this._stateChildCard());

    get stylesCard(){
        return {
            "background-color":this.cardConfig.backgroundColorCard,
            "border":this.cardConfig.borderCard,
            "border-radius":this.cardConfig.radiusCard,
            "flex-direction":this.cardConfig.flexDirectionCard,
            "box-shadow":this.cardConfig.boxShadowCard
        }
    }
}