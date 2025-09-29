import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProcessStep {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly position: 'top' | 'bottom';
}

@Component({
  selector: 'app-development-process',
  imports: [CommonModule],
  templateUrl: './development-process.html',
  styleUrls: ['./development-process.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevelopmentProcessComponent {
  private readonly processSteps = signal<readonly ProcessStep[]>([
    {
      id: 1,
      title: 'Assemble the right team',
      description: 'We handle all aspects of vetting and choosing the right team that you don\'t have the time, expertise, or desire to do.',
      position: 'top'
    },
    {
      id: 2,
      title: 'Sprint planning',
      description: 'Sprint roadmap is a collective planning effort. Team members collaborate to clarify items and ensure shared understanding.',
      position: 'bottom'
    },
    {
      id: 3,
      title: 'Tech architecture',
      description: 'We break monolithic apps into microservices. Decoupling the code allows teams to move faster and more independently.',
      position: 'top'
    },
    {
      id: 4,
      title: 'Standups & weekly demos',
      description: 'Standups, weekly demos, and weekly reviews make sure everyone is on the same page and can raise their concerns.',
      position: 'bottom'
    },
    {
      id: 5,
      title: 'Code reviews',
      description: 'Code reviews before release help detect issues like memory leaks, file leaks, performance signs, and general bad smells.',
      position: 'top'
    },
    {
      id: 6,
      title: 'Iterative delivery',
      description: 'We divide the implementation process into several checkpoints rather than a single deadline.',
      position: 'bottom'
    }
  ]);

  readonly topSteps = computed(() =>
    this.processSteps().filter(step => step.position === 'top')
  );

  readonly bottomSteps = computed(() =>
    this.processSteps().filter(step => step.position === 'bottom')
  );
}
