import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardDataService } from '../services/dashboard-data.service';
import { environment } from '../../../environments/environment';

// Interface matching the server model
interface Service {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-dash-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dash-services.html',
  styleUrl: './dash-services.scss',
})
export class DashServices implements OnInit {
  services = signal<Service[]>([]);
  isLoading = signal<boolean>(false);
  showModal = signal<boolean>(false);
  currentServiceId = signal<string | null>(null);
  dashService = inject(DashboardDataService);
  serviceForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      isActive: [false],
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.isLoading.set(true);
    this.dashService.getServices().subscribe({
      next: (services: any) => {
        this.services.set(services);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Error loading services:', error);
        this.isLoading.set(false);
      },
    });
  }

  openModal(service?: Service): void {
    if (service) {
      this.currentServiceId.set(service._id!);
      this.serviceForm.patchValue({
        title: service.title,
        description: service.description,
        isActive: service.isActive,
      });
      // We don't set the file input when editing as it's not possible to set a file input value for security reasons
    } else {
      this.resetForm();
    }
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.currentServiceId.set(null);
    this.selectedFile = null;
    this.serviceForm.reset({
      title: '',
      description: '',
      isActive: false,
    });
  }

  isEditing(): boolean {
    return this.currentServiceId() !== null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.serviceForm.invalid) {
      Object.values(this.serviceForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    // Check if file is selected when creating a new service
    if (!this.isEditing() && !this.selectedFile) {
      alert('Please select an icon image');
      return;
    }

    this.isLoading.set(true);
    const formValue = this.serviceForm.value;

    // Create FormData
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('icon', this.selectedFile);
    }
    formData.append('title', formValue.title || '');
    formData.append('description', formValue.description || '');
    formData.append('isActive', formValue.isActive ? 'true' : 'false');

    if (this.isEditing() && this.currentServiceId()) {
      this.dashService.updateService(this.currentServiceId()!, formData).subscribe({
        next: (response) => {
          this.loadServices();
          this.closeModal();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error updating service:', error);
          if (error.error?.message) {
            alert(`Error updating service: ${error.error.message}`);
          }
          this.isLoading.set(false);
        },
      });
    } else {
      this.dashService.createService(formData).subscribe({
        next: (response) => {
          this.loadServices();
          this.closeModal();
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error creating service:', err);
          if (err.error?.message) {
            alert(`Error creating service: ${err.error.message}`);
          }
          this.isLoading.set(false);
        },
      });
    }
  }

  deleteService(id: string): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.isLoading.set(true);
      this.dashService.deleteService(id).subscribe({
        next: () => {
          this.loadServices();
          this.isLoading.set(false);
        },
        error: (error: any) => {
          console.error('Error deleting service:', error);
          this.isLoading.set(false);
        },
      });
    }
  }

  getImgUrl(path: string): string {
    return `${environment.imageUrl}/${path}`;
  }
}
