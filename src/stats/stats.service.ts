import { Injectable, NotFoundException } from '@nestjs/common';
import { GithubService } from './github/github.service';

@Injectable()
export class StatsService {
    constructor(private github: GithubService){}

    async getLanguageStats(username:string){
        const repos = await this.github.getUserRepos(username)
        if(!repos){
            throw new NotFoundException(`repos under the username ${username} not found!`)
        }
        const totals: Record<string,number> = {}

        for (const repo of repos){
            const langs = await this.github.getRepoLanguages(username, repo.name)
            
            for (const [lang,bytes] of Object.entries(langs)){
                totals[lang]=(totals[lang] || 0) + (bytes as number)
            }
        }

        const totalBytes = Object.values(totals).reduce(
            (a,b)=> a+b, 0
        )

        const percentages: Record<string,number>= {}

        for (const [lang, byte] of Object.entries(totals)){
            percentages[lang]= Math.round((byte as number/totalBytes)*100)
        }
        
        return percentages
    }
}
