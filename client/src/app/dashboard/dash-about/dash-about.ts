import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DashboardDataService, About, Statistic, CompanyValue, Technology } from '../services/dashboard-data.service';

@Component({
  selector: 'app-dash-about',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dash-about.html',
  styleUrl: './dash-about.scss'
})
export class DashAbout implements OnInit {
  private fb = inject(FormBuilder);
  dashService = inject(DashboardDataService);

  about = signal<About | null>(null);
  isLoading = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  successMessage = signal<string>('');
  errorMessage = signal<string>('');
  activeTab = signal<string>('company');

  aboutForm: FormGroup = this.fb.group({
    companyInfo: this.fb.group({
      foundedYear: ['', [Validators.required]],
      mission: ['', [Validators.required]],
      vision: ['', [Validators.required]],
      story: this.fb.group({
        part1: ['', [Validators.required]],
        part2: ['', [Validators.required]],
        part3: ['', [Validators.required]],
      })
    }),
    statistics: this.fb.array([]),
    coreValues: this.fb.array([]),
    technologies: this.fb.array([])
  });

  get statisticsArray() {
    return this.aboutForm.get('statistics') as FormArray;
  }

  get coreValuesArray() {
    return this.aboutForm.get('coreValues') as FormArray;
  }

  get technologiesArray() {
    return this.aboutForm.get('technologies') as FormArray;
  }

  ngOnInit(): void {
    // Initialize with at least one item in each array if empty
    if (this.statisticsArray.length === 0) {
      this.addStatistic();
    }
    if (this.coreValuesArray.length === 0) {
      this.addCoreValue();
    }
    if (this.technologiesArray.length === 0) {
      this.addTechnology();
    }

    this.loadAbout();
  }

  loadAbout(): void {
    this.isLoading.set(true);
    this.dashService.getAbout().subscribe({
      next: (about: About) => {
        this.about.set(about);
        this.populateForm(about);
        this.isEditing.set(true);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading about:', error);
        if (error.status === 404) {
          this.isEditing.set(false);
          this.initializeEmptyForm();
        } else {
          this.setErrorMessage('Failed to load about information. Please try again.');
        }
        this.isLoading.set(false);
      },
    });
  }

  populateForm(about: About): void {
    this.clearFormArrays();

    this.aboutForm.patchValue({
      companyInfo: about.companyInfo
    });

    // Populate statistics
    about.statistics.forEach(stat => {
      this.statisticsArray.push(this.createStatisticGroup(stat));
    });

    // Populate core values
    about.coreValues.forEach(value => {
      this.coreValuesArray.push(this.createCoreValueGroup(value));
    });

    // Populate technologies
    about.technologies.forEach(tech => {
      this.technologiesArray.push(this.createTechnologyGroup(tech));
    });
  }

  initializeEmptyForm(): void {
    console.log('Initializing empty form');
    this.clearFormArrays();
    this.addStatistic();
    this.addCoreValue();
    this.addTechnology();
    console.log('Empty form initialized with arrays:', {
      statistics: this.statisticsArray.length,
      coreValues: this.coreValuesArray.length,
      technologies: this.technologiesArray.length
    });
  }

  clearFormArrays(): void {
    while (this.statisticsArray.length) {
      this.statisticsArray.removeAt(0);
    }
    while (this.coreValuesArray.length) {
      this.coreValuesArray.removeAt(0);
    }
    while (this.technologiesArray.length) {
      this.technologiesArray.removeAt(0);
    }
  }

  createStatisticGroup(stat?: Statistic): FormGroup {
    return this.fb.group({
      value: [stat?.value || '', [Validators.required, Validators.minLength(1)]],
      label: [stat?.label || '', [Validators.required, Validators.minLength(1)]]
    });
  }

  createCoreValueGroup(value?: CompanyValue): FormGroup {
    return this.fb.group({
      title: [value?.title || '', [Validators.required, Validators.minLength(1)]],
      description: [value?.description || '', [Validators.required, Validators.minLength(1)]],
      icon: [value?.icon || '', [Validators.required, Validators.minLength(1)]]
    });
  }

  createTechnologyGroup(tech?: Technology): FormGroup {
    return this.fb.group({
      name: [tech?.name || '', [Validators.required, Validators.minLength(1)]]
    });
  }

  addStatistic(): void {
    this.statisticsArray.push(this.createStatisticGroup());
  }

  removeStatistic(index: number): void {
    this.statisticsArray.removeAt(index);
  }

  addCoreValue(): void {
    this.coreValuesArray.push(this.createCoreValueGroup());
  }

  removeCoreValue(index: number): void {
    this.coreValuesArray.removeAt(index);
  }

  addTechnology(): void {
    this.technologiesArray.push(this.createTechnologyGroup());
  }

  removeTechnology(index: number): void {
    this.technologiesArray.removeAt(index);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  onSubmit(): void {
    console.log('Form submission started');
    console.log('Form valid:', this.aboutForm.valid);
    console.log('Form errors:', this.aboutForm.errors);

    if (this.aboutForm.invalid) {
      console.log('Form is invalid, marking all fields as touched');
      this.markFormGroupTouched(this.aboutForm);
      return;
    }

    const formValue = this.aboutForm.value;
    console.log('Raw form value:', formValue);

    // Filter out empty entries and ensure we have at least one item in each array
    const filteredStatistics = formValue.statistics?.filter((stat: any) => stat.value && stat.label) || [];
    const filteredCoreValues = formValue.coreValues?.filter((value: any) => value.title && value.description && value.icon) || [];
    const filteredTechnologies = formValue.technologies?.filter((tech: any) => tech.name) || [];

    // Validate that we have at least one item in each required array
    if (filteredStatistics.length === 0) {
      this.setErrorMessage('Please add at least one statistic.');
      this.isLoading.set(false);
      return;
    }
    if (filteredCoreValues.length === 0) {
      this.setErrorMessage('Please add at least one core value.');
      this.isLoading.set(false);
      return;
    }
    if (filteredTechnologies.length === 0) {
      this.setErrorMessage('Please add at least one technology.');
      this.isLoading.set(false);
      return;
    }

    const aboutData: About = {
      companyInfo: formValue.companyInfo,
      statistics: filteredStatistics,
      coreValues: filteredCoreValues,
      technologies: filteredTechnologies
    };

    console.log('Filtered about data being sent:', aboutData);
    console.log('Is editing:', this.isEditing());
    console.log('About ID:', this.about()?._id);

    this.isLoading.set(true);

    if (this.isEditing() && this.about()?._id) {
      this.dashService.updateAbout(this.about()!._id!, aboutData).subscribe({
        next: (response) => {
          console.log('About updated successfully:', response);
          this.about.set(response);
          this.setSuccessMessage('About information updated successfully!');
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error updating about:', error);
          this.setErrorMessage(error.error?.message || 'Failed to update about information. Please try again.');
          this.isLoading.set(false);
        },
      });
    } else {
      this.dashService.createAbout(aboutData).subscribe({
        next: (response) => {
          console.log('About created successfully:', response);
          this.about.set(response);
          this.isEditing.set(true);
          this.setSuccessMessage('About information created successfully!');
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error creating about:', error);
          this.setErrorMessage(error.error?.message || 'Failed to create about information. Please try again.');
          this.isLoading.set(false);
        },
      });
    }
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

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  private validateFormArrays(): string | null {
    const statistics = this.statisticsArray.value.filter((stat: any) => stat.value && stat.label);
    const coreValues = this.coreValuesArray.value.filter((value: any) => value.title && value.description && value.icon);
    const technologies = this.technologiesArray.value.filter((tech: any) => tech.name);

    if (statistics.length === 0) {
      return 'Please add at least one statistic with both value and label.';
    }
    if (coreValues.length === 0) {
      return 'Please add at least one core value with title, description, and icon.';
    }
    if (technologies.length === 0) {
      return 'Please add at least one technology.';
    }
    return null;
  }
}
