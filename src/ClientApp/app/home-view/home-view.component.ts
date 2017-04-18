import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

    @Input() title: string;

    constructor() { }

    ngOnInit() {
    }

}
