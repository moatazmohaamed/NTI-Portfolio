import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CompanyLogo {
  logo: string;
}

@Component({
  selector: 'app-animated-banner',
  imports: [CommonModule],
  templateUrl: './animated-banner.html',
  styleUrls: ['./animated-banner.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatedBannerComponent {
  private companies = signal<readonly CompanyLogo[]>([
    { logo: '/Logo-6.png' },
    { logo: '/Logo-7.png' },
    { logo: '/Logo-9.png' },
    { logo: '/logo5.png' },
    { logo: '/logo8.png' },
    { logo: '/logo9.png' },
  ]);

  readonly duplicatedCompanies = computed(() => {
    const companyLogos = this.companies();
    return [...companyLogos, ...companyLogos, ...companyLogos, ...companyLogos, ...companyLogos];
  });
}
