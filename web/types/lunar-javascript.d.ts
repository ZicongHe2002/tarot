// Minimal typings for the untyped lunar-javascript package — only the
// surface this project uses.
declare module "lunar-javascript" {
  export class Solar {
    static fromYmd(y: number, m: number, d: number): Solar;
    static fromYmdHms(y: number, m: number, d: number, h: number, mi: number, s: number): Solar;
    getLunar(): Lunar;
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getHour(): number;
    getMinute(): number;
  }

  export class Lunar {
    getEightChar(): EightChar;
    getYearInGanZhi(): string;
    getDayInGanZhi(): string;
    getYearInChinese(): string;
    getMonthInChinese(): string;
    getDayInChinese(): string;
    getPrevJie(): JieQi | null;
    getNextJie(): JieQi | null;
  }

  export class JieQi {
    getName(): string;
    getSolar(): Solar;
  }

  export class EightChar {
    getYear(): string;
    getMonth(): string;
    getDay(): string;
    getTime(): string;
    getDayGan(): string;
    getDayWuXing(): string;
    getYearShiShenGan(): string;
    getMonthShiShenGan(): string;
    getTimeShiShenGan(): string;
    getYun(gender: number): Yun;
  }

  export class Yun {
    getStartYear(): number;
    isForward(): boolean;
    getDaYun(): DaYun[];
  }

  export class DaYun {
    getGanZhi(): string;
    getStartAge(): number;
    getEndAge(): number;
  }
}
