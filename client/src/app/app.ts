import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { DashLayout } from './dashboard/dash-layout/dash-layout';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    DashLayout,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Portfolio');
  isDashboard = signal(false);
  router = inject(Router);

  constructor() {
    this.checkDashboardRoute(this.router.url);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkDashboardRoute(event.url);
      });
  }

  private checkDashboardRoute(url: string): void {
    this.isDashboard.set(url.startsWith('/dashboard'));
  }
}
