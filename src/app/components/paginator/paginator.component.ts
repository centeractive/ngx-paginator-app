import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NavButton } from './model/nav-button';
import { PageChangeEvent } from './model/page-change-event';
import { PaginatorConfig } from './model/paginator-config';
import { NavButtonBuilder } from './nav-button-builder';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  @Input() config: PaginatorConfig;
  @Input() data: any[];

  @Output() onPageChange = new EventEmitter<PageChangeEvent>();

  hidden = true;
  currPageIdx: number = -1;
  navButtons: NavButton[] = [];

  private pageCount: number;

  ngOnChanges(changes: SimpleChanges): void {
    this.currPageIdx = -1;
    this.pageCount = this.computePageCount();
    this.hidden = this.pageCount < 2 && !!this.config.hideNonNavigatable;
    if (!this.hidden) {
      this.navigateTo(0);
    }
  }

  private computePageCount(): number {
    if (!this.data || !this.data.length) {
      return 0;
    } else {
      return Math.ceil(this.data.length / this.config.pageSize);
    }
  }

  navigateTo(pageIdx: number): void {
    this.currPageIdx = pageIdx;
    this.emitPageChangeEvent();
    this.createNavButtons();
  }

  private emitPageChangeEvent(): void {
    const start = this.currPageIdx * this.config.pageSize;
    const end = Math.min(start + this.config.pageSize, this.data.length);
    this.onPageChange.emit({
      currPageIdx: this.currPageIdx,
      pageData: this.data.slice(start, end)
    });
  }

  private createNavButtons(): void {
    this.navButtons = new NavButtonBuilder(this.config)
      .pageCount(this.pageCount)
      .currentPageIdx(this.currPageIdx)
      .build();
  }

}

