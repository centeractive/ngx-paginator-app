import { NavButton } from './model/nav-button';
import { PaginatorConfig } from './model/paginator-config';

export class NavButtonBuilder {

    private pageCnt: number;
    private idxLastPage: number;
    private currPageIdx: number;

    constructor(private config: PaginatorConfig) {
    }

    pageCount(pageCount: number): NavButtonBuilder {
        this.pageCnt = pageCount;
        this.idxLastPage = Math.max(0, this.pageCnt - 1);
        return this;
    }

    currentPageIdx(currPageIdx: number): NavButtonBuilder {
        this.currPageIdx = currPageIdx;
        return this;
    }

    build(): NavButton[] {
        const navButtons = [...new Array(this.pageCnt)]
            .map((p, i) => this.navButtonPage(i));
        if (this.pageCnt > 1) {
            navButtons.unshift(this.navButtonPrev());
        }
        if (this.pageCnt > 2 && !this.config.hideFirstLastButtons) {
            navButtons.unshift(this.navButtonFirst());
        }
        if (this.pageCnt > 1) {
            navButtons.push(this.navButtonNext());
        }
        if (this.pageCnt > 2 && !this.config.hideFirstLastButtons) {
            navButtons.push(this.navButtonLast());
        }
        return navButtons;
    }

    private navButtonPage(pageIdx: number): NavButton {
        const navButton: NavButton = { label: pageIdx + 1 };
        if (pageIdx == this.currPageIdx) {
            navButton.currPage = true;
        }
        if (pageIdx != this.currPageIdx) {
            navButton.pageIdx = pageIdx;
        }
        return navButton;
    }

    private navButtonFirst(): NavButton {
        const navButton: NavButton = { label: '⟪' };
        if (!!this.currPageIdx) {
            navButton.pageIdx = 0;
        }
        return navButton;
    }

    private navButtonPrev(): NavButton {
        const navButton: NavButton = { label: '⟨' };
        if (!!this.currPageIdx) {
            navButton.pageIdx = this.currPageIdx - 1;
        }
        return navButton;
    }

    private navButtonNext(): NavButton {
        const navButton: NavButton = { label: '⟩' };
        if (this.currPageIdx < this.idxLastPage) {
            navButton.pageIdx = this.currPageIdx + 1;
        }
        return navButton;
    }

    private navButtonLast(): NavButton {
        const navButton: NavButton = { label: '⟫' };
        if (this.currPageIdx < this.idxLastPage) {
            navButton.pageIdx = this.idxLastPage;
        }
        return navButton;
    }

}