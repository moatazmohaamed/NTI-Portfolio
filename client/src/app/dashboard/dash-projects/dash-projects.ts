import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DashboardDataService } from '../services/dashboard-data.service';
import { environment } from '../../../environments/environment';

interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  summary?: string;
  image: string;
  link?: string;
  technologies: string[];
  category: any;
  client?: {
    name?: string;
    industry?: string;
  };
  featured: boolean;
  completionDate?: Date;
  status: 'Completed' | 'In Progress' | 'Planned';
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

@Component({
  selector: 'app-dash-projects',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dash-projects.html',
  styleUrl: './dash-projects.scss',
})
export class DashProjects implements OnInit {
  private fb = inject(FormBuilder);
  dashService = inject(DashboardDataService);
  projects = signal<Project[]>([]);
  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(false);
  showModal = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  currentProjectId = signal<string | null>(null);

  projectForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.required]],
    summary: [''],
    image: [''],
    category: ['', [Validators.required]],
    technologies: this.fb.array([this.fb.control('', Validators.required)]),
    link: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)]],
    client: this.fb.group({
      name: [''],
      industry: [''],
    }),
    status: ['Completed', [Validators.required]],
    featured: [false],
    completionDate: [''],
  });

  get technologiesArray() {
    return this.projectForm.get('technologies') as FormArray;
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadCategories();
  }

  loadProjects(): void {
    this.isLoading.set(true);
    this.dashService.getProjects().subscribe({
      next: (res: any) => {
        this.projects.set(res);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.isLoading.set(false);
      },
    });
  }

  loadCategories(): void {
    this.dashService.getCategories().subscribe({
      next: (res: any) => {
        this.categories.set(res);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  openModal(project?: Project): void {
    if (project) {
      this.isEditing.set(true);
      this.currentProjectId.set(project._id);
      while (this.technologiesArray.length) {
        this.technologiesArray.removeAt(0);
      }

      project.technologies.forEach((tech) => {
        this.addTechnology(tech);
      });

      this.projectForm.patchValue({
        title: project.title,
        description: project.description,
        summary: project.summary || '',
        category: project.category._id,
        link: project.link || '',
        client: {
          name: project.client?.name || '',
          industry: project.client?.industry || '',
        },
        status: project.status,
        featured: project.featured,
        completionDate: project.completionDate
          ? new Date(project.completionDate).toISOString().split('T')[0]
          : '',
      });
    } else {
      this.isEditing.set(false);
      this.currentProjectId.set(null);
      this.resetForm();
    }

    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm(): void {
    this.projectForm.reset({
      status: 'Completed',
      featured: false,
    });

    while (this.technologiesArray.length) {
      this.technologiesArray.removeAt(0);
    }
    this.addTechnology();
  }

  addTechnology(value: string = ''): void {
    this.technologiesArray.push(this.fb.control(value, Validators.required));
  }

  removeTechnology(index: number): void {
    this.technologiesArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      Object.values(this.projectForm.controls).forEach((control) => control.markAsTouched());
      return;
    }

    const formData = new FormData();
    const formValue = this.projectForm.value;

    const selectedCategory = this.categories().find((cat) => cat._id === formValue.category);

    formData.append('title', formValue.title || '');
    formData.append('description', formValue.description || '');
    formData.append('summary', formValue.summary || '');
    formData.append('status', formValue.status || 'Completed');
    formData.append('featured', formValue.featured ? 'true' : 'false');
    formData.append('link', formValue.link || '');

    if (formValue.completionDate) {
      formData.append('completionDate', formValue.completionDate);
    }

    if (selectedCategory) {
      if (this.isEditing()) {
        formData.append('category', selectedCategory.slug);
      } else {
        formData.append('category', selectedCategory.name);
      }
    }

    const technologies = formValue.technologies ? formValue.technologies.filter(Boolean) : [];
    formData.append('technologies', JSON.stringify(technologies));

    const clientData = {
      name: formValue.client?.name || '',
      industry: formValue.client?.industry || '',
    };
    formData.append('client', JSON.stringify(clientData));

    const imageInput = document.getElementById('image') as HTMLInputElement;
    if (imageInput?.files?.length) {
      const file = imageInput.files[0];
      formData.append('image', file);
    }
    this.isLoading.set(true);

    if (this.isEditing() && this.currentProjectId()) {
      this.dashService.updateProject(this.currentProjectId()!, formData).subscribe({
        next: (response) => {
          console.log('Project updated successfully:', response);
          this.loadProjects();
          this.closeModal();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error updating project:', error);
          if (error.error?.message) {
            alert(`Error updating project: ${error.error.message}`);
          }
          this.isLoading.set(false);
        },
      });
    } else {
      this.dashService.createProject(formData).subscribe({
        next: (response) => {
          console.log('Project created successfully:', response);
          this.loadProjects();
          this.closeModal();
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error creating project:', err);
          if (err.error?.message) {
            alert(`Error creating project: ${err.error.message}`);
          }
          this.isLoading.set(false);
        },
      });
    }
  }

  deleteProject(id: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.isLoading.set(true);
      this.dashService.deleteProject(id).subscribe({
        next: () => {
          this.loadProjects();
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error deleting project:', error);
          this.isLoading.set(false);
        },
      });
    }
  }

  getImgUrl(img: string): string {
    return `${environment.imageUrl}/${img}`;
  }
}
