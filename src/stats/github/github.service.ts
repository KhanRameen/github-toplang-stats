import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { stat } from 'fs';

@Injectable()
export class GithubService {
    private readonly baseUrl= 'https://api.github.com'

    constructor (private config: ConfigService){}

    private get headers(){
        return{
            Authorization: `Bearer ${this.config.get('GITHUB_TOKEN')}`,
            Accept: 'application/vnd.github+json'            
        }
    }

    async getUserRepos(username:string){
        const {data} = await axios.get(`${this.baseUrl}/users/${username}/repos?per_page=80`, {headers:this.headers})

        return data.filter((repo:any)=> !repo.fork)
    }

    async getRepoLanguages(owner:string, repo:string){
        const {data} = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}/languages`, {headers:this.headers})
        return data
    }

}
