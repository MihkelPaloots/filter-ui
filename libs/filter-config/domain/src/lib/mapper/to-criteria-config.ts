
import { CriteriaConfig, CriteriaConfigDto } from '../entities/criteria-config';

export function toCriteriaConfigs(configs: CriteriaConfigDto[]): CriteriaConfig[] {
  return configs.map(config => ({
    name: config.name,
    conditionOptions: config.conditionOptions,
    dataType: config.dataType
  }));
}
