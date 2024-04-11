import { toFilters } from './to-filters';
import { FilterDto } from '../entities/filter';

describe('toFilters', () => {
  it('should convert an array of FilterDtos to an array of Filters', () => {
    const filterDtos = [
      {
        id: 1,
        name: 'Test Filter 1',
        criterias: [{ type: 'amount', condition: 'equals', value: '2' }]
      } as FilterDto,
      {
        id: 2,
        name: 'Test Filter 2',
        criterias: [{ type: 'title', condition: 'contains', value: 'test' }]
      } as FilterDto
    ];

    const expected = [
      {
        id: 1,
        name: 'Test Filter 1',
        criterias: [{ type: 'amount', condition: 'equals', value: '2' }]
      },
      {
        id: 2,
        name: 'Test Filter 2',
        criterias: [{ type: 'title', condition: 'contains', value: 'test' }]
      }
    ];

    const result = toFilters(filterDtos);
    expect(result).toEqual(expected);
  });
});