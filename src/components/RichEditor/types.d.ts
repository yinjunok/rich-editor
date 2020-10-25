// 布尔值类型的格式化
export type TBooleanFormat =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'sup'
  | 'sub'
  | 'del';

// 值型的格式化
export interface IValueFormat {
  fontSize: number;
}

export type TTextType =
  | 'paragraph'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4';
