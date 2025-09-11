import { isPlatformBrowser } from "@angular/common";
import { Component, effect, ElementRef, Inject, inject, OnInit, PLATFORM_ID, SecurityContext, signal, ViewChild } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { GitProyect } from "@app/core/models/gitProyect.model";
import { GithubApiService } from "@app/core/services/github-api.service";
import { GlobalStatesService } from "@app/core/services/global-states.service";
import { InternetErrorComponent } from "@app/shared/components/internet-error/internet-error.component";
import { LoadingSquareComponent } from "@app/shared/components/loading-square/loading-square.component";
import { AnimationDirective } from "@app/shared/directives/animation.directive";
import { TranslateModule, TranslateService } from "@ngx-translate/core";


@Component({
    selector:'projects-presentation',
    imports:[TranslateModule,AnimationDirective,LoadingSquareComponent,InternetErrorComponent],
    templateUrl:'./projects-presentation.component.html',
    styleUrl:'./projects-presentation.component.scss',
})

export class ProjectsPresentationComponent{
    protected translate:TranslateService = inject(TranslateService);
    private githubService: GithubApiService = inject(GithubApiService);
    protected globalStates:GlobalStatesService = inject(GlobalStatesService);
    private sanitizer:DomSanitizer = inject(DomSanitizer);
    protected git_proyects =  signal<Record<string, GitProyect[]>>({});
    protected error_petition = signal<boolean>(false);
    @ViewChild('projectsTittle',{static:true})
    private _h1Tittle!: ElementRef<HTMLHeadingElement>;
    constructor(@Inject(PLATFORM_ID) private platformId: Object,private el: ElementRef){
        effect(()=>{
            this.translate.use(this.globalStates.language);
            if(Object.keys(this.git_proyects()).length > 0){
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
            }
        });
        if(isPlatformBrowser(platformId)){
            setTimeout(()=>{
                this.githubService.obtainInformacionGithub().subscribe({
                    next: (res) => {
                        this.assignProjectsToAparts(res);
                    },
                    error: (err) => {
                        this.error_petition.set(true);
                        console.log(err);
                    }
                });
            },5);
        }
    }
    private assignProjectsToAparts(projects: GitProyect[]) {
        const result: { [apart: string]: GitProyect[] } = {};
        for (const proyect of projects) {
            let assigned = false;
            for (let i = this.globalStates.acceptedAparts.length - 1; i >= 0; i--) {
            const apart = this.globalStates.acceptedAparts[i];
            if (proyect.technologys_used?.some(topic => topic.toLowerCase() === apart.toLowerCase())) {
                if (!result[apart]) result[apart] = [];
                result[apart].push(proyect);
                assigned = true;
                break; 
            }
            }
            if (!assigned) {
            if (!result['TOPIC_OTHERS']) result['TOPIC_OTHERS'] = [];
            result['TOPIC_OTHERS'].push(proyect);
            }
        }
        this.git_proyects.set(result);
    }
    get projectsByApartKeys(): string[] {
        const keys = Object.keys(this.git_proyects());
        return keys.filter(k => k !== 'TOPIC_OTHERS').concat(keys.includes('TOPIC_OTHERS') ? ['TOPIC_OTHERS'] : []);
    }
    getProjectImage(proyect: any): string {
        const defaultProjectImage: string = 'assets/png/not_found_proyect.webp';
        const urlImages = proyect?.proyect_information?.[this.globalStates.language]?.url_images;
        if (!urlImages) return defaultProjectImage;
        const urls = Object.values(urlImages) as string[];
        const pngUrl = urls.find(url =>
            typeof url === 'string' &&
            url.length > 0 &&
            !url.toLowerCase().endsWith('.gif') &&
            (url.toLowerCase().endsWith('.png') || url.startsWith('data:image/png')) 
        );
        if (pngUrl) return pngUrl;
        const anyUrl = urls.find(url =>
            typeof url === 'string' &&
            url.length > 0 &&
            !url.toLowerCase().endsWith('.gif') &&
            !url.startsWith('data:image/gif')
        );

        return anyUrl || defaultProjectImage;
    }
    getProjectDescription(proyect: any): string {
        const state = proyect?.state_proyect ?? 0;
        const stateKey = `PROJECT_STATE_${state}`;
        const stateDescription = this.translate.instant(stateKey);
        const techs = proyect?.technologys_used ?? [];
        const techsFormatted = techs.join(', ');
        const techsDescription = this.translate.instant('PROJECT_TECH_USED', { techs: techsFormatted });
        return `${stateDescription} ${techsDescription}`;
    }
    getProjectTitle(proyect: any): string {
        const defaultTitle = this.translate.instant('PROJECT_WITHOUT_TITTLE');
        const titleObj = proyect?.proyect_information?.[this.globalStates.language]?.tittle;
        if (!titleObj) return defaultTitle;
        return typeof titleObj === 'string'
            ? titleObj
            : typeof Object.values(titleObj)[0] === 'string'
                ? Object.values(titleObj)[0] as string
                : defaultTitle;
    }
    getProjectDates(proyect: any): { created: string; updated: string } {
        const created = proyect?.created_at ? new Date(proyect.created_at) : null;
        const updated = proyect?.pushed_at ? new Date(proyect.pushed_at) : null;

        return {
            created: created ? created.toLocaleDateString(this.globalStates.language) : 'N/A',
            updated: updated ? updated.toLocaleDateString(this.globalStates.language) : 'N/A',
        };
    }
    getProjectLanguages(proyect: any): { name: string; percent: string }[] {
        const langs = proyect?.languages_used || {};
        return Object.entries(langs)
            .map(([name, percent]) => ({ name, percent: String(percent) }))
            .slice(0, 3); 
    }
    goToProjectDetail(proyect: GitProyect) {
        this.globalStates.requestAnimatedNavigation('/proyects/' + proyect.name, proyect);
    }
}