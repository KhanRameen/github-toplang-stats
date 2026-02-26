import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
}
