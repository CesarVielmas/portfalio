import { NgStyle } from "@angular/common";
import { Component, effect, ElementRef, inject, SecurityContext, ViewChild} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NavHeaderMockProvider } from "@app/core/mocks/nav-elements.mock";
import { GlobalStatesService } from "@app/core/services/global-states.service";
import { standardCardParameters } from "@app/core/services/interfaces/standardCardParameters.config";
import { MobileCarruselComponent } from "@app/shared/components/mobile-carrusel/mobile-carrusel.component";
import { StandardCardComponent } from "@app/shared/components/standard-card/standard-card.component";
import { WaveAnimationComponent } from "@app/shared/components/wave-animation/wave-animation.component";
import { AnimationDirective } from "@app/shared/directives/animation.directive";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
    selector:'home-presentation',
    imports:[StandardCardComponent,AnimationDirective,TranslateModule,WaveAnimationComponent,MobileCarruselComponent],
    templateUrl:'./home-presentation.component.html',
    styleUrl:'./home-presentation.component.scss',
})

export class HomePresentationComponent{
    @ViewChild('divTranslatedText',{static:true})
    protected _divTranslatedText!: ElementRef<HTMLDivElement>;
    protected cardConfigPresentation:standardCardParameters = { id:"card_presentation", radiusCard:"1vw", backgroundColorCard:"#0E6A95",borderCard:"none",flexDirectionCard:"row"} as standardCardParameters;
    protected cardConfigSomeLanguages:standardCardParameters = { id:"card_some_languages", radiusCard:"0.5vw", backgroundColorCard:"#083d56",borderCard:"none",boxShadowCard:"0px 0px 10px 0.15vw #0B384E",flexDirectionCard:"column"} as standardCardParameters;
    protected divisionWaveStart : string = "M0,224L14.1,218.7C28.2,213,56,203,85,170.7C112.9,139,141,85,169,80C197.6,75,226,117,254,165.3C282.4,213,311,267,339,240C367.1,213,395,107,424,96C451.8,85,480,171,508,213.3C536.5,256,565,256,593,229.3C621.2,203,649,149,678,128C705.9,107,734,117,762,112C790.6,107,819,85,847,69.3C875.3,53,904,43,932,48C960,53,988,75,1016,122.7C1044.7,171,1073,245,1101,266.7C1129.4,288,1158,256,1186,245.3C1214.1,235,1242,245,1271,224C1298.8,203,1327,149,1355,133.3C1383.5,117,1412,139,1426,149.3L1440,160L1440,0L1425.9,0C1411.8,0,1384,0,1355,0C1327.1,0,1299,0,1271,0C1242.4,0,1214,0,1186,0C1157.6,0,1129,0,1101,0C1072.9,0,1045,0,1016,0C988.2,0,960,0,932,0C903.5,0,875,0,847,0C818.8,0,791,0,762,0C734.1,0,706,0,678,0C649.4,0,621,0,593,0C564.7,0,536,0,508,0C480,0,452,0,424,0C395.3,0,367,0,339,0C310.6,0,282,0,254,0C225.9,0,198,0,169,0C141.2,0,113,0,85,0C56.5,0,28,0,14,0L0,0Z";
    protected divisionWaveEnd : string = "M0,32L14.1,64C28.2,96,56,160,85,181.3C112.9,203,141,181,169,186.7C197.6,192,226,224,254,224C282.4,224,311,192,339,170.7C367.1,149,395,139,424,154.7C451.8,171,480,213,508,202.7C536.5,192,565,128,593,128C621.2,128,649,192,678,213.3C705.9,235,734,213,762,224C790.6,235,819,277,847,288C875.3,299,904,277,932,229.3C960,181,988,107,1016,106.7C1044.7,107,1073,181,1101,202.7C1129.4,224,1158,192,1186,154.7C1214.1,117,1242,75,1271,101.3C1298.8,128,1327,224,1355,229.3C1383.5,235,1412,149,1426,106.7L1440,64L1440,0L1425.9,0C1411.8,0,1384,0,1355,0C1327.1,0,1299,0,1271,0C1242.4,0,1214,0,1186,0C1157.6,0,1129,0,1101,0C1072.9,0,1045,0,1016,0C988.2,0,960,0,932,0C903.5,0,875,0,847,0C818.8,0,791,0,762,0C734.1,0,706,0,678,0C649.4,0,621,0,593,0C564.7,0,536,0,508,0C480,0,452,0,424,0C395.3,0,367,0,339,0C310.6,0,282,0,254,0C225.9,0,198,0,169,0C141.2,0,113,0,85,0C56.5,0,28,0,14,0L0,0Z";
    protected carruselParameterStyleFather: Record<string, any> = {
        display: 'flex',
        height: '36%',
        width: '100%',
        margin: '0 auto',
        gap: '1%',
        overflow: 'hidden', 
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative'
    };
    protected carruselParameterStyleCard: Record<string, any> = {
        display: 'flex',
        height: '98%',
        width: '23%',
        marginLeft:'1%',
        overflow:'hidden',
        borderRadius: '0.4vw',
        flexDirection: 'column',
        boxShadow: '0px 0px 10px -2px #165678',
        flexShrink: 0,
        transition: 'transform 0.5s ease-in-out',
    };
    protected translate: TranslateService = inject(TranslateService); 
    protected mockData:NavHeaderMockProvider = inject(NavHeaderMockProvider);
    protected carruselContentTechnologys:Record<string,any>[] = this.mockData.someTechnologys;
    protected carruselContentTools:Record<string,any>[] = this.mockData.someTools;
    private globalStates:GlobalStatesService =  inject(GlobalStatesService);
    private sanitizer:DomSanitizer = inject(DomSanitizer);
    constructor(){
        effect(()=>{
            this.translate.use(this.globalStates.language);
            Array.from(this._divTranslatedText.nativeElement.children).forEach((el)=>{
                if(el.textContent != ''){
                    el.textContent = this.translate.instant((el as HTMLElement).dataset["translate"] as string);
                    const wordToColor:string = ((el as HTMLElement).dataset["translateWordText"] as string) || '';
                    if(wordToColor != ""){
                        const html:string = el.textContent?.replace(wordToColor,`<span style='color:${((el as HTMLElement).dataset["translateWordColor"] as string)};'>${wordToColor}</span>`) || '';
                        const safeHtml:SafeHtml  = this.sanitizer.bypassSecurityTrustHtml(html) || '';
                        const innerContent:string = this.sanitizer.sanitize(SecurityContext.HTML,safeHtml) || '';
                        el.innerHTML = innerContent;
                    }
                }
            });
        });
    }
}