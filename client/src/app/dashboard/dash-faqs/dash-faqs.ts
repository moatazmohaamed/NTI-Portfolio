import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardDataService, FAQ } from '../services/dashboard-data.service';

@Component({
  selector: 'app-dash-faqs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dash-faqs.html',
  styleUrl: './dash-faqs.scss',
})
export class DashFaqs implements OnInit {
  faqs = signal<FAQ[]>([]);
  isLoading = signal<boolean>(false);
  showModal = signal<boolean>(false);
  currentFaqId = signal<string | null>(null);

  private dashService = inject(DashboardDataService);
  private fb = inject(FormBuilder);

  faqForm: FormGroup = this.fb.group({
    question: ['', [Validators.required, Validators.minLength(10)]],
    answer: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    this.isLoading.set(true);
    this.dashService.getFAQs().subscribe({
      next: (data: any) => {
        this.faqs.set(data.faqs);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading FAQs:', error);
        this.isLoading.set(false);
      },
    });
  }

  openModal(faq?: FAQ): void {
    if (faq) {
      this.currentFaqId.set(faq._id);
      this.faqForm.patchValue({
        question: faq.question,
        answer: faq.answer,
      });
    } else {
      this.currentFaqId.set(null);
      this.faqForm.reset();
    }
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.faqForm.reset();
    this.currentFaqId.set(null);
  }

  isEditing(): boolean {
    return this.currentFaqId() !== null;
  }

  onSubmit(): void {
    if (this.faqForm.invalid) {
      return;
    }

    const faqData = this.faqForm.value;
    this.isLoading.set(true);

    if (this.isEditing()) {
      this.dashService.updateFAQ(this.currentFaqId()!, faqData).subscribe({
        next: (updatedFaq) => {
          this.faqs.update((faqs) =>
            faqs.map((faq) => (faq._id === updatedFaq._id ? updatedFaq : faq))
          );
          this.closeModal();
          this.loadFaqs();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error updating FAQ:', error);
          this.isLoading.set(false);
        },
      });
    } else {
      this.dashService.createFAQ(faqData).subscribe({
        next: (newFaq) => {
          this.faqs.update((faqs) => [...faqs, newFaq]);
          this.closeModal();
          this.loadFaqs();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error creating FAQ:', error);
          this.isLoading.set(false);
        },
      });
    }
  }

  deleteFaq(id: string): void {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      this.isLoading.set(true);
      this.dashService.deleteFAQ(id).subscribe({
        next: () => {
          this.faqs.update((faqs) => faqs.filter((faq) => faq._id !== id));
          this.isLoading.set(false);
          this.loadFaqs();
        },
        error: (error) => {
          console.error('Error deleting FAQ:', error);
          this.isLoading.set(false);
        },
      });
    }
  }
}
