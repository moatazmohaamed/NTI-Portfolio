import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { AnimatedBannerComponent } from '../../shared/components/animated-banner/animated-banner';
import { DevelopmentProcessComponent } from '../../shared/components/development-process/development-process';
import { TestimonialsComponent } from '../../shared/components/testimonials/testimonials';
import { FAQ } from "../../shared/components/faq/faq";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, ButtonComponent, AnimatedBannerComponent, DevelopmentProcessComponent, TestimonialsComponent, FAQ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
