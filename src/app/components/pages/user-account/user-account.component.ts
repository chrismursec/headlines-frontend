import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SavedItem } from 'src/app/models/savedItem.model';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  savedSearchItems: string[] = [];
  currentDataSet;
  dataLoaded = false;
  showFavouritesList = true;
  isSavedItem = false;
  title: string;
  public screenWidth: any;

  private savedItemSub: Subscription;
  savedItems = [];



  constructor(private newsService: NewsService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  getSavedSearchData(searchTerm: string) {
    this.title = searchTerm.toLocaleUpperCase();
    this.newsService.getNewsBySearchTerm(searchTerm).subscribe(data => {
    this.isSavedItem = false;
    this.dataLoaded = true
    this.currentDataSet = data.output.articles;
    })
  }

  getSavedItemData() {
    this.title = 'SAVED';
    this.newsService.getSavedItems();
    this.savedItemSub = this.newsService.getSavedItemUpdateListener()
      .subscribe((data) => {
        this.savedItems = data.savedItems;

        this.isSavedItem = true;
        this.dataLoaded = true;
        this.currentDataSet = this.savedItems;
      })

  }

  showFavourites() {
    this.showFavouritesList = !this.showFavouritesList;
  }

  onRemoveSavedItem(id) {

    this.newsService.removeSavedItem(id).subscribe(() => {
    })
    this.newsService.getSavedItems();
  }


  ngOnInit(): void {
    this.getSavedItemData();
    this.screenWidth = window.innerWidth;
    this.newsService.getUsersSavedSearches().subscribe(data => {
      this.savedSearchItems = data.sort();
    });

  }

}
