import { Filter } from '../entities/filter';
import { toFilterDto } from './to-filter-dto';

describe('toFilterDto', () => {
  it('should convert Filter to FilterDto', () => {
    const filter =
      {
        id: 1,
        name: 'Test Filter 1',
        criterias: [{ type: 'amount', condition: 'equals', value: '2' }]
      } as Filter;

    const expected =
      {
        id: 1,
        name: 'Test Filter 1',
        criterias: [{ type: 'amount', condition: 'equals', value: '2' }]
      };

    const result = toFilterDto(filter);
    expect(result).toEqual(expected);
  });
});