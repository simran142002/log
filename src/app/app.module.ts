import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserReposComponent } from './user-repos/user-repos.component';
import { GithubApiService } from './github-api.service';
import { LogIngestionComponent } from './log-ingestion/log-ingestion.component';
import { LogSearchComponent } from './log-search/log-search.component';
@NgModule({
  declarations: [
    AppComponent,
    UserReposComponent,
    LogIngestionComponent,
    LogSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [GithubApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
