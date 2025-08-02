import { NgStyle } from "@angular/common";
import {Component, ElementRef, inject, Input, ViewChild} from "@angular/core";
import { AnimationPushService } from "@app/core/services/animations-push.service";
@Component({
    selector:'deployment-menu-component',
    imports: [NgStyle],
    templateUrl:'./deployment-menu.component.html',
    styleUrl:'./deployment-menu.component.scss',
})

export class DeploymentMenu {
    @Input() elementToAssign!:HTMLElement;
    @Input() directionMenu!: string;
    @Input() stylesParent!: Record<string,any>;
    @Input() durationAnimation!: string;
    @ViewChild('divMenu',{static:true})
    private _divMenu!: ElementRef<HTMLDivElement>;
    private _animationsPushService:AnimationPushService = inject(AnimationPushService);
    private _parentElementStyle:Record<string,any> = {};
    getParentElementStyle():Record<string,any>
    {
        this._directionFlow();
        this._applyStyles();
        return this._parentElementStyle;
    }
    private _directionFlow(){
        const rect = this.elementToAssign.getBoundingClientRect();
        this._parentElementStyle["top"] = this.directionMenu.split("-")[0] === "top" ? rect.top - this._vwToPx(this.stylesParent["height"]) + "px" : rect.top + rect.height + "px";
        this._itemAlign(rect,this.directionMenu.split("-")[1]);
        this._parentElementStyle["backgroundColor"] = "blue";
        this._parentElementStyle["position"] = "absolute";
    }
    private _applyStyles(){
        Object.entries(this.stylesParent).forEach(([key, value]) => {
            this._parentElementStyle[key] = value;
        });
        this._animationsPushService.heightZeroAnimationAppear(this._divMenu.nativeElement as HTMLElement,{'heightZeroAppearDuration':this.durationAnimation,'heightZeroAppearTiming':'ease-out','heightZeroAppearHeight':`${this._vwToPx(this.stylesParent["height"])}px`});
    }
    private _vwToPx(vw: string | number, viewportWidth: number = window.innerWidth): number {
        const num = typeof vw === 'string' ? parseFloat(vw) : vw;
        return (num * viewportWidth) / 100;
    }
    private _centerElement(rect:DOMRect,elementWidth:number) : number{
        const percentageEquivalentWidth:number = Math.round((elementWidth * 100)/rect.width);
        const percentageLeftMore: number = Math.abs(Math.round((percentageEquivalentWidth - 100)/2));
        return rect.left + (percentageEquivalentWidth >= 100 ? 0 :(rect.width * (percentageLeftMore / 100)));
    }
    private _itemAlign(rect:DOMRect,direction:string) : void{
        switch (direction) {
            case "left":
            this._parentElementStyle["left"] = rect.left + "px";
                break;
            case "right":
            this._parentElementStyle["left"] = rect.right+ "px";
                break;
            case "center":
            this._parentElementStyle["left"] = this._centerElement(rect,this._vwToPx(this.stylesParent["width"])) + "px";
                break;
        }
    }
}