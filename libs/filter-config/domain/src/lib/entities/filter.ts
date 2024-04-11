import { Criteria, CriteriaDto } from './criteria';

export interface FilterDto {
  id?: number;
  name?: string;
  criterias?: CriteriaDto[];
}

export interface Filter {
  id?: number;
  name?: string;
  criterias?: Criteria[];
}

export interface FilterModel {
  id?: number;
  name?: string;
}