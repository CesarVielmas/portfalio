import { isPlatformBrowser } from "@angular/common";
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from "@angular/core";

@Component({
    selector:'wave-animation-component',
    imports:[],
    templateUrl:'./wave-animation.component.html',
    styleUrl:'./wave-animation.component.scss',
})

export class WaveAnimationComponent implements OnInit,OnDestroy{
    @Input() startWave!:string;
    @Input() precision!:number;
    @Input() duration!:number;
    @Input() colorWave!:string;
    @Input() finalWave!:string;

    @ViewChild('svgPrincipal',{static:true})
    private _svgElement!: ElementRef<SVGPathElement>;
    private frame:number = 0;
    private forward:boolean = true;
    private animationId:number | null = null;
    
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
    ngOnInit(): void {
        if (this.startWave != null && this.finalWave != null && this.precision != null && this.duration != null && isPlatformBrowser(this.platformId))
            this.animate();    
    }
    ngOnDestroy(): void {
        if (this.animationId !== null && isPlatformBrowser(this.platformId)) {
            cancelAnimationFrame(this.animationId);
        }
    }
    private interpolatePath(p1: string, p2: string, t: number): string {
        const nums1 = p1.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
        const nums2 = p2.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
        const interpolated = nums1.map((n, i) => n + (nums2[i] - n) * t);
        let i = 0;
        return p1.replace(/-?\d+(\.\d+)?/g, () => interpolated[i++].toFixed(2));
    }
    private animate() {
        const totalFrames = this.precision;
        const t = this.forward ? this.frame / totalFrames : 1 - this.frame / totalFrames;
        const d = this.interpolatePath(this.startWave, this.finalWave,t);
        if (this._svgElement.nativeElement) {
            this._svgElement.nativeElement.setAttribute('d', d);
        }
        this.frame++;
        if (this.frame > totalFrames) {
            this.frame = 0;
            this.forward = !this.forward;
        }
        const delay = this.duration / (2 * totalFrames);
        this.animationId = Number(globalThis.setTimeout(() => this.animate(), delay));
    }
}