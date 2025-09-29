import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Services } from '../../core/services/services/services';
import { Data, IServices } from '../../core/interfaces/IServices';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterModule],
  templateUrl: './services.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent implements OnInit {
  currentSlide = signal(0);
  services = signal<Data[]>([]);

  constructor(private servicesService: Services) {
    // Don't call updateActiveService here as services array is empty initially
  }

  ngOnInit() {
    this.servicesService.getServices().subscribe({
      next: (res) => {
        this.services.set(res.data);
        this.updateActiveService(); // Call this after services are loaded
        console.log(res.data);
      },
    });
  }

  nextSlide() {
    const maxSlide = this.services().length - 1;
    if (this.currentSlide() < maxSlide) {
      this.currentSlide.update((current) => current + 1);
      this.updateActiveService();
    }
  }

  previousSlide() {
    if (this.currentSlide() > 0) {
      this.currentSlide.update((current) => current - 1);
      this.updateActiveService();
    }
  }

  prevSlide() {
    this.previousSlide();
  }

  goToSlide(index: number) {
    // Add safety check to ensure index is within bounds
    if (index >= 0 && index < this.services().length) {
      this.currentSlide.set(index);
      this.updateActiveService();
    }
  }

  private updateActiveService() {
    this.services.update((services) =>
      services.map((service, index) => ({
        ...service,
        isActive: index === this.currentSlide(),
      }))
    );
  }

  getProjectImageUrl(image: string): string {
    return `${environment.imageUrl}${image}`;
  }
}
