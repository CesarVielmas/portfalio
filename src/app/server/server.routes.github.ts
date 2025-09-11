import { GitProyect } from '@app/core/models/gitProyect.model';
import { ProyectInformation } from '@app/core/models/proyectInformation.model';
import { Request, Response } from 'express';

const CACHE_TTL = 1000 * 60 * 60 * 8; // 8 hours
let githubCache: {
  data: GitProyect[];
  lastUpdated: number;
  isUpdating: Promise<void> | null;
} = {
  data: [],
  lastUpdated: 0,
  isUpdating: null
};

export const githubRoutes = [
  {
    path: '/api/github/get',
    method: 'get',
    handler: async (req: Request, res: Response) => {
      try {
        const now = Date.now();
        if (now - githubCache.lastUpdated < CACHE_TTL) {
           return res.status(200).json(githubCache.data);
        }
        if (!githubCache.isUpdating) {
          let reTrys = 0;
          const MAX_RETRYS = 20;
          const fetchingDataGithub = (async () => {
            try {
              const data = await WithRetries(MAX_RETRYS);
              githubCache.data = data;
              githubCache.lastUpdated = Date.now();
            } catch (err) {
              res.status(500).json({ success: false, error: String(err) });
            } finally {
              githubCache.isUpdating = null;
            }
          })();
          githubCache.isUpdating = fetchingDataGithub;
        }
        if (githubCache.isUpdating) await githubCache.isUpdating;
        return res.status(200).json(githubCache.data);
      } catch (err: any) {
        console.error('github send error:', err?.response?.data ?? err);
        return res.status(500).json({ sucess:false });
      }
    }
  }
];
async function FetchingDataGithub():Promise<GitProyect[]> {
  try {
      const response = await fetch(`${process.env['GITHUB_URL']}/user/repos`,{
          headers:{
              'Authorization':`Bearer ${process.env['GITHUB_TOKEN']}`,
              'Accept':'application/vnd.github+json'
          },
          signal:AbortSignal.timeout(180000)
      });
      if(!response.ok) throw new Error('Unauthorized');
      const jsonRes = await response.json();
      const mappedRepos: GitProyect[] = await Promise.all(
      jsonRes
      .filter((repo:any)=>repo.description && repo.description.includes("state_proyect:"))
      .map(async (repo: any) => {
        const languages: Record<string, string> = {};
        const proyectInformation: Record<string,ProyectInformation> = {};
        try {
          const responseLanguages = await fetch(repo.languages_url, {
            headers: {
              'Authorization': `Bearer ${process.env['GITHUB_TOKEN']}`,
              'Accept': 'application/vnd.github+json'
            },
            signal:AbortSignal.timeout(180000)
          });
          const responseMarkDown = await fetch(repo.url + "/readme",{
            headers:{
              'Authorization': `Bearer ${process.env['GITHUB_TOKEN']}`,
              'Accept': 'application/vnd.github+json'
            },
            signal:AbortSignal.timeout(180000)
          });
          const responseIssues = await fetch(repo.issues_url.replace("{/number}",""),{
            headers:{
              'Authorization': `Bearer ${process.env['GITHUB_TOKEN']}`,
              'Accept': 'application/vnd.github+json'
            },
            signal:AbortSignal.timeout(180000)
          });
          if (responseLanguages.ok) {
            const jsonResLanguages: Record<string, number> = await responseLanguages.json();
            const totalLines = Object.values(jsonResLanguages).reduce((acc: number, curr: number) => acc + curr, 0);
            if (totalLines > 0) {
              for (const [lang, lines] of Object.entries(jsonResLanguages)) {
                const percent = ((lines / totalLines) * 100).toFixed(0);
                languages[lang] = `${percent}%`;
              }
            }
          }
          if(responseMarkDown.ok){
            const jsonReadme = await responseMarkDown.json();
            const issueContents = await responseIssues.json();
            const decodedContent = Buffer.from(jsonReadme.content,jsonReadme.encoding).toString("utf-8");
            const langMap : Record<string,string> = {
              English: "en",
              Español: "es",
              Italiano: "it"
              //add to check more
            }
            const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
            let match:RegExpExecArray | null;
            while((match = regex.exec(decodedContent))){
              const language = match[1].trim();
              const responseMarkDownLanguage = await fetch(repo.url + "/contents" + match[2].replace(/^\.\//, "/"),{
                headers:{
                  'Authorization': `Bearer ${process.env['GITHUB_TOKEN']}`,
                  'Accept': 'application/vnd.github+json'
                },
                signal:AbortSignal.timeout(180000)
              });
              const jsonReadmeLanguage = await responseMarkDownLanguage.json();
              const decodedContentLanguage = Buffer.from(jsonReadmeLanguage.content,jsonReadmeLanguage.encoding).toString("utf-8");
              const updatesProyect = issueContents.filter((issue: any) => {
                const labels = issue.labels.map((l: any) => l.name);

                const hasEnhancement = labels.includes("enhancement");
                const langLabel = labels.find((l: string) => l === `lang:${langMap[language]}`);

                return hasEnhancement && langLabel;
              });
              const lines = decodedContentLanguage.split("\n");
              const tittle: Record<string,string> = {};
              const subtittles: Record<string,string> = {};
              const contents: Record<string,string> = {};
              const url_images: Record<string,string> = {};
              const structure_proyect: string[] = [];
              let currentTag: string | null = null; 
              let currentContent: string[] = [];   
              const cleanMarkDown = (text:string):string => {
                return text
                  .replace(/^#+\s*/gm, "")           
                  .replace(/\*\*(.*?)\*\*/g, "$1")    
                  .replace(/\*(.*?)\*/g, "$1")        
                  .replace(/`([^`]*)`/g, "$1")       
                  .replace(/---/g, "")               
                  .replace(/!\[.*?\]\(.*?\)/g, "")    
                  .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") 
                  .replace(/>\s?/g, "")              
                  .replace(/[-•]\s+/g, "")           
                  .replace(/\r?\n+/g, "\n")           
                  .trim();
              } 
              const flushContent = async () => {
                if (!currentTag) return;

                const text = currentContent.join("\n").trim();
                if (!text) return;
                if (currentTag.includes("tittle")) tittle[currentTag] = cleanMarkDown(text);
                else if (currentTag.includes("subtitle")) subtittles[currentTag] = cleanMarkDown(text);
                else if (currentTag.includes("content")) contents[currentTag] = cleanMarkDown(text);
                else if (currentTag.includes("image")) {
                  const match = /!\[.*?\]\((.*?)\)/.exec(text);
                  if (match) {
                    const responseImageRaw = await fetch(repo.url + "/contents/" + match[1], {
                      headers: {
                        'Authorization': `Bearer ${process.env['GITHUB_TOKEN']}`,
                        'Accept': 'application/vnd.github+json'
                      },
                      signal:AbortSignal.timeout(180000)
                    });
                    const jsonImageRaw = await responseImageRaw.json();
                    if (repo.visibility === "public") {
                      url_images[currentTag] = jsonImageRaw.download_url;
                    } else {
                      let buffer: Buffer;
                      if (jsonImageRaw.content) {
                        buffer = Buffer.from(jsonImageRaw.content, jsonImageRaw.encoding);
                      } else if (jsonImageRaw.git_url) {
                        // Caso GIF u otros binarios grandes
                        const responseImageRawGit = await fetch(jsonImageRaw.git_url, {
                          headers: {
                            'Authorization': `Bearer ${process.env['GITHUB_TOKEN']}`,
                            'Accept': 'application/vnd.github+json'
                          },
                          signal:AbortSignal.timeout(180000)
                        });
                        const jsonImageRawGit = await responseImageRawGit.json();
                        buffer = Buffer.from(jsonImageRawGit.content, jsonImageRawGit.encoding);
                      } else {
                        throw new Error(`No se pudo obtener contenido de la imagen: ${jsonImageRaw.path}`);
                      }

                      const ext = jsonImageRaw.name.split('.').pop();
                      const base64 = `data:image/${ext};base64,${buffer.toString("base64")}`;
                      url_images[currentTag] = base64;
                    }
                  }
                }

                currentContent = [];
              }
              for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.startsWith("<!--") && trimmed.endsWith("-->")) {
                  await flushContent(); 
                  currentTag = trimmed;
                  structure_proyect.push(currentTag);
                  continue;
                }

                if (currentTag) {
                  currentContent.push(line);
                }
              }
              await flushContent();
              
              const updates: Record<string, string> = {};
              for (const proyect of updatesProyect) {
                updates[proyect.title] = proyect.body;
              }
              proyectInformation[langMap[language]] = {
                tittle,
                subtittles,
                contents,
                url_images,
                proyect_updates:updates,
                structure_proyect
              } as ProyectInformation
            }
          }
        } catch (err) {
          throw new Error(`Error fetching languages for repo ${repo.name}:${err}`);
        }
          return {
            id: repo.id,
            name: repo.name,
            html_url: repo.visibility === "public" ?repo.html_url : "",
            created_at: new Date(repo.created_at),
            pushed_at: new Date(repo.pushed_at),
            languages_used: languages,
            state_proyect:Number.parseInt(repo.description.split("state_proyect:")[1]),
            technologys_used:repo.topics,
            proyect_information:proyectInformation
          } as GitProyect;
      })
    );
    return mappedRepos;
  } catch (err) {
    throw err;
  }
}
async function WithRetries(maxRetries: number): Promise<GitProyect[]> {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await FetchingDataGithub();
    } catch (err) {
      lastError = err;
      await new Promise(r => setTimeout(r, 2000)); 
    }
  }
  throw new Error(`Max retries (${maxRetries}) reached. Last error: ${lastError}`);
}
