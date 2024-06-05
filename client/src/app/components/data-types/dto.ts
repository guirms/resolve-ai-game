export interface CountyInfo {
    name: string;
    value: number;
    isSelected: boolean;
}

export interface DayContent {
    number: number;
    hints: string[]; 
}

export interface CurrentNumber {
    number: number;
    hint: string; 
    dayContentIndex: number;
    hintIndex: number;
}