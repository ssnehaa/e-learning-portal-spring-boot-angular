import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<any>();  
    constructor() { }  
    confirmThis(message: string) {  
        this.setConfirmation(message);  
    }  
    setConfirmation(message: string) {  
        let that = this;  
        this.subject.next({  
            type: "confirm",  
            text: message,  
            siFn:  
                function () {  
                    that.subject.next(); //this will close the modal  
                }
/*                    siFn();  
                },  
            noFn: function () {  
                that.subject.next();  
                noFn();  
            } */ 
        }); 
  
    }  
  
    getMessage(): Observable<any> {  
        return this.subject.asObservable();  
    }
}
