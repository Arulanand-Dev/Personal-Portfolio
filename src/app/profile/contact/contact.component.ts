import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { SnotifyPosition, SnotifyService, SnotifyToastConfig, Snotify } from 'ng-snotify';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('f',{static:false}) myForm:NgForm;
  model: any = {};

  constructor(
    private http: HttpClient,
    private snotifyService: SnotifyService
  ) {
  }

  ngOnInit() {
  }

  onSubmit(name, subject, email, message) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.snotifyService.info('Wait...', {timeout: 2000});
    this.http.post('https://formspree.io/f/xeqpwyag',
      { name: name, subject: subject, replyto: email, message: message },
      { 'headers': headers }).subscribe(
        response => {
          let clearTimeOut = window.setTimeout(()=>{
          window.clearTimeout(clearTimeOut)
          this.handleResponse(response);
        });
        },
        error=>{
          let clearTimeOut = window.setTimeout(()=>{
            window.clearTimeout(clearTimeOut); 
          this.handleError(error);
          });
        }
      );
  }

  handleResponse(_response) {
    this.snotifyService.success('Thanks!', 'Success',
    {
      timeout: 5000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true
    });
  }

  handleError(_error){
    debugger
    this.snotifyService.error(_error.error.errors[0].message.toString(), 'Failed',
    {
      timeout: 5000,
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true
    });
  }
}
