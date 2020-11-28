import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ErrorService } from 'src/app/services/errors/error.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {

  @Input() message: string;
  @Output() removeError = new EventEmitter();

  
  clearNotification(){
      this.removeError.emit();
  }

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
  }

}
