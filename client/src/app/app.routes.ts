import { DashTestimonials } from './dashboard/dash-testimonials/dash-testimonials';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ServicesComponent } from './pages/services/services';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { Team } from './pages/team/team';
import { Contact } from './pages/contact/contact';
import { DashLayout } from './dashboard/dash-layout/dash-layout';
import { DashProjects } from './dashboard/dash-projects/dash-projects';
import { DashServices } from './dashboard/dash-services/dash-services';
import { DashCategories } from './dashboard/dash-categories/dash-categories';
import { DashTeam } from './dashboard/dash-team/dash-team';
import { DashFaqs } from './dashboard/dash-faqs/dash-faqs';
import { DashContactsComponent } from './dashboard/dash-contacts/dash-contacts';
import { DashAbout } from './dashboard/dash-about/dash-about';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'projects',
    component: Projects,
  },
  {
    path: 'team',
    component: Team,
  },
  {
    path: 'contact',
    component: Contact,
  },

  {
    path: 'dashboard',
    component: DashLayout,
    title: 'Dashboard',
    children: [
      { path: '', redirectTo: '/dashboard/projects', pathMatch: 'full' },
      { path: 'projects', component: DashProjects },
      { path: 'categories', component: DashCategories },
      { path: 'services', component: DashServices },
      { path: 'team', component: DashTeam },
      { path: 'testimonials', component: DashTestimonials },
      { path: 'contacts', component: DashContactsComponent },
      { path: 'faqs', component: DashFaqs },
      { path: 'about', component: DashAbout },
    ],
  },
];
