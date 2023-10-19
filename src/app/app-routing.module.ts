import { SearchPanelComponent } from './content/search-panel/search-panel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'excuse-maker',
    component: SearchPanelComponent
  },
  { path: '**', redirectTo: '/excuse-maker', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
