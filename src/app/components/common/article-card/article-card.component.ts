import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {


  @Input() title: string;
  @Input() source: string;
  @Input() description: string;
  @Input() url: string;
  @Input() imageUrl: string;
  @Input() date: Date;
  @Input() authenticated: boolean;

  @Input() id: string;
  dateString: string;


  @Input() isSavedItem: boolean = false;


  constructor(private newsService: NewsService){}


  onSaveItem(title, source, description, dateString, date, url, imageUrl) {
    const itemToSave = {
      title: title,
      source: source,
      description: description || 'No description available.',
      dateString: dateString,
      date: date,
      url: url,
      imageUrl: imageUrl
    };

    this.newsService.addSavedItem(itemToSave);

  }

   onRemoveSavedItem(id: string) {

    this.newsService.removeSavedItem(id).subscribe(() => {
        this.newsService.getSavedItems();

    })
  }

  ngOnInit(): void {
    let articleDate = new Date(this.date)
    this.dateString = articleDate.toDateString();    
  }

}
