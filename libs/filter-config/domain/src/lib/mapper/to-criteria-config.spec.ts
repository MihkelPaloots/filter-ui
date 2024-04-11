import { CriteriaConfig, CriteriaConfigDto, DataType } from '../entities/criteria-config';
import { toCriteriaConfigs } from './to-criteria-config';

describe('toCriteriaConfigs', () => {
  it('should correctly convert CriteriaConfigDto array to CriteriaConfig array', () => {
    const input: CriteriaConfigDto[] = [
      { id: 1, name: 'Amount', conditionOptions: ['more than', 'more than'], dataType: DataType.Number },
      { id: 2, name: 'Title', conditionOptions: ['contains', 'starts with'], dataType: DataType.String }
    ];
    const expectedOutput: CriteriaConfig[] = [
      { name: 'Amount', conditionOptions: ['more than', 'more than'], dataType: DataType.Number },
      { name: 'Title', conditionOptions: ['contains', 'starts with'], dataType: DataType.String }
    ];

    const result = toCriteriaConfigs(input);
    expect(result).toEqual(expectedOutput);
  });
});