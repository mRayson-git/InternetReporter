import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogOverviewComponent } from './log-overview/log-overview.component';

const routes: Routes = [
  { path: 'log-overview', component: LogOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
