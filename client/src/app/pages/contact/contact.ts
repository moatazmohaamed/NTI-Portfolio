import { Component } from '@angular/core';
import { ContactService } from '../../core/services/contact/contact-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  formSubmitted = false;
  formError = false;

  constructor(private contactService: ContactService) {}
  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
  });

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.sendContactForm(this.contactForm.value);
      this.contactForm.reset();
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach((key) => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
        control?.markAsDirty();
      });
    }
  }

  // Helper methods for validation
  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(fieldName: string): string {
    const control = this.contactForm.get(fieldName);

    if (!control) return '';
    if (control.errors?.['required']) return 'This field is required';

    if (fieldName === 'name') {
      if (control.errors?.['minlength']) return 'Name must be at least 2 characters';
      if (control.errors?.['maxlength']) return 'Name cannot exceed 50 characters';
    }

    if (fieldName === 'email') {
      if (control.errors?.['email'] || control.errors?.['pattern'])
        return 'Please enter a valid email address';
    }

    if (fieldName === 'message') {
      if (control.errors?.['minlength']) return 'Message must be at least 10 characters';
      if (control.errors?.['maxlength']) return 'Message cannot exceed 500 characters';
    }

    return '';
  }

  sendContactForm(formData: FormData) {
    this.contactService.sendContactForm(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.formSubmitted = true;
        this.formError = false;
        this.contactForm.reset();
      },
      error: (err: any) => {
        console.log(err);
        this.formSubmitted = true;
        this.formError = true;
      },
    });
  }

  resetAlerts() {
    this.formSubmitted = false;
    this.formError = false;
  }
}
