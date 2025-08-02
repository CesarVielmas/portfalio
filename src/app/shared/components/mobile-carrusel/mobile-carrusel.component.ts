import { NgStyle } from "@angular/common";
import { AfterViewInit, Component,ElementRef,Input, OnDestroy, OnInit, QueryList, signal, ViewChild, ViewChildren} from "@angular/core";
import { AnimationDirective } from "@app/shared/directives/animation.directive";

@Component({
    selector:'mobile-carrusel-component',
    imports:[NgStyle,AnimationDirective],
    templateUrl:'./mobile-carrusel.component.html',
    styleUrl:'./mobile-carrusel.component.scss',
})

export class MobileCarruselComponent implements AfterViewInit,OnDestroy {
    protected contentSignal = signal<Record<string, any>[]>([]);
    @Input() stylesFatherDiv!:Record<string,any>;
    @Input() stylesCard!:Record<string,any>;
    @Input() set content(value: Record<string, any>[]) {
        this.contentSignal.set(value);
    }
    @Input() textColor!:string;
    @Input() backgroundColorText!:string;
    @Input() transitionVelocity!:number;
    @Input() carruselVelocity!:number;
    @ViewChild('fatherDiv',{static:false}) private _fatherDiv!:ElementRef<HTMLDivElement>;
    @ViewChildren('cardElement') private _cardElements!: QueryList<ElementRef>;
    private _fatherDivRect!:DOMRect;
    private _intervalAnimation: ReturnType<typeof setInterval> | null = null;
    private _StartX: number = 0;    
    private _typeDispositive:string = "";
    
    ngAfterViewInit(): void {
        if (!this.contentSignal()) return;
        this._fatherDivRect = (this._fatherDiv.nativeElement as HTMLElement).getBoundingClientRect();
        this._cardElements.changes.subscribe(() => {
            this._fatherDivRect = this._fatherDiv.nativeElement.getBoundingClientRect();
        });
        if(window.innerWidth <= 768){
            this._fatherDiv.nativeElement.addEventListener('touchstart', this._onStart, { passive: true });
            this._fatherDiv.nativeElement.addEventListener('touchend', this._onEnd, { passive: true });
            this._typeDispositive = "mobile";
        }
        else{
            this._fatherDiv.nativeElement.addEventListener('mousedown', this._onStart);
            this._fatherDiv.nativeElement.addEventListener('mouseup', this._onEnd);
            this._typeDispositive = "desktop"
        }
        this._intervalAnimation = setInterval(()=>{
                Array.from(this._fatherDiv.nativeElement.children).forEach((el)=>{  
                const childRect = (el as HTMLElement).getBoundingClientRect();
                const htmlEl = el as HTMLElement;
                const currentLeftStr = window.getComputedStyle(htmlEl).left;
                const currentLeft = parseFloat(currentLeftStr);
                if (!isNaN(currentLeft)) {
                    const newLeft = currentLeft - this.carruselVelocity;
                    htmlEl.style.left = `${newLeft}px`;
                }
                if(childRect.right < this._fatherDivRect.left){
                    this._changePositionElement(htmlEl);
                }
            });
        }, this.transitionVelocity); 
    }
    ngOnDestroy(): void {
        if (this._intervalAnimation !== null) {
            clearInterval(this._intervalAnimation);
            this._intervalAnimation = null;
        }
    }
    private _changePositionElement(element:HTMLElement){
        this._fatherDivRect = this._fatherDiv.nativeElement.getBoundingClientRect();
        element.style.left = `${(this._fatherDiv.nativeElement.children[this._fatherDiv.nativeElement.children.length-1] as HTMLElement).getBoundingClientRect().right}px`;
    }
    private _onStart = (event: TouchEvent | MouseEvent): void => {
        if(this._intervalAnimation)
                clearInterval(this._intervalAnimation);
        if (event instanceof TouchEvent){
            this._StartX = event.touches[0].clientX;
            window.addEventListener('touchmove',this._onWindowsMove);
        }
        else if (event instanceof MouseEvent){
            this._StartX = event.clientX;
            window.addEventListener('mousemove',this._onWindowsMove);
        }
    };

    private _onEnd = (): void => {
        this._StartX = 0;
        if (this._typeDispositive === "mobile")
            window.removeEventListener('touchmove',this._onWindowsMove);
        else if (this._typeDispositive === "desktop")
            window.removeEventListener('mousemove',this._onWindowsMove);
        this._intervalAnimation = setInterval(()=>{
                Array.from(this._fatherDiv.nativeElement.children).forEach((el)=>{  
                const childRect = (el as HTMLElement).getBoundingClientRect();
                const htmlEl = el as HTMLElement;
                const currentLeftStr = window.getComputedStyle(htmlEl).left;
                const currentLeft = parseFloat(currentLeftStr);
                if (!isNaN(currentLeft)) {
                    const newLeft = currentLeft - this.carruselVelocity;
                    htmlEl.style.left = `${newLeft}px`;
                }
                if(childRect.right < this._fatherDivRect.left){
                    this._changePositionElement(htmlEl);
                }
            });
        }, this.transitionVelocity); 
    };
    private _onWindowsMove = (event: TouchEvent | MouseEvent):void =>{
        let moveX = 0;
        let moveY = 0;
        if (event instanceof TouchEvent){
            moveX = event.touches[0].clientX;
            moveY = event.touches[0].clientY;
        }
        else if (event instanceof MouseEvent){
            moveX = event.clientX;
            moveY = event.clientY;
        }
        if(window.innerWidth < Math.abs(moveX) || moveX <= 0 || Math.abs(moveY) >= window.innerHeight || moveY < this._fatherDiv.nativeElement.getBoundingClientRect().top || moveY > (this._fatherDiv.nativeElement.getBoundingClientRect().top+this._fatherDiv.nativeElement.getBoundingClientRect().height)){
            this._onEnd();
            return;
        }
        const deltaX = (moveX - this._StartX)/160;
        if (Math.abs(deltaX)) {
                Array.from(this._fatherDiv.nativeElement.children).forEach((el)=>{  
                    const childRect = (el as HTMLElement).getBoundingClientRect();
                    const htmlEl = el as HTMLElement;
                    const currentLeftStr = window.getComputedStyle(htmlEl).left;
                    const currentLeft = parseFloat(currentLeftStr);
                    if (!isNaN(currentLeft)) {
                        const newLeft = currentLeft + deltaX;
                        htmlEl.style.left = `${newLeft}px`;
                        
                    }
                    if(childRect.right < this._fatherDivRect.left){
                        this._changePositionElement(htmlEl);
                    }
            });
        }
    }
    protected eventFunctionToDo(id: string): void {
        const item = this.contentSignal().find((el) => el['id'] === id);
        if (item)
            item['functionToDo']();
    }
}