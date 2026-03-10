import { Injectable } from '@nestjs/common';

@Injectable()
export class SvgService {
  generate(username: string, stats: Record<string, number>) {
    const entries = Object.entries(stats);

    const height = 80 + entries.length * 30;

    return `
        <svg width="420" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { fill: #c9d1d9; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif; }
    .lang { fill: #8b949e; font-size: 14px; font-family: Arial, sans-serif; }
  </style>

  <rect width="100%" height="100%" fill="#0d1117" rx="12"/>

  <text x="20" y="30" class="title">${username}'s Top Languages</text>

  ${this.renderBars(entries)}
</svg>
        `;
  }

  private renderBars(entries: [string, number][]){
    return entries.map(([lang, percent], index)=>{
      const y = 60 + index*30
      const barWidth = percent*3

      return `
      <text x="20" y="${y}" class="lang">${lang} ${percent}%</text>
<rect x="150" y="${y - 12}" width="${barWidth}" height="8" fill="${this.getColor(index)}" rx="4"/>
      `

    })

   
  }

   private getColor(index: number) {
    const colors: Record<number, string> = {
      0: '#3178c6',
      1: '#f1e05a',
      2: '#00ADD8',
      3: '#563d7c',
      4: '#e326d3',

    };

    return colors[index] || '#ff58a3';
}
}

