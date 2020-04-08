import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

// returns the home component for root route and home routes.
let homeMatcherFunction = 
(url: UrlSegment[]) => (url.length === 1 && url[0].path.startsWith('home')? { consumed: url } : null)

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { matcher: homeMatcherFunction, component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
