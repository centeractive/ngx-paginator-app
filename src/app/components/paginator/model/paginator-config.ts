export interface PaginatorConfig {

    /** maximum items per page */
    pageSize: number;

    /** hide the paginator if the data is absent or if it fits on a single page */
    hideNonNavigatable?: boolean;

    /** 
     * indicates it the 'first' and 'last' buttons shall be generally hidden
     * (these buttons will also be hidden when the data is split into less than 3 pages)  
     */
    hideFirstLastButtons?: boolean;
}