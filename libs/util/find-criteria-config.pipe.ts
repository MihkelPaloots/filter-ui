import { Pipe, PipeTransform } from '@angular/core';
import { CriteriaConfig } from '../filter-config/domain/src';

@Pipe({
  name: 'findCriteriaConfig'
})
export class FindCriteriaConfigPipe implements PipeTransform {

  transform(criteriaOptions: CriteriaConfig[] | null | undefined, type: string | undefined): CriteriaConfig {
    return criteriaOptions?.find(config => config.name === type) ?? {} as CriteriaConfig;
  }

}