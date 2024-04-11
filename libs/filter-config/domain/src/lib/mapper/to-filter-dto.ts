import { Filter, FilterDto } from '../entities/filter';

export function toFilterDto(filter: Filter): FilterDto {
  return {
    id: filter.id,
    name: filter.name,
    criterias: filter.criterias?.map(criteria => ({
      type: criteria.type,
      condition: criteria.condition,
      value: criteria.value,
    })),
  };
}