import { isPlatformBrowser } from "@angular/common";
import { AfterViewInit, Component, effect, ElementRef, HostListener, Inject, inject, PLATFORM_ID, SecurityContext, signal, ViewChild } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NavHeaderMockProvider } from "@app/core/mocks/nav-elements.mock";
import { AnimationPushService } from "@app/core/services/animations-push.service";
import { GlobalStatesService } from "@app/core/services/global-states.service";
import { AnimationDirective } from "@app/shared/directives/animation.directive";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
    selector:'deployment-presentation',
    imports:[TranslateModule,AnimationDirective],
    templateUrl:'./deployment-presentation.component.html',
    styleUrl:'./deployment-presentation.component.scss',
})

export class DeploymentPresentationComponent implements AfterViewInit{
    protected translate: TranslateService = inject(TranslateService);
    protected mockData:NavHeaderMockProvider = inject(NavHeaderMockProvider);
    private animationPushService:AnimationPushService = inject(AnimationPushService);
    protected percentageTopPlus:Record<string,Record<string,string>> = {};
    protected percentageComplete:string = "0%";
    protected circlesIconsStorys = signal<string[]>([]);
    protected rootedStorys = signal<Record<string,string>>({});
    protected globalStates:GlobalStatesService = inject(GlobalStatesService);
    private sanitizer:DomSanitizer = inject(DomSanitizer);
    private _actualElementsViewing:Array<string> = [];
    @ViewChild('timeLinePresentation',{static:true})
    private _divTimeLine!: ElementRef<HTMLDivElement>;
    @ViewChild('timeLineTittle',{static:true})
    private _h1Tittle!: ElementRef<HTMLHeadingElement>;
    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        if(!this.percentageTopPlus || (Object.entries(this.percentageTopPlus).length === this._actualElementsViewing.length))
            return;
        Object.entries(this.percentageTopPlus).forEach(([id, innerObj], index) => {
            if(this._actualElementsViewing.includes(id))
                return;
            const firstPercentage:number = Number.parseInt(Object.entries(innerObj)[0][1].split("%")[0]);
            const secondPercentage:number = index === (Object.entries(this.percentageTopPlus).length - 1) ? 100 :Number.parseInt(Object.entries(Object.entries(this.percentageTopPlus)[index + 1][1])[0][1].split("%")[0]);
            if(scrollPercent >= firstPercentage && scrollPercent < secondPercentage){
                this.percentageComplete = `${Number.parseInt(this.percentageComplete.split("%")[0]) + this.mockData.getTimeLineStorys(this.globalStates.language).length}%`;
                setTimeout(() => {
                    this.circlesIconsStorys.update(current => [...current, `${(index === 0 ? secondPercentage - 10 : parseFloat(current[current.length - 1].split("%")[0]) + this.mockData.getTimeLineStorys(this.globalStates.language).length)}%`]);
                    setTimeout(() => {
                        this.rootedStorys.update(current => ({
                            ...current,
                            [`${(index === 0 ? secondPercentage - 4.7 : parseFloat(Object.keys(current)[Object.keys(current).length - 1].split("%")[0]) + this.mockData.getTimeLineStorys(this.globalStates.language).length)}%`]: index % 2 === 0 ? 'left' : 'right'
                        }));
                    }, 2300);
                }, 500);
                this.animationPushService.movementYWithOpacityAppear(Array.from(this._divTimeLine.nativeElement.children).find(c=>c.id === id) as HTMLElement,{"movementYWithOpacityAppearDuration":"2s","movementYWithOpacityAppearInitDuration":"0s","movementYWithOpacityAppearTiming":"ease-in-out","movementYWithOpacityAppearDistance":"-5%"});
                this._actualElementsViewing.push(id);
            }
        });
    }
    constructor(@Inject(PLATFORM_ID) private platformId: Object){
        effect(()=>{
            this.translate.use(this.globalStates.language);
            if(this._h1Tittle.nativeElement.textContent != ''){
                this._h1Tittle.nativeElement.textContent = this.translate.instant((this._h1Tittle.nativeElement as HTMLElement).dataset["translate"] as string);
                const wordToColor:string = ((this._h1Tittle.nativeElement as HTMLElement).dataset["translateWordText"] as string) || '';
                if(wordToColor != ""){
                    const html:string = this._h1Tittle.nativeElement.textContent?.replace(wordToColor,`<span style='color:${((this._h1Tittle.nativeElement as HTMLElement).dataset["translateWordColor"] as string)};'>${wordToColor}</span>`) || '';
                    const safeHtml:SafeHtml  = this.sanitizer.bypassSecurityTrustHtml(html) || '';
                    const innerContent:string = this.sanitizer.sanitize(SecurityContext.HTML,safeHtml) || '';
                    this._h1Tittle.nativeElement.innerHTML = innerContent;
                }
            }
        });
        this.setPercentageTop(false);
    }
    ngAfterViewInit(): void {
        if(isPlatformBrowser(this.platformId))
            this.setPercentageTop(true);
    }
   
    setPercentageTop(isOn:boolean){
        if(isOn){
            Array.from(this._divTimeLine.nativeElement.children).forEach(el=>{
                if(!this.percentageTopPlus[el.id])
                    return;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                this.setLastPropertyPercentageTop(el.id,`${((el.getBoundingClientRect().top - (el.clientHeight * 0.22)) / scrollHeight) * 100}%`);
            });
        }
        else{
            this.mockData.getTimeLineStorys(this.globalStates.language).forEach((data,index)=>{
                if(index === 0 )
                    this.percentageTopPlus[data.id] = {'1%':'0%'};
                else if(index % 2 === 0)
                    this.percentageTopPlus[data.id] = {'0%':'0%'};
                else
                    this.percentageTopPlus[data.id] = {'32%':'0%'};
            });
        }
    }
    setLastPropertyPercentageTop(id:string,value:string){
        const obj = this.percentageTopPlus[id];
        if (obj) {
            const keys = Object.keys(obj);
            const lastKey = keys[keys.length - 1];
            obj[lastKey] = value;
        }
    }
    getFirstMarginTop(id: string): string {
        const obj = this.percentageTopPlus[id];
        return Object.keys(obj)[0];
    }
    getRootedStorysArray() {
        return Object.entries(this.rootedStorys()); 
    }
    getFormattedDate(date: Date): string {
        return new Intl.DateTimeFormat(this.globalStates.language, { dateStyle: "long" }).format(date);
    }
}