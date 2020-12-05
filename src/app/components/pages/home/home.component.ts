import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';
import {NewsService} from 'src/app/services/news/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories = [
    {name: 'business', icon: 'fas fa-business-time'},
    {name: 'entertainment', icon: 'fas fa-tv'},
    {name: 'general', icon: 'fas fa-newspaper'},
    {name: 'health', icon: 'fas fa-heartbeat'},
    {name: 'science', icon: 'fas fa-microscope'},
    {name: 'sports', icon: 'fas fa-futbol'},
    {name: 'technology', icon: 'fas fa-microchip'},
  ];

  public screenWidth: any;
  activeTab: string;
  articles;
  dataLoaded = false;
  currentCategory: string;
  isAuthenticated: boolean;
  page: number = 1;
  noMoreResults = false;

  constructor(
  private newsService: NewsService,
  private authService: AuthService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  getCategory(category: string) {
    this.page = 1;
    this.activeTab = category;
    this.currentCategory = category;
    this.newsService.getNewsByCategory(category, this.page.toString()).subscribe((response) => {
      this.dataLoaded = true;
      this.articles = response.output.articles;
      this.articles.forEach((article) => {
        article.title = article.title.substring(0, article.title.indexOf(' - '));
      });
    });
  }

  onLoadMore() {
    this.page += 1;
    this.newsService.getNewsByCategory(this.currentCategory, this.page.toString()).subscribe((response) => {
      if (this.articles.length <= response.output.totalResults) {
        this.articles = [...this.articles, ...response.output.articles];
      } else {
        this.noMoreResults = true;
      }
    });
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.getCategory('business');
    this.isAuthenticated = this.authService.getIsAuth();
  }
}
