import { Component, computed, ElementRef, inject, Signal, signal, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimationPushService } from '@app/core/services/animations-push.service';
import { GlobalStatesService } from '@app/core/services/global-states.service';
import { DeploymentMenu } from '@app/shared/components/deployment-menu/deployment-menu.component';
import { HorizontalMenuComponent } from '@app/shared/components/horizontal-menu/horizontal-menu.component';
import { IconTextWrapComponent } from '@app/shared/components/icon-text-wrap/icon-text-wrap.component';
import { WaveAnimationComponent } from '@app/shared/components/wave-animation/wave-animation.component';
import { AnimationDirective } from '@app/shared/directives/animation.directive';
import { MergeStylesPipe } from '@app/shared/pipes/mergeStyles.pipe';

@Component({
  selector: 'home-layout',
  imports: [HorizontalMenuComponent,IconTextWrapComponent,AnimationDirective,MergeStylesPipe,DeploymentMenu,WaveAnimationComponent,RouterOutlet],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss'
})
export class HomeLayout {
  @ViewChild('openChangeLanguage',{static:true})
  protected _divChangeLanguage!: ElementRef<HTMLDivElement>;
  protected globalStates: GlobalStatesService = inject(GlobalStatesService);
  private _animationPushService:AnimationPushService = inject(AnimationPushService);
  private _actualState = signal("");
  protected actualState:Signal<string> = computed(()=> this._actualState());
  private _openLanguage = signal(false);
  protected openLanguage:Signal<boolean> = computed(()=> this._openLanguage());
  protected footerWaveInit:string = "M0,96L80,80C160,64,320,32,480,48C640,64,800,128,960,160C1120,192,1280,192,1360,192L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z";
  protected footerWaveFinal:string = "M0,64L80,90.7C160,117,320,171,480,165.3C640,160,800,96,960,74.7C1120,53,1280,75,1360,85.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z";
  protected elementsHeader = [
    {
      id:"header_0",
      text:"header_home.PART_PROYECT_HEADER",
      icon:"collections_bookmark",
      path:"/proyects"
    },
    {
      id:"header_1",
      text:"header_home.PART_INFORMATION_HEADER",
      icon:"person",
      path:"/about-me"
    },
    {
      id:"header_2",
      text:"header_home.PART_CONTACT_HEADER",
      icon:"perm_contact_calendar",
      path:"/contact"
    },
    {
      id:"header_3",
      text:"header_home.PART_PROCESS_HEADER",
      icon:"timeline",
      path:"/time-line"
    }
  ]
  protected styleTextHeader = {
      position:'relative',
      width:'100%',
      height:'auto',
      textAlign:'start',
      fontFamily:'Poppins',
      fontWeight:300,
      color:'white',
      letterSpacing:'0.08vw',
      fontSize:'1.1vw',
      flex:1,
  }
  protected iconStyleHeader = {
    color:"white",
    fontSize:'2.3vw',
    height:'auto',
    textAlign:'center',
    flex:1,
  }
  protected animationHoverUnderline = {
    typeAnimation:'hover-underline',
    underlineColor:'white',
    underlineHeight:'2px',
    underlineDuration:'0.5s',
    underlineTiming:'ease-out'
  }
  OpenChangeLanguage = () => this._openChangeLanguage();
  ChangeToSpanish = () => this._changeLanguage("es");
  ChangeToEnglish = () => this._changeLanguage("en");
  NavigateToHome = ()=>this.globalStates.navigateTo("/");
  NavigationFunction(navigate:string,state:string = "",event:MouseEvent):void{
    // this.globalStates.navigateTo(navigate);
    if(state != "")
      this._actualState.set(state);
    const father = (event.target as HTMLElement).classList.contains("apart-header-nav") ? event.target as HTMLElement : ((event.target as HTMLElement).parentElement)?.parentElement;
    this._animationPushService.scaleAnimationClick(father as HTMLElement,{'scaleClickDuration':'0.25s','scaleClickTiming':'ease-out','scaleClickPercentage':1.2});
  }
  private _openChangeLanguage():void{
    const childLanguage:HTMLElement =  ((this._divChangeLanguage.nativeElement as HTMLElement).children[0] as HTMLElement).firstChild as HTMLElement;
    if(!this.openLanguage())
      this._animationPushService.rotateAnimationClick(childLanguage,{'rotateClickDuration':'0.5s','rotateClickTiming':'ease-out','rotateClickInitial':'0deg','rotateClickFinal':'180deg'});
    else
      this._animationPushService.rotateAnimationClick(childLanguage,{'rotateClickDuration':'0.5s','rotateClickTiming':'ease-out','rotateClickInitial':'180deg','rotateClickFinal':'0deg'});
    this._openLanguage.set(!this.openLanguage());
  }
  private _changeLanguage(language:string):void{
      this.globalStates.setLanguage(language);
  }
  
}
