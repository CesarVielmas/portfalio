import { Component, effect, inject, signal} from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { GlobalStatesService } from "@app/core/services/global-states.service";
import { standardCardParameters } from "@app/core/services/interfaces/standardCardParameters.config";
import { StandardCardComponent } from "@app/shared/components/standard-card/standard-card.component";
import { WaveAnimationComponent } from "@app/shared/components/wave-animation/wave-animation.component";
import { AnimationDirective } from "@app/shared/directives/animation.directive";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import phonePrefix from "@app/../assets/i18n/phone_prefix.json";
import { PhoneInputComponent } from "@app/shared/components/phone-input/phone-input.component";
import { GmailApiService } from "@app/core/services/gmail-api.service";

@Component({
    selector:'contact-presentation',
    imports:[StandardCardComponent,AnimationDirective,WaveAnimationComponent,TranslateModule,ReactiveFormsModule,PhoneInputComponent],
    templateUrl:'./contact-presentation.component.html',
    styleUrl:'./contact-presentation.component.scss',
})

export class ContactPresentationComponent{
    protected cardConfigPresentation:standardCardParameters = { id:"card_presentation", radiusCard:"1vw", backgroundColorCard:"#1631423a",borderCard:"none",boxShadowCard:"0px 0px 10px 0px black",flexDirectionCard:"row"} as standardCardParameters;
    protected footerWaveInit:string = "M0,96L15,122.7C30,149,60,203,90,213.3C120,224,150,192,180,154.7C210,117,240,75,270,90.7C300,107,330,181,360,213.3C390,245,420,235,450,234.7C480,235,510,245,540,224C570,203,600,149,630,160C660,171,690,245,720,256C750,267,780,213,810,170.7C840,128,870,96,900,90.7C930,85,960,107,990,101.3C1020,96,1050,64,1080,64C1110,64,1140,96,1170,106.7C1200,117,1230,107,1260,96C1290,85,1320,75,1350,69.3C1380,64,1410,64,1425,64L1440,64L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z";
    protected footerWaveFinal:string = "M0,32L15,53.3C30,75,60,117,90,149.3C120,181,150,203,180,224C210,245,240,267,270,240C300,213,330,139,360,101.3C390,64,420,64,450,58.7C480,53,510,43,540,48C570,53,600,75,630,90.7C660,107,690,117,720,133.3C750,149,780,171,810,165.3C840,160,870,128,900,128C930,128,960,160,990,165.3C1020,171,1050,149,1080,117.3C1110,85,1140,43,1170,42.7C1200,43,1230,85,1260,122.7C1290,160,1320,192,1350,176C1380,160,1410,96,1425,64L1440,32L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z";
    protected styleLabelPhone = {
        'font-size': '1.4vw',
        'font-weight': '500',
        'color': '#083d56',
        'font-family':'Poppins',
        'text-aling':'center',
        'margin-left':'3%',
    }
    protected styleInputPhone = {
        'display': 'flex',
        'align-items': 'center',
        'position': 'relative',
        'height':'5vh',
        'width':'90%',
        'border-radius':'0.2vw',
        'margin-top':'1.5%',
        'box-shadow':'0px 0px 10px -2px #165678',
        'color':'#083d56',
        'font-size':'1.1vw',
        'letter-spacing':'0.1vw',
        'background-color':'#0E6A95'
    }
    protected translate: TranslateService = inject(TranslateService); 
    private globalStates:GlobalStatesService =  inject(GlobalStatesService);
    private gmailApiService:GmailApiService = inject(GmailApiService);
    protected successMessage = signal(false);
    protected errorMessage = signal(false);
    private fb:FormBuilder = inject(FormBuilder);
    protected contactForm:FormGroup = this.fb.group({
        phone : ['',Validators.required],
        name : ['',[Validators.required,Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
        email:['',[Validators.required,Validators.email]],
        information:['',Validators.maxLength(500)]
    });
    

    constructor(){
        effect(()=>{
            this.translate.use(this.globalStates.language);
        })
    }
    isInvalidControlForm(controlName: string) {
        const control = this.contactForm.get(controlName);
        return control?.invalid && control?.touched;
    }
    onSubmit() {
        if (this.contactForm.valid) {
            this.gmailApiService.sendMailContact({
                to:'vielmassalais023@gmail.com',
                subject:`${this.contactForm.value.name} - Contact Form Portfolio`,
                fromName:this.contactForm.value.name,
                fromEmail:this.contactForm.value.email,
                html:`<h1>Contact Form - From Portfolio</h1><p><strong>Name:</strong> ${this.contactForm.value.name}</p>
                       <p><strong>Email:</strong> ${this.contactForm.value.email}</p>
                       <p><strong>Phone:</strong> ${this.contactForm.value.phone}</p>
                       <p><strong>Message:</strong> ${this.contactForm.value.information}</p>`
            }).subscribe({
                next: () => {
                    this.successMessage.set(true);
                    setTimeout(()=>{
                        this.successMessage.set(false);
                    },7000);
                    this.errorMessage.set(false);
                },
                error: () => {
                    this.successMessage.set(false);
                    this.errorMessage.set(true);
                    setTimeout(()=>{
                        this.errorMessage.set(false);
                    },7000);
                }
            })
            this.contactForm.reset();
        } else {
            this.successMessage.set(false);
            this.errorMessage.set(true);
            setTimeout(()=>{
                this.errorMessage.set(false);
            },1000);
            this.contactForm.markAllAsTouched();
        }
    }
    
}