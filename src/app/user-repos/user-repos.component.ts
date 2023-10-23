// user-repos.component.ts
import { Component } from '@angular/core';
import { GithubApiService } from '../github-api.service';

interface Repository {
  name: string;
  languages: string[];
}

interface LanguageCount {
  name: string;
  value: number;
}

@Component({
  selector: 'app-user-repos',
  templateUrl: './user-repos.component.html',
  styleUrls: ['./user-repos.component.css']
})
export class UserReposComponent {
  username: string = '';
  repositories: Repository[] = [];
  chartData: LanguageCount[] = [];

  constructor(private githubService: GithubApiService) { }

  getUserRepos() {
    this.githubService.getUserRepositories(this.username).subscribe(
      (repos: Repository[]) => {
        console.log(this.username)
        this.repositories = repos;

        // Process data for pie chart
        const languagesCount: { [key: string]: number } = {};
        repos.forEach(repo => {
          repo.languages.forEach(lang => {
            languagesCount[lang] = (languagesCount[lang] || 0) + 1;
          });
        });

        this.chartData = Object.keys(languagesCount).map(lang => ({
          name: lang,
          value: languagesCount[lang]
        }));
      },
      (error: any) => {
        console.error('Error fetching user repositories:', error);
      }
    );
  }
}
