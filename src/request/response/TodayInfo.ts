export interface GrandTotal {
    decimal: string;
    digital: string;
    hours: number;
    minutes: number;
    seconds: number;
    text: string;
    total_seconds: number;
}

export interface Range {
    date: string;
    end: Date;
    start: Date;
    text: string;
    timezone: string;
}

export interface Data {
    categories: any[];
    dependencies?: any;
    editors: any[];
    grand_total: GrandTotal;
    languages: any[];
    machines: any[];
    operating_systems: any[];
    projects: any[];
    range: Range;
}

export interface TodayInfo {
    cached_at: Date;
    data: Data;
}