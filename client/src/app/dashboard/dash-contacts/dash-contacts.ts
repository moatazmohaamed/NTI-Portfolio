import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../pages/contact/contact';
import { DashboardDataService } from '../services/dashboard-data.service';
import { ContactForm } from '../../core/interfaces/IContact';

@Component({
  selector: 'app-dash-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-contacts.html',
  styleUrl: './dash-contacts.scss',
})
export class DashContactsComponent implements OnInit {
  contacts = signal<ContactForm[]>([]);
  isLoading = signal<boolean>(true);
  selectedContactId = signal<string | null>(null);

  private dashService = inject(DashboardDataService);

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.isLoading.set(true);
    this.dashService.getContacts().subscribe({
      next: (data: any) => {
        this.contacts.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
        this.isLoading.set(false);
      },
    });
  }

  deleteContact(id: string): void {
    if (confirm('Are you sure you want to delete this contact message?')) {
      this.dashService.deleteContact(id).subscribe({
        next: () => {
          this.contacts.update((contacts) => contacts.filter((contact) => contact._id !== id));
        },
        error: (error) => {
          console.error('Error deleting contact:', error);
          alert('Failed to delete contact. Please try again.');
        },
      });
    }
  }
}
