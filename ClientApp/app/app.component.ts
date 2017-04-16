import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  gridHeight = 200;
  gridData: any[] = [
    {
      id: 1
    },{
      id: 2
    }

  ]

  onButtonClick() {
      this.title = 'and Kendo UI!';
  }

  onButton2Click() {
      this.gridHeight = 100;
  }
}
