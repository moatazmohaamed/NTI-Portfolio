import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../components/sidebar/sidebar';
import { DashboardHeader } from '../components/dashboard-header/dashboard-header';

@Component({
  selector: 'app-dash-layout',
  imports: [RouterOutlet, CommonModule, Sidebar, DashboardHeader],
  templateUrl: './dash-layout.html',
  styleUrl: './dash-layout.scss',
})
export class DashLayout {
  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}
