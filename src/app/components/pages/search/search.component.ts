import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private newsService: NewsService, private authService: AuthService) { }
  searchForm: FormGroup;
  articles;
  dataLoaded = false;
  isAuthenticated: boolean;
  searchTerm: string;

  onSearch() {
    const searchTerm = this.searchForm.value.search;
    this.searchTerm = searchTerm;
    this.newsService.getNewsBySearchTerm(searchTerm)
      .subscribe(response => {
      this.dataLoaded = true;
        this.articles = response.output.articles;
      })
  }

  addSearchToFavorites() {
    this.newsService.addSearchTermToUser(this.searchTerm); 
    
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuth();

    this.searchForm = new FormGroup({
      search: new FormControl(null, [Validators.required]),
    })

    
  }

}
