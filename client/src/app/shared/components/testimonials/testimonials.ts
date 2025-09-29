import { Component, ChangeDetectionStrategy, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import {
  TestimonialsServices,
  Testimonial as ApiTestimonial,
} from '../../../core/services/testimonials/testimonials-services';
import { environment } from '../../../../environments/environment';

register();

// Local interface for component use
interface LocalTestimonial {
  readonly id: string | number;
  readonly text: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
  readonly photo: string;
  readonly rating: number;
  readonly isActive?: boolean;
}

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent implements OnInit {
  private readonly currentTestimonialIndex = signal(0);
  private readonly testimonials = signal<readonly LocalTestimonial[]>([]);
  private readonly loading = signal<boolean>(false);
  private readonly error = signal<string | null>(null);

  readonly currentTestimonial = computed(() => {
    const testimonialsList = this.testimonials();
    if (testimonialsList.length === 0) return null;

    const index = this.currentTestimonialIndex();
    return testimonialsList[index];
  });

  readonly testimonialsWithActiveState = computed(() => {
    const index = this.currentTestimonialIndex();
    return this.testimonials().map((testimonial, i) => ({
      ...testimonial,
      isActive: i === index,
    }));
  });

  readonly isLoading = computed(() => this.loading());
  readonly hasError = computed(() => this.error() !== null);
  readonly errorMessage = computed(() => this.error());

  constructor(private testimonialsService: TestimonialsServices) {}

  ngOnInit(): void {
    this.fetchTestimonials();
  }

  fetchTestimonials(): void {
    this.loading.set(true);
    this.error.set(null);

    this.testimonialsService.getTestimonials().subscribe({
      next: (res: any) => {
        console.log(res);
        if (res && res.data && res.data.testimonials && res.data.testimonials.length > 0) {
          const mappedTestimonials = res.data.testimonials.map((t: any) => ({
            id: t.id,
            text: t.message,
            name: t.name,
            role: t.role, // Include role from API response
            company: t.company,
            photo: t.photo,
            rating: t.rating,
          }));
          this.testimonials.set(mappedTestimonials);
          const activeIndex = res.data.testimonials.findIndex((t: any) => t.isActive);
          this.currentTestimonialIndex.set(activeIndex >= 0 ? activeIndex : 0);
        } else {
          this.testimonials.set([]);
        }
        this.loading.set(false);
      },
      error: (err: any) => {
        console.log(err);
        this.error.set(err.message || 'Failed to load testimonials');
        this.loading.set(false);
      },
    });
  }

  nextTestimonial(): void {
    const currentIndex = this.currentTestimonialIndex();
    const totalTestimonials = this.testimonials().length;
    if (totalTestimonials === 0) return;

    const nextIndex = (currentIndex + 1) % totalTestimonials;
    this.currentTestimonialIndex.set(nextIndex);
  }

  previousTestimonial(): void {
    const currentIndex = this.currentTestimonialIndex();
    const totalTestimonials = this.testimonials().length;
    if (totalTestimonials === 0) return;

    const prevIndex = currentIndex === 0 ? totalTestimonials - 1 : currentIndex - 1;
    this.currentTestimonialIndex.set(prevIndex);
  }

  selectTestimonial(index: number): void {
    this.currentTestimonialIndex.set(index);
  }

  generateStars(rating: number): string[] {
    return Array.from({ length: rating }, (_, i) => '★');
  }

  getCustomerInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  }

  getImgUrl(path: string) {
    return `${environment.imageUrl}/${path}`;
  }

  retryFetch(): void {
    this.fetchTestimonials();
  }
}
