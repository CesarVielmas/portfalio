import { isPlatformBrowser } from "@angular/common";
import { Component,computed,ElementRef,Inject,inject,OnInit,PLATFORM_ID, signal} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GitProyect } from "@app/core/models/gitProyect.model";
import { GithubApiService } from "@app/core/services/github-api.service";
import { GlobalStatesService } from "@app/core/services/global-states.service";
import { LoadingSquareComponent } from "@app/shared/components/loading-square/loading-square.component";
import { AnimationDirective } from "@app/shared/directives/animation.directive";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
    selector:'project-selected',
    imports:[TranslateModule,LoadingSquareComponent,AnimationDirective],
    templateUrl:'./project-selected.component.html',
    styleUrl:'./project-selected.component.scss',
})
export class ProjectSelectedComponent{
    protected proyect = signal<GitProyect | null>(null);
    protected translate:TranslateService = inject(TranslateService);
    protected palette: string[] = ["#083d56","#3498db","#5dade2","#1abc9c","#16a085","#27ae60","#2ecc71","#28b463","#f39c12","#e67e22","#d35400","#e74c3c","#c0392b","#9b59b6","#8e44ad","#d98880","#af7ac5","#48c9b0","#52be80","#f1c40f","#f7dc6f","#95a5a6","#7f8c8d","#34495e","#2c3e50","#ff6f61","#ff9a76","#f5b7b1"];
    private router:Router = inject(Router);
    private route:ActivatedRoute = inject(ActivatedRoute);
    private githubService: GithubApiService = inject(GithubApiService);
    protected globalStates:GlobalStatesService = inject(GlobalStatesService);
    protected projectStructure = computed(() => {
        const p = this.proyect();
        if (!p) return [] as { key: string; type: 'h1'|'h2'|'img'|'list'|'p'|'span'; value: string }[];
        const lang = this.globalStates.language;
        const info = p.proyect_information?.[lang] ?? {};
        const structure = info.structure_proyect ?? [];
        const result: { key: string; type: any; value: string }[] = [];
        for (const key of structure) {
        const value =
            (info.tittle && info.tittle[key]) ??
            (info.subtittles && info.subtittles[key]) ??
            (info.contents && info.contents[key]) ??
            (info.url_images && info.url_images[key]) ??
            null;

        if (!value) continue;
        const strVal = String(value);
        let type: any = 'span';
        if (key.toLowerCase().includes('tittle')) type = 'h1';
        else if (key.toLowerCase().includes('subtitle')) type = 'h2';
        else if (key.toLowerCase().includes('image')) type = 'img';
        else if (key.toLowerCase().includes('content')) {
            const trimmed = strVal.trim();
            if (trimmed.startsWith('1.') || trimmed.startsWith('-') || trimmed.includes('\n')) type = 'list';
            else type = 'p';
        } else {
            type = 'p';
        }
        result.push({ key, type, value: strVal });
        }
        return result;
    });
    protected projectUpdates = computed(() => {
        const p = this.proyect();
        if (!p) return {} as Record<string,string>;
        const lang = this.globalStates.language;
        return p.proyect_information?.[lang]?.proyect_updates ?? {};
    });
    protected projectUpdatesEntries = computed(() => {
        const updatesObj = this.projectUpdates();
        return Object.entries(updatesObj) as [string, string][];
    });
    constructor(@Inject(PLATFORM_ID) private platformId: Object,private el: ElementRef){
        if(isPlatformBrowser(platformId)){
            const nav = this.router.getCurrentNavigation();
            this.proyect.set(nav?.extras?.state as GitProyect);
            if(!this.proyect()){
                const name = this.route.snapshot.paramMap.get('name');
                if (name) {
                    setTimeout(()=>{
                        this.githubService.obtainInformacionGithub().subscribe({
                        next: (res) => {
                            const found = res.find((p: GitProyect) => p.name === name);
                            if (found) {
                                this.proyect.set(found as GitProyect);
                            } else {
                                console.error(`Proyecto "${name}" no encontrado`);
                            }
                        },
                        error: (err) => {
                            console.error('Error cargando proyecto', err);
                        }
                        });
                    },10);
                }
            }
        }
    }
    
    parseList(value: string): string[] {
        return value
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);
    }

    cleanListItem(item: string): string {
        return item.replace(/^\d+\.\s*/, '').replace(/^-+\s*/, '');
    }
    getProjectLanguages(proyect: any): { name: string; percent: string }[] {
        const langs = proyect?.languages_used || {};
        return Object.entries(langs)
            .map(([name, percent]) => ({ name, percent: String(percent === "0%"?"10%":percent) }));
    }
    getProjectDates(proyect: any): { created: string; updated: string } {
        const created = proyect?.created_at ? new Date(proyect.created_at) : null;
        const updated = proyect?.pushed_at ? new Date(proyect.pushed_at) : null;

        return {
            created: created ? created.toLocaleDateString(this.globalStates.language) : 'N/A',
            updated: updated ? updated.toLocaleDateString(this.globalStates.language) : 'N/A',
        };
    }
}