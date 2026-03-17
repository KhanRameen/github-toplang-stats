import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { GithubService } from './github/github.service';

@Injectable()
export class StatsService {
    constructor(private github: GithubService){}

    private cache = new Map<
        string,
        {data:
            Record<string,number>;
            expires:number}
        >

    async getLanguageStats(username:string, hiddenLangs:string[]=[]){
        const cached = this.cache.get(username);

        if (cached && cached.expires > Date.now()) {
            return cached.data;
        }

        const repos = (await this.github.getUserRepos(username)).slice(0,80)
        if(!repos || !Array.isArray(repos)){
            throw new NotFoundException(`repos under the username ${username} not found!`)
        }   

        const languageRequests = repos.map((repo:any)=>{
            return this.github.getRepoLanguages(username, repo.name)
        })        
        
        const languagesArray = await Promise.all(languageRequests);
        if(!languagesArray || !Array.isArray(languagesArray)){
            throw new ConflictException(`Failed to get languages for the users repos`)
        }
        
        const totals: Record<string,number> = {}
        
        for (const langs of languagesArray){    
            for (const [lang,bytes] of Object.entries(langs)){
                totals[lang]=(totals[lang] || 0) + (bytes as number)
            }
        }

        const totalBytes = Object.values(totals).reduce(
            (a,b)=> a+b, 0
        )

        const percentages: Record<string,number> = {}

        for (const [lang, byte] of Object.entries(totals)){
            percentages[lang]= Math.round((byte as number/totalBytes)*100)
        }

        const filteredPercentages = Object.fromEntries(
            Object.entries(percentages).filter(
                ([lang]) => !hiddenLangs.includes(lang.toLowerCase())
            )
        );

        if (Object.keys(filteredPercentages).length === 0) {
            return {};
        }

        const cleaned = this.cleanState(filteredPercentages)

        this.cache.set(username, {
            data: cleaned,
            expires: Date.now() + 12 * 60 * 60 * 1000
        })

        return cleaned
    }

     private cleanState(stats: Record<string, number>){
        return Object.entries(stats).filter(([_, value])=>value>=0.5)
        .sort((a,b)=>b[1]-a[1]).slice(0,5).reduce((acc, [key, value])=>{
            acc[key] = value
            return acc
        },{} as Record<string, number>)
    }
}


