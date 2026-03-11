// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class SvgService {
//   generate(username: string, stats: Record<string, number>) {
//     const entries = Object.entries(stats);

//     const height = 80 + entries.length * 30;

//     return `
//         <svg width="420" height="${height}" xmlns="http://www.w3.org/2000/svg">
//   <style>
//     .title { fill: #c9d1d9; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif; }
//     .lang { fill: #8b949e; font-size: 14px; font-family: Arial, sans-serif; }
//   </style>

//   <rect width="100%" height="100%" fill="#0d1117" rx="12"/>

//   <text x="20" y="30" class="title">${username}'s Top Languages</text>

//   ${this.renderBars(entries)}
// </svg>
//         `;
//   }

//   private renderBars(entries: [string, number][]){
//     return entries.map(([lang, percent], index)=>{
//       const y = 60 + index*30
//       const barWidth = percent*3

//       return `
//       <text x="20" y="${y}" class="lang">${lang} ${percent}%</text>
// <rect x="150" y="${y - 12}" width="${barWidth}" height="8" fill="${this.getColor(index)}" rx="4"/>
//       `

//     })

   
//   }

//    private getColor(index: number) {
//     const colors: Record<number, string> = {
//       0: '#3178c6',
//       1: '#f1e05a',
//       2: '#00ADD8',
//       3: '#563d7c',
//       4: '#e326d3',

//     };

//     return colors[index] || '#ff58a3';
// }
// }

import { Injectable } from '@nestjs/common';

@Injectable()
export class SvgService {
  generate(username: string, stats: Record<string, number>) {
    const entries = Object.entries(stats);
    const total = entries.reduce((sum, [, v]) => sum + v, 0);
    const width = 420;
    const height = 260;

    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="sliceShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="2" dy="3" stdDeviation="5" flood-color="rgba(0,0,0,0.18)"/>
    </filter>
  </defs>

  ${this.renderPieSlices(entries, total)}
  ${this.renderLegend(entries, total)}
</svg>`;
  }

  private renderPieSlices(entries: [string, number][], total: number): string {
    const cx = 138, cy = 133, r = 92;
    let angle = -Math.PI / 2;
    const slices: string[] = [];
    const gap = 0.022;

    entries.forEach(([, value], i) => {
      const ratio = value / total;
      const sweep = ratio * Math.PI * 2 - gap;
      const midAngle = angle + gap / 2 + sweep / 2;

      const x1 = cx + r * Math.cos(angle + gap / 2);
      const y1 = cy + r * Math.sin(angle + gap / 2);
      const x2 = cx + r * Math.cos(angle + gap / 2 + sweep);
      const y2 = cy + r * Math.sin(angle + gap / 2 + sweep);
      const large = sweep > Math.PI ? 1 : 0;

      const offsetR = 5;
      const ox = offsetR * Math.cos(midAngle);
      const oy = offsetR * Math.sin(midAngle);

      const color = this.getSliceColor(i);

      const labelR = r * 0.62;
      const lx = (cx + ox + labelR * Math.cos(midAngle)).toFixed(1);
      const ly = (cy + oy + labelR * Math.sin(midAngle) + 5).toFixed(1);
      const percent = Math.round((value / total) * 100);

      slices.push(`
  <path d="M${(cx + ox).toFixed(2)},${(cy + oy).toFixed(2)} L${(x1 + ox).toFixed(2)},${(y1 + oy).toFixed(2)} A${r},${r} 0 ${large},1 ${(x2 + ox).toFixed(2)},${(y2 + oy).toFixed(2)} Z"
    fill="${color}" filter="url(#sliceShadow)" stroke="white" stroke-width="1"/>
  <text x="${lx}" y="${ly}" font-family="'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="white" text-anchor="middle">${percent}%</text>`);

      angle += ratio * Math.PI * 2;
    });

    return slices.join('\n');
  }

  private renderLegend(entries: [string, number][], total: number): string {
    const lx = 258;
    const rowH = 22;
    const startY = 60;

    return entries.map(([lang], i) => {
      const y = startY + i * rowH;
      const color = this.getSliceColor(i);

      return `
  <rect x="${lx}" y="${y - 9}" width="12" height="12" rx="3" fill="${color}"/>
  <text x="${lx + 18}" y="${y}" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="600" fill="#7a5c6e">${lang}</text>`;
    }).join('');
  }

  private getSliceColor(index: number): string {
    const palette = [
      '#f9d98a',
      '#f4a26b',
      '#f26d85',
      '#b85c8a',
      '#d4829e',
      '#e8a0b4',
      '#a3c4bc',
      '#7eb8c9',
    ];
    return palette[index % palette.length];
  }
}