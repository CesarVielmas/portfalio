import { Component, effect, ElementRef, forwardRef, inject, Input, signal, ViewChild} from "@angular/core";
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import phonePrefix from "@app/../assets/i18n/phone_prefix.json";
import { NgClass, NgStyle } from "@angular/common";
import { GlobalStatesService } from "@app/core/services/global-states.service";
import { AnimationDirective } from "@app/shared/directives/animation.directive";
import { AnimationPushService } from "@app/core/services/animations-push.service";

@Component({
    selector:'phone-input',
    imports:[TranslateModule,NgStyle,NgClass,AnimationDirective],
    templateUrl:'./phone-input.component.html',
    styleUrl:'./phone-input.component.scss',
    providers: [{ 
        provide: NG_VALUE_ACCESSOR, 
        useExisting: forwardRef(() => PhoneInputComponent), 
        multi: true 
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }]
})
export class PhoneInputComponent implements ControlValueAccessor,Validator{
    @Input() label!:string;
    @Input() labelStyle!:Record<string,any>;
    @Input() inputStyle!:Record<string,any>;
    protected value:string = '';
    protected phonePrefix:string = '';
    protected translate: TranslateService = inject(TranslateService);
    protected widthPrefix = signal<[string, number,number[]]>(["20%",0,[0,0]]);
    private globalStates:GlobalStatesService =  inject(GlobalStatesService);
    private _animationPushService:AnimationPushService = inject(AnimationPushService); 
    @ViewChild('prefixContainer',{static:true})
    protected _divPrefixContainer!: ElementRef<HTMLDivElement>;
    private _onWriting = (value:string) =>{
        let valuePhonePrefix:number = 0;
        let valueLenghth:number[] = [0,0];
        [this.phonePrefix,valuePhonePrefix,valueLenghth] = this.detectCountryFromPhone(this.value);
        if(!this.value.includes("+"))
            this.value = "  +"+this.value;
        if(valuePhonePrefix !== this.widthPrefix()[1]){
            this.value = this.value.replaceAll(" ","");
            this._animationPushService.movementYWithOpacityAppear(this._divPrefixContainer.nativeElement,{"movementYWithOpacityAppearDuration":"0.65s","movementYWithOpacityAppearInitDuration":"0s","movementYWithOpacityAppearTiming":"ease-in-out","movementYWithOpacityAppearDistance":"-20%"});
            this.value = this.value.slice(0,valuePhonePrefix) + "    ";
        }
        this.widthPrefix.set([`${ 20 + (valuePhonePrefix === 1 ? 0 : valuePhonePrefix === 2 ? 6.5 : valuePhonePrefix === 3 ? 9 : valuePhonePrefix === 4 ? 11 : valuePhonePrefix === 5 ? 13.5 : 13.5 + (3 * (valuePhonePrefix - 5)))}%`,valuePhonePrefix,valueLenghth]);
    }
    private _onChange = (value:string)=>{};
    private _onTouched = (value:string) => {};
    constructor(){
        effect(()=>{
            this.translate.use(this.globalStates.language);
        })
    }
    writeValue(value: string): void {
        this.value = value ?? '';
        if(!value)
            this.onReset();
    }
    registerOnChange(fn: any): void { this._onChange = fn; }
    registerOnTouched(fn: any): void { this._onTouched = fn; }
    onInput(event: Event,type:boolean) {
        this.value = (event.target as HTMLInputElement).value;
        if(!type){
            this._onWriting(this.value);
            this._onChange(this.value);
        }
        else
            this._onTouched(this.value);
    }
    detectCountryFromPhone(phoneNumber:string):[string,number,number[]] {
        const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
        for (const entry of phonePrefix) {
            if (cleanNumber.startsWith(entry.code)) {
            return [entry.country,entry.code.length,entry.length];
            }
        }
        return ["¿?",0,[0,0]];
    }
    validatePhoneNumber(typeValidation:string):boolean{
        if(this.value.length === 0) return false;
        if(this.value.replaceAll(" ","").replace("+","").length === 0)
            return true;
        let validateState:boolean = false;
        switch (typeValidation) {
            case "length":
                if((this.value.replaceAll(" ","").length - this.widthPrefix()[1]) > this.widthPrefix()[2][0] || (this.value.replaceAll(" ","").length - this.widthPrefix()[1]) < this.widthPrefix()[2][1])
                    validateState = true;
                else
                    validateState = false;
            break;
            case "number":
                const phoneNumber = this.value.replaceAll(" ","").replace("+","");
                if(phoneNumber.length === 0 || isNaN(Number(phoneNumber)))
                    validateState = true;
                else
                    validateState = false;
        }
        return validateState;
    }
    validate(control: AbstractControl): ValidationErrors | null {
        return (!this.validatePhoneNumber("length") && !this.validatePhoneNumber("number")) ? null : { phoneLength: this.obtainRangesText() };    
    }
    obtainRangesText():string{
        return `${this.widthPrefix()[2][0]} min - ${this.widthPrefix()[2][1]} max `;
    }
    onReset():void{
        this.phonePrefix = '';
        this.widthPrefix.set(['20%', 0, [0,0]]);
    }
}