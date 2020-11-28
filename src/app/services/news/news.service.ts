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

  constructor(private http: HttpClient) { }


  getNewsByCategory(category: string, page: string = '1') {
    return this.http.get<{output: {articles, totalResults}}>('http://localhost:3000/api/news/homepagetabs', {params: {category: category, page: page}})
  }

  getNewsBySearchTerm(searchTerm: string) {
    return this.http.post<{output: {articles}}>('http://localhost:3000/api/news/search', {searchTerm: searchTerm});
  }







  addSearchTermToUser(searchTerm: string) {
    return this.http.post('http://localhost:3000/api/news/addtofav', {searchTerm: searchTerm}).subscribe(data => {
      console.log(data)
    })
  }

  getUsersSavedSearches() {
    return this.http.get<string[]>('http://localhost:3000/api/news/favourites');
  }







  addSavedItem(item) {
    return this.http.post('http://localhost:3000/api/news/saveitem', {item: item}).subscribe(data => {
      console.log(data);
    })
  }

  getSavedItems() {
    this.http.get<{items: SavedItem[]}>('http://localhost:3000/api/news/saveitem')
      .subscribe(data => {
        this.savedItems = data.items;
        this.savedItemsUpdated.next({
          savedItems: [...this.savedItems]
        })
      })
  }

  removeSavedItem(id: string) {
    return this.http.delete('http://localhost:3000/api/news/saveitem/' + id );
      
  }

  getSavedItemUpdateListener() {
    return this.savedItemsUpdated.asObservable();
  }
}
