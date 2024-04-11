import { Filter, FilterDto } from '../entities/filter';

export function toFilters(dtos: FilterDto[]): Filter[] {
  return dtos.map(dto => mapFilterDtoToFilter(dto));
}

function mapFilterDtoToFilter(filterDto: FilterDto): Filter {
  return {
    id: filterDto.id,
    name: filterDto.name,
    criterias: filterDto.criterias?.map(criteriaDto => ({
      type: criteriaDto.type,
      condition: criteriaDto.condition,
      value: criteriaDto.value,
    })),
  };
}
