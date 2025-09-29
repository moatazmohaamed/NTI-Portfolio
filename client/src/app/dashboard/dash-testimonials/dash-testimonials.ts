import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardDataService } from '../services/dashboard-data.service';
import { environment } from '../../../environments/environment';
import { Testimonial } from '../../core/interfaces/ITestimonial';

@Component({
  selector: 'app-dash-testimonials',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dash-testimonials.html',
  styleUrl: './dash-testimonials.scss'
})
export class DashTestimonials implements OnInit {
  private fb = inject(FormBuilder);
  dashService = inject(DashboardDataService);

  testimonials = signal<Testimonial[]>([]);
  isLoading = signal<boolean>(false);
  showModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  currentTestimonialId = signal<string | null>(null);
  photoPreview = signal<string | null>(null);
  selectedFile: File | null = null;

  testimonialForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    role: ['', [Validators.maxLength(100)]],
    company: ['', [Validators.maxLength(100)]],
    message: ['', [Validators.required]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    approved: [false],
    order: [0, [Validators.min(0)]],
    isActive: [true],
  });

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.isLoading.set(true);
    this.dashService.getTestimonials().subscribe({
      next: (res: any) => {
        console.log('Testimonials API response:', res);
        // The dashboard service already maps response.data, so res should be the testimonials array
        // But the controller returns nested structure, so handle both cases
        let testimonials = res;
        if (res.data && res.data.testimonials) {
          testimonials = res.data.testimonials;
        } else if (Array.isArray(res)) {
          testimonials = res;
        }
        this.testimonials.set(testimonials);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading testimonials:', error);
        this.isLoading.set(false);
      },
    });
  }

  openModal(testimonial?: Testimonial): void {
    if (testimonial) {
      this.isEditing.set(true);
      this.currentTestimonialId.set(testimonial._id);
      this.testimonialForm.patchValue({
        name: testimonial.name,
        role: testimonial.role || '',
        company: testimonial.company || '',
        message: testimonial.message,
        rating: testimonial.rating,
        approved: testimonial.approved,
        order: testimonial.order,
        isActive: testimonial.isActive,
      });

      if (testimonial.photo) {
        this.photoPreview.set(this.getImgUrl(testimonial.photo));
      }
    } else {
      this.isEditing.set(false);
      this.currentTestimonialId.set(null);
      this.resetForm();
    }

    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.testimonialForm.reset({
      rating: 5,
      approved: false,
      order: 0,
      isActive: true,
    });
    this.photoPreview.set(null);
    this.selectedFile = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.match(/image\/*/) || file.size > 5 * 1024 * 1024) {
        alert('Please upload an image file (max 5MB)');
        return;
      }
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview.set(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.testimonialForm.invalid) {
      Object.values(this.testimonialForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    const formData = new FormData();
    const formValue = this.testimonialForm.value;

    // Append form fields
    formData.append('name', formValue.name || '');
    formData.append('role', formValue.role || '');
    formData.append('company', formValue.company || '');
    formData.append('message', formValue.message || '');
    formData.append('rating', formValue.rating?.toString() || '5');
    formData.append('approved', formValue.approved ? 'true' : 'false');
    formData.append('order', formValue.order?.toString() || '0');
    formData.append('isActive', formValue.isActive ? 'true' : 'false');

    // Append photo if selected
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    // Log form data for debugging
    console.log('Form data being sent:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    this.isLoading.set(true);

    if (this.isEditing() && this.currentTestimonialId()) {
      this.dashService.updateTestimonial(this.currentTestimonialId()!, formData).subscribe({
        next: (response) => {
          console.log('Testimonial updated successfully:', response);
          this.loadTestimonials();
          this.closeModal();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error updating testimonial:', error);
          if (error.error?.message) {
            alert(`Error updating testimonial: ${error.error.message}`);
          }
          this.isLoading.set(false);
        },
      });
    } else {
      this.dashService.createTestimonial(formData).subscribe({
        next: (response) => {
          console.log('Testimonial created successfully:', response);
          this.loadTestimonials();
          this.closeModal();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error creating testimonial:', error);
          if (error.error?.message) {
            alert(`Error creating testimonial: ${error.error.message}`);
          }
          this.isLoading.set(false);
        },
      });
    }
  }

  deleteTestimonial(id: string): void {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.isLoading.set(true);
      this.dashService.deleteTestimonial(id).subscribe({
        next: () => {
          this.loadTestimonials();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error deleting testimonial:', error);
          this.isLoading.set(false);
        },
      });
    }
  }

  toggleApproval(testimonial: Testimonial): void {
    const formData = new FormData();
    formData.append('approved', (!testimonial.approved).toString());

    this.dashService.updateTestimonial(testimonial._id, formData).subscribe({
      next: () => {
        this.loadTestimonials();
      },
      error: (error) => {
        console.error('Error updating approval status:', error);
      },
    });
  }

  toggleStatus(testimonial: Testimonial): void {
    const formData = new FormData();
    formData.append('isActive', (!testimonial.isActive).toString());

    this.dashService.updateTestimonial(testimonial._id, formData).subscribe({
      next: () => {
        this.loadTestimonials();
      },
      error: (error) => {
        console.error('Error updating status:', error);
      },
    });
  }

  getImgUrl(img: string): string {
    return `${environment.imageUrl}/${img}`;
  }

  getRatingStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'filled' : 'empty');
    }
    return stars;
  }
}
