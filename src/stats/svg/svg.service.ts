import { Injectable } from '@nestjs/common';
import { GITHUB_LANGUAGE_COLORS, ThemeName, THEMES } from './theme';
import { plainToClass } from 'class-transformer';

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
  <text x="${lx + 18}" y="${y}" font-family="'Segoe UI', Arial, sans-serif" font-size="12" font-weight="600" fill="#7a5c6e">${lang}</text>
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
}
