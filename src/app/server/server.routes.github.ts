import { GitProyect } from '@app/core/models/gitProyect.model';
import { Request, Response } from 'express';

export const githubRoutes = [
  {
    path: '/api/github/get',
    method: 'get',
    handler: async (req: Request, res: Response) => {
      try {
        const response = await fetch(`${process.env['GITHUB_URL']}/user/repos`,{
            headers:{
                'Authorization':`Bearer ${process.env['GITHUB_TOKEN']}`,
                'Accept':'application/vnd.github+json'
            }
        });
        if(!response.ok){
            res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const jsonRes = await response.json();
        const mappedRepos: GitProyect[] = await Promise.all(
        jsonRes.map(async (repo: any) => {
          const languages: Record<string, string> = {};
          try {
            const responseLanguages = await fetch(repo.languages_url, {
              headers: {
                'Authorization': `Bearer ${process.env['GITHUB_TOKEN']}`,
                'Accept': 'application/vnd.github+json'
              }
            });
            const responseMarkDown = await fetch(repo.url + "/readme",{
              headers:{
                'Authorization': `Bearer ${process.env['GITHUB_TOKEN']}`,
                'Accept': 'application/vnd.github+json'
              }
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
              const decodedContent = Buffer.from(jsonReadme.content,jsonReadme.encoding).toString("utf-8");
            }
          } catch (err) {
            console.error(`Error fetching languages for repo ${repo.name}:`, err);
          }
          return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            created_at: new Date(repo.created_at),
            pushed_at: new Date(repo.pushed_at),
            languages_used: languages
          } as GitProyect;
        })
      );
      res.status(200).json(jsonRes);
      } catch (err: any) {
        console.error('github send error:', err?.response?.data ?? err);
        res.status(500).json({ sucess:false });
      }
    }
  }
];
