import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { PageNotFoundComponent } from './shared/components';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
   
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
