import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MyVoteComponent } from './components/my-vote/my-vote.component';
import { ResultsComponent } from './components/results/results.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"", redirectTo:"/home",pathMatch:"full"},
    {path:"myvote",component:MyVoteComponent},
    {path:"results",component:ResultsComponent},
    {path:"help",component:HelpComponent},
    {path:"pagenotfound",component:PageNotFoundComponent},
    {path:"**",redirectTo:"/pagenotfound",pathMatch:"full"}
];
