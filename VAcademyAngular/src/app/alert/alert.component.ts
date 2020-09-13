import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;  
    constructor(  
        private confirmDialogService: AlertService  
    ) { }  
  
    ngOnInit() {  
        //this function waits for a message from alert service, it gets   
        //triggered when we call this from any other component  
        this.confirmDialogService.getMessage().subscribe(message => {  
            this.message = message;  
        });  
    }

}
