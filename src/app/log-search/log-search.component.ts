import { Component } from '@angular/core';
import { LogQueryService } from '../log-query.service';

@Component({
  selector: 'app-log-search',
  templateUrl: './log-search.component.html',
  styleUrls: ['./log-search.component.css']
})
export class LogSearchComponent {
  query: any = {};
  searchResults: any[]=[];

  constructor(private logQueryService: LogQueryService) {}

  searchLogs(){
    this.query = Object.entries(this.query)
    .filter(([key, value]) => value !== undefined && value !== null && value !== '')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    this.logQueryService.searchLogs(this.query).subscribe(results => {
      this.searchResults = results;
    });
  }
}
