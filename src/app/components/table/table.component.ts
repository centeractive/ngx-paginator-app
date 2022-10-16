import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  baseData: string[] = [];
  pageData: string[] = [];

  ngOnInit(): void {
    this.baseData = [...new Array(96)]
      .map((v, i) => 'row number ' + (i + 1));
  }

}
