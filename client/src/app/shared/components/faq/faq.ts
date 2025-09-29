import { FaqService } from './../../../core/services/faq/faq-service';
import { Component, ChangeDetectionStrategy, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  readonly _id: number;
  readonly question: string;
  readonly answer: string;
  readonly isOpen?: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FAQ implements OnInit {
  openItemId = signal<number | null>(0);
  constructor(private faqService: FaqService) {}
  readonly faqItems = signal<FAQItem[]>([]);

  ngOnInit() {
    this.faqService.getFAQs().subscribe({
      next: (res: any) => {
        this.faqItems.set(res.faqs);
      },
    });
  }

  faqItemsWithState = computed(() =>
    this.faqItems().map((item: FAQItem) => ({
      ...item,
      isOpen: item._id === this.openItemId(),
    }))
  );

  toggleItem(itemId: number): void {
    const currentOpenId = this.openItemId();
    this.openItemId.set(currentOpenId === itemId ? null : itemId);
  }
}
