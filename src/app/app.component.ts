import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  show: boolean = false;
  clickEvent(){
    this.show = !this.show;       
  }
}
