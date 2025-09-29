import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Projects as ProjectService } from '../../core/services/projects/projects';
import {
  Project,
  Category,
  ProjectsResponse,
  CategoriesResponse,
} from '../../core/interfaces/IProject';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {
  private projectsService = inject(ProjectService);

  projects = signal<Project[]>([]);
  categories = signal<Category[]>([]);
  filteredProjects = signal<Project[]>([]);
  selectedCategory = signal<string>('all');
  loading = signal<boolean>(true);
  error = signal<string>('');

  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(5);
  totalItems = signal<number>(0);
  totalPages = signal<any>(1);

  pageNumbers = signal<number[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page: number = 1): void {
    this.loading.set(true);
    this.currentPage.set(page);

    this.projectsService.getProjects(page, this.itemsPerPage()).subscribe({
      next: (response: ProjectsResponse) => {
        this.projects.set(response.data);
        this.filteredProjects.set(response.data);
        this.totalItems.set(response.results);
        const totalPagesCount = Math.ceil(response.results / this.itemsPerPage());
        this.totalPages.set(totalPagesCount);

        const pages = [];
        for (let i = 1; i <= totalPagesCount; i++) {
          pages.push(i);
        }
        this.pageNumbers.set(pages);

        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load projects');
        this.loading.set(false);
        console.error('Error loading projects:', error);
      },
    });

    this.projectsService.getCategories().subscribe({
      next: (response: CategoriesResponse) => {
        this.categories.set(response.data.filter((cat) => cat.isActive));
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });
  }

  filterByCategory(categorySlug: string): void {
    this.selectedCategory.set(categorySlug);

    if (this.currentPage() !== 1) {
      this.loadData(1);
      return;
    }

    if (categorySlug === 'all') {
      this.filteredProjects.set(this.projects());
    } else {
      const filtered = this.projects().filter((project) => project.category.slug === categorySlug);
      this.filteredProjects.set(filtered);
    }
  }

  getProjectImageUrl(image: string): string {
    return `http://localhost:5000/uploads/${image}`;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.loadData(page);
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.goToPage(this.currentPage() + 1);
    }
  }
}
