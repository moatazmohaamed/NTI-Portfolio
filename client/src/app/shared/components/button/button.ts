import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClass()"
      [type]="type()"
      (click)="onClick.emit($event)"
      [disabled]="disabled()"
    >
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'outline'>('primary');
  size = input<'small' | 'medium' | 'large'>('medium');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);

  onClick = output<Event>();

  buttonClass = () => {
    const baseClasses = 'border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out inline-flex items-center justify-center no-underline font-inherit disabled:opacity-60 disabled:cursor-not-allowed';

    const variantClasses = {
      primary: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5 hover:shadow-indigo-500/30',
      secondary: 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-blue-500/30',
      outline: 'bg-transparent text-indigo-500 border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white hover:-translate-y-0.5'
    };

    const sizeClasses = {
      small: 'px-4 py-2 text-sm',
      medium: 'px-6 py-3 text-base',
      large: 'px-8 py-4 text-lg'
    };

    const fullWidthClass = this.fullWidth() ? 'w-full' : '';

    return [
      baseClasses,
      variantClasses[this.variant()],
      sizeClasses[this.size()],
      fullWidthClass
    ].filter(Boolean).join(' ');
  };
}
