import { Component, Output, EventEmitter, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.scss'
})
export class DashboardHeader implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();

  currentSection: string = '';
  isUserMenuOpen = false;

  private router = inject(Router);

  ngOnInit(): void {
    this.updateCurrentSection(this.router.url);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateCurrentSection(event.url);
      });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isUserMenuOpen = false;
    }
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  private updateCurrentSection(url: string): void {
    const segments = url.split('/');
    if (segments.length > 2 && segments[1] === 'dashboard') {
      this.currentSection = segments[2];
    } else {
      this.currentSection = '';
    }
  }
}
