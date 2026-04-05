import { Injectable } from '@nestjs/common';
import { GITHUB_LANGUAGE_COLORS, ThemeName, THEMES } from './theme';


@Injectable()
export class SvgService {
  generate(username: string, stats: Record<string, number>, theme?: ThemeName) {
    const entries = Object.entries(stats);
    const total = entries.reduce((sum, [, v]) => sum + v, 0);
    const width = 580;
    const height = 140;

    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="dotShadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.12)"/>
    </filter>
  </defs>

  ${this.renderDots(entries, total, theme)}
  ${this.renderLegend(entries, total, theme)}
</svg>`;
  }

  private renderDots(
    entries: [string, number][],
    total: number,
    theme?: ThemeName,
  ): string {
    const dots: string[] = [];
    const dotRadius = 6;
    const dotSpacing = 19;
    const cols = 20;
    const rows = 5;
    const startX = 25;
    const startY = 30;

    // Calculate how many dots each language gets (out of 100)
    const dotCounts = entries.map(([, value]) => {
      return Math.round((value / total) * 100);
    });

    // Adjust to ensure exactly 100 dots
    const totalDots = dotCounts.reduce((sum, count) => sum + count, 0);
    if (totalDots !== 100) {
      const diff = 100 - totalDots;
      const maxIndex = dotCounts.indexOf(Math.max(...dotCounts));
      dotCounts[maxIndex] += diff;
    }

    // Generate dots
    let dotIndex = 0;
    let currentLangIndex = 0;
    let dotsRemainingForLang = dotCounts[0];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (dotIndex >= 100) break;

        // Move to next language if current is exhausted
        while (
          dotsRemainingForLang === 0 &&
          currentLangIndex < entries.length - 1
        ) {
          currentLangIndex++;
          dotsRemainingForLang = dotCounts[currentLangIndex];
        }

        const x = startX + col * dotSpacing;
        const y = startY + row * dotSpacing;
        const color = this.getSliceColor(
          currentLangIndex,
          entries[currentLangIndex][0],
          theme,
        );

        dots.push(`
  <circle cx="${x}" cy="${y}" r="${dotRadius}" fill="${color}" filter="url(#dotShadow)"/>`);

        dotsRemainingForLang--;
        dotIndex++;
      }
    }

    return dots.join('');
  }

  private renderLegend(
    entries: [string, number][],
    total: number,
    theme?: ThemeName,
  ): string {
    const lx = 420;
    const rowH = 20;
    const startY = 31;

    return entries
      .map(([lang, value], i) => {
        const y = startY + i * rowH;
        const color = this.getSliceColor(i, lang, theme);
        const percent = ((value / total) * 100).toFixed(1);

        return `
  <rect x="${lx}" y="${y - 9}" width="10" height="10" rx="3" fill="${color}"/>
  <text x="${lx + 18}" y="${y}" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="600" fill="#9a8a96">${lang}</text>
  <text x="${lx + 150}" y="${y}" font-family="'Segoe UI', Arial, sans-serif" font-size="11" font-weight="400" fill="#9a8a96" text-anchor="end">${percent}%</text>`;
      })
      .join('');
  }

  private getSliceColor(
    index: number,
    lang: string,
    theme?: ThemeName,
  ): string {
    if (!theme) {
      return GITHUB_LANGUAGE_COLORS[lang] || '#3178c6';
    }

    const palette = THEMES[theme!];
    return palette[index % palette.length];
  }


generateError(message = 'something went wrong'): string {
  return `<svg width="400" height="90" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="90" rx="8" fill="#161b22" stroke="#30363d" stroke-width="1"/>
    
    <style>
      @keyframes blink {
        0%, 100% { opacity: 0.2; }
        50%       { opacity: 0.7; }
      }
      .d1 { animation: blink 1.4s ease-in-out infinite; }
      .d2 { animation: blink 1.4s ease-in-out 0.2s infinite; }
      .d3 { animation: blink 1.4s ease-in-out 0.4s infinite; }
    </style>

    <circle class="d1" cx="20" cy="20" r="3" fill="#8b949e"/>
    <circle class="d2" cx="30" cy="20" r="3" fill="#8b949e"/>
    <circle class="d3" cx="40" cy="20" r="3" fill="#8b949e"/>

    <text x="20" y="52" font-family="sans-serif" font-size="16" fill="#e6edf3">Uh Oh :(</text>
    <text x="20" y="72" font-family="monospace" font-size="11" fill="#8b949e">${message}</text>
  </svg>`;
}


//   generateSkeleton(): string {
//   return `<svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
//     <style>
//       .sk { fill: #30363d; rx: 4; }
//       @keyframes blink {
//         0%, 100% { opacity: 0.3; }
//         50%       { opacity: 0.9; }
//       }
//       rect { animation: blink 1.4s ease-in-out infinite; }
//       rect:nth-child(2) { animation-delay: 0.15s; }
//       rect:nth-child(3) { animation-delay: 0.30s; }
//       rect:nth-child(4) { animation-delay: 0.45s; }
//       rect:nth-child(5) { animation-delay: 0.60s; }
//       rect:nth-child(6) { animation-delay: 0.75s; }
//     </style>
//     <rect x="0"   y="0"  width="400" height="120" rx="8" fill="#161b22"/>
//     <rect x="16"  y="16" width="120" height="12"  rx="4" fill="#30363d"/>
//     <rect x="16"  y="44" width="360" height="10"  rx="4" fill="#30363d"/>
//     <rect x="16"  y="62" width="300" height="10"  rx="4" fill="#30363d"/>
//     <rect x="16"  y="80" width="200" height="10"  rx="4" fill="#30363d"/>
//     <rect x="16"  y="98" width="240" height="10"  rx="4" fill="#30363d"/>
//   </svg>`;
// }

}
