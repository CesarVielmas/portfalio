import { isPlatformBrowser } from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, inject, PLATFORM_ID } from "@angular/core";
import { GithubApiService } from "@app/core/services/github-api.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import * as Prism from 'prismjs';
import 'prismjs/components/prism-kotlin';

@Component({
    selector:'projects-presentation',
    imports:[TranslateModule],
    templateUrl:'./projects-presentation.component.html',
    styleUrl:'./projects-presentation.component.scss',
})

export class ProjectsPresentationComponent implements AfterViewInit {
    protected translate:TranslateService = inject(TranslateService);
    private githubService: GithubApiService = inject(GithubApiService);
    protected code:string = `fun main() = runBlocking {
                // Before you run the example, assign a corresponding API key as an environment variable.
            val apiKey = System.getenv("OPENAI_API_KEY") // or Anthropic, Google, OpenRouter, etc.

            val agent = AIAgent(
                executor = simpleOpenAIExecutor(apiKey), // or Anthropic, Google, OpenRouter, etc.
                systemPrompt = "You are a helpful assistant. Answer user questions concisely.",
                llmModel = OpenAIModels.Chat.GPT4o
            )

            val result = agent.run("Hello! How can you help me?")
            println(result)
            }`
    constructor(@Inject(PLATFORM_ID) private platformId: Object,private el: ElementRef){
        if(isPlatformBrowser(this.platformId)){
            this.githubService.obtainInformacionGithub().subscribe({
                next: (res) => {
                    console.log(res)
                },
                error: (err) => {
                console.log(err);
                }
            })
        }
    }
    ngAfterViewInit(): void {
        if(isPlatformBrowser(this.platformId)){
            Prism.highlightAllUnder(this.el.nativeElement);
        }
    }
}