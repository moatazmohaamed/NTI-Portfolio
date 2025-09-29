import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardDataService } from '../services/dashboard-data.service';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-dash-categories',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dash-categories.html',
  styleUrl: './dash-categories.scss'
})
export class DashCategories implements OnInit {
  private fb = inject(FormBuilder);
  dashService = inject(DashboardDataService);

  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(false);
  showModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  currentCategoryId = signal<string | null>(null);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  categoryForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    description: ['', [Validators.maxLength(200)]],
    order: [0, [Validators.min(0)]],
    isActive: [true],
  });

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading.set(true);
    this.dashService.getCategories().subscribe({
      next: (categories: any) => {
        const sortedCategories = categories.sort((a: any, b: any) => a.order - b.order);
        this.categories.set(sortedCategories);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.setErrorMessage('Failed to load categories. Please try again.');
        this.isLoading.set(false);
      },
    });
  }

  openModal(category?: Category): void {
    if (category) {
      this.isEditing.set(true);
      this.currentCategoryId.set(category.slug);
      this.categoryForm.patchValue({
        name: category.name,
        description: category.description || '',
        order: category.order,
        isActive: category.isActive,
      });
    } else {
      this.isEditing.set(false);
      this.currentCategoryId.set(null);
      this.resetForm();
    }

    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.categoryForm.reset({
      order: 0,
      isActive: true,
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      Object.values(this.categoryForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    const formValue = this.categoryForm.value;
    const categoryData = {
      name: formValue.name?.trim() || '',
      description: formValue.description?.trim() || '',
      order: formValue.order || 0,
      isActive: formValue.isActive !== false,
    };

    console.log('Category data being sent:', categoryData);

    this.isLoading.set(true);

    if (this.isEditing() && this.currentCategoryId()) {
      this.dashService.updateCategory(this.currentCategoryId()!, categoryData).subscribe({
        next: (response) => {
          console.log('Category updated successfully:', response);
          this.setSuccessMessage('Category updated successfully!');
          this.loadCategories();
          this.closeModal();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error updating category:', error);
          this.setErrorMessage(error.error?.message || 'Failed to update category. Please try again.');
          this.isLoading.set(false);
        },
      });
    } else {
      this.dashService.createCategory(categoryData).subscribe({
        next: (response) => {
          console.log('Category created successfully:', response);
          this.setSuccessMessage('Category created successfully!');
          this.loadCategories();
          this.closeModal();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error creating category:', error);
          this.setErrorMessage(error.error?.message || 'Failed to create category. Please try again.');
          this.isLoading.set(false);
        },
      });
    }
  }

  deleteCategory(slug: string, name: string): void {
    if (confirm(`Are you sure you want to delete the category "${name}"? This action cannot be undone.`)) {
      this.isLoading.set(true);
      this.dashService.deleteCategory(slug).subscribe({
        next: () => {
          this.setSuccessMessage(`Category "${name}" deleted successfully!`);
          this.loadCategories();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          this.setErrorMessage(error.error?.message || 'Failed to delete category. Please try again.');
          this.isLoading.set(false);
        },
      });
    }
  }

  toggleStatus(category: Category): void {
    const updatedData = {
      ...category,
      isActive: !category.isActive,
    };

    this.dashService.updateCategory(category.slug, updatedData).subscribe({
      next: () => {
        this.setSuccessMessage(`Category "${category.name}" ${updatedData.isActive ? 'activated' : 'deactivated'} successfully!`);
        this.loadCategories();
      },
      error: (error) => {
        console.error('Error updating category status:', error);
        this.setErrorMessage('Failed to update category status. Please try again.');
      },
    });
  }



  private setSuccessMessage(message: string): void {
    this.successMessage.set(message);
    this.errorMessage.set('');
    setTimeout(() => this.successMessage.set(''), 5000);
  }

  private setErrorMessage(message: string): void {
    this.errorMessage.set(message);
    this.successMessage.set('');
    setTimeout(() => this.errorMessage.set(''), 5000);
  }

  clearSuccessMessage(): void {
    this.successMessage.set('');
  }

  clearErrorMessage(): void {
    this.errorMessage.set('');
  }
}
