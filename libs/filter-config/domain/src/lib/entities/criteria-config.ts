export interface CriteriaConfigDto {
  id: number;
  name: string;
  conditionOptions: string[];
  dataType: DataType;
}

export interface CriteriaConfig {
  name: string;
  conditionOptions: string[];
  dataType: DataType;
}

export enum DataType {
  String = 'STRING',
  Date = 'DATE',
  Number = 'NUMBER',
}