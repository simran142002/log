import { Injectable } from '@angular/core';
// import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogQueryService {
  private baseUrl = 'http://localhost:3000/query';
  constructor(private http: HttpClient) { }

  searchLogs(query: any): Observable<any> {
    const params = new HttpParams({ fromObject: query });
    return this.http.get(`${this.baseUrl}/search`, { params });
  }

}
