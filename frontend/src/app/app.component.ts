import { Component } from '@angular/core';
import { PublicService } from  './services/public.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly ROOT_URL = 'http://localhost:9000/'
  title = 'PayrollUI Logins Page';
  msg:any;
  constructor(private pService: PublicService) {

  }
  ngOnInit(): void {
    this.showMessage();
  }
  showMessage() {
    this.pService.getMessage().subscribe(data => {
      this.msg = data,
        console.log(this.msg);
    });
  }
}
