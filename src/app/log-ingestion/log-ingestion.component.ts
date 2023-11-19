import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-log-ingestion',
  templateUrl: './log-ingestion.component.html',
  styleUrls: ['./log-ingestion.component.css']
})
export class LogIngestionComponent {
  responseMessage: string = "";
  resReceived: boolean = false;
  logData: any = {
    "level": "error",
    "message": "trial",
    "resourceId": "server-1234",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
      "parentResourceId": "server-0987"
    }
  };

  constructor(private http: HttpClient) {}

  ingestLog() {
    this.http.post('http://localhost:3000/ingest', this.logData)
      .subscribe({
        next: (res) => {
          this.responseMessage = "Log ingested successfully.";
          this.resReceived = true;
          console.log(res);

        },
        error: (error) => {
          this.responseMessage = error;
          console.log(error);
        }
      });
  }
}
