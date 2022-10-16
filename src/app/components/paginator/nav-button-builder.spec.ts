import { NavButtonBuilder } from './nav-button-builder';

describe('NavButtonBuilder', () => {

    it('#build when single page', () => {
        const navButtons = new NavButtonBuilder({ pageSize: 3 })
            .pageCount(1)
            .currentPageIdx(0)
            .build();

        expect(navButtons).toEqual([
            { label: 1, currPage: true }
        ]);
    });

    it('#build for first page when two pages', () => {
        const navButtons = new NavButtonBuilder({ pageSize: 3 })
            .pageCount(2)
            .currentPageIdx(0)
            .build();

        expect(navButtons).toEqual([
            { label: '⟨' },
            { label: 1, currPage: true },
            { label: 2, targetPageIdx: 1 },
            { label: '⟩', targetPageIdx: 1 }
        ]);
    });

    it('#build for second page when two pages', () => {
        const navButtons = new NavButtonBuilder({ pageSize: 3 })
            .pageCount(2)
            .currentPageIdx(1)
            .build();

        expect(navButtons).toEqual([
            { label: '⟨', targetPageIdx: 0 },
            { label: 1, targetPageIdx: 0 },
            { label: 2, currPage: true },
            { label: '⟩' }
        ]);
    });

    it('#build for first page when multiple pages', () => {
        const navButtons = new NavButtonBuilder({ pageSize: 3 })
            .pageCount(6)
            .currentPageIdx(0)
            .build();

        expect(navButtons).toEqual([
            { label: '⟪' },
            { label: '⟨' },
            { label: 1, currPage: true },
            { label: 2, targetPageIdx: 1 },
            { label: 3, targetPageIdx: 2 },
            { label: 4, targetPageIdx: 3 },
            { label: 5, targetPageIdx: 4 },
            { label: 6, targetPageIdx: 5 },
            { label: '⟩', targetPageIdx: 1 },
            { label: '⟫', targetPageIdx: 5 }
        ]);
    });

    it('#build for central page when multiple pages', () => {
        const navButtons = new NavButtonBuilder({ pageSize: 3 })
            .pageCount(6)
            .currentPageIdx(3)
            .build();

        expect(navButtons).toEqual([
            { label: '⟪', targetPageIdx: 0 },
            { label: '⟨', targetPageIdx: 2 },
            { label: 1, targetPageIdx: 0 },
            { label: 2, targetPageIdx: 1 },
            { label: 3, targetPageIdx: 2 },
            { label: 4, currPage: true },
            { label: 5, targetPageIdx: 4 },
            { label: 6, targetPageIdx: 5 },
            { label: '⟩', targetPageIdx: 4 },
            { label: '⟫', targetPageIdx: 5 }
        ]);
    });

    it('#build for last page when multiple pages', () => {
        const navButtons = new NavButtonBuilder({ pageSize: 3 })
            .pageCount(6)
            .currentPageIdx(5)
            .build();

        expect(navButtons).toEqual([
            { label: '⟪', targetPageIdx: 0 },
            { label: '⟨', targetPageIdx: 4 },
            { label: 1, targetPageIdx: 0 },
            { label: 2, targetPageIdx: 1 },
            { label: 3, targetPageIdx: 2 },
            { label: 4, targetPageIdx: 3 },
            { label: 5, targetPageIdx: 4 },
            { label: 6, currPage: true },
            { label: '⟩' },
            { label: '⟫' }
        ]);
    });

    function data(rows: number): number[] {
        return [...new Array(rows)].map((v, i) => i);
    }

});