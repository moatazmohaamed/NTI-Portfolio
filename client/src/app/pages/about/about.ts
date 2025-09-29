import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompanyInfo, CompanyValue, Statistic, Technology } from '../../core/interfaces/IAbout';
import { AboutService } from '../../core/services/about/about-service';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  about: About | null = null;
  companyInfo: CompanyInfo | null = null;
  statistics: Statistic[] = [];
  coreValues: CompanyValue[] = [];
  technologies: Technology[] = [];
  constructor(private aboutService: AboutService) {}
  ngOnInit() {
    this.aboutService.getAbout().subscribe({
      next: (res: any) => {
        this.companyInfo = res.about.companyInfo;
        this.statistics = res.about.statistics;
        this.coreValues = res.about.coreValues;
        this.technologies = res.about.technologies;
      },
      error: (err: any) => console.log(err),
    });
  }
}
