import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SavedItem } from 'src/app/models/savedItem.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  private savedItems: SavedItem[] = [];
  private savedItemsUpdated = new Subject<{savedItems: SavedItem[]}>();
  // private url = 'http://localhost:3000/api/news/';
  private url = 'https://headlines-backend.herokuapp.com/api/news/';

  constructor(private http: HttpClient) { }


  getNewsByCategory(category: string, page: string = '1') {
    return this.http.get<{output: {articles, totalResults}}>(this.url + 'homepagetabs', {params: {category: category, page: page}})
  }

  getNewsBySearchTerm(searchTerm: string) {
    return this.http.post<{output: {articles}}>(this.url + 'search', {searchTerm: searchTerm});
  }

  addSearchTermToUser(searchTerm: string) {
    return this.http.post(this.url + 'addtofav', {searchTerm: searchTerm}).subscribe(data => {
    })
  }

  getUsersSavedSearches() {
    return this.http.get<string[]>(this.url + 'favourites');
  }


  addSavedItem(item) {
    return this.http.post(this.url + 'saveitem', {item: item}).subscribe(data => {
    })
  }

  getSavedItems() {
    this.http.get<{items: SavedItem[]}>(this.url + 'saveitem')
      .subscribe(data => {
        this.savedItems = data.items;
        this.savedItemsUpdated.next({
          savedItems: [...this.savedItems]
        })
      })
  }

  removeSavedItem(id: string) {
    return this.http.delete(this.url + 'saveitem/' + id );
      
  }

  getSavedItemUpdateListener() {
    return this.savedItemsUpdated.asObservable();
  }
}
