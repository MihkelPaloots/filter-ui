import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'filter-config', pathMatch: 'full' },
  {
    path: 'filter-config',
    loadChildren: () => import('@filter/filter-config/feature-filter-config').then(m => m.FilterConfigFeatureFilterConfigModule),
  },
];
