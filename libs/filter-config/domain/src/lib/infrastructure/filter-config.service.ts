import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CriteriaConfigDto } from '../entities/criteria-config';
import { FilterDto } from '../entities/filter';

@Injectable({ providedIn: 'root' })
export class FilterConfigService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) {}

  getCriteriaConfigs(): Observable<CriteriaConfigDto[]> {
    const url = `${this.apiUrl}/criteria-configs`;
    return this.http.get<CriteriaConfigDto[]>(url);
  }

  getFilters(): Observable<FilterDto[]> {
    const url = `${this.apiUrl}/filters`;
    return this.http.get<FilterDto[]>(url);
  }

  saveFilter(filter: FilterDto) {
    const url = `${this.apiUrl}/filters`;
    return this.http.post<string>(url, filter);
  }
}
