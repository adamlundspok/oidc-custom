import {
  Component, OnDestroy,
  OnInit, ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    public imagesrc: string;

    public ngOnInit() {
        this.imagesrc = 'http://i1.ytimg.com/vi/N4OPr_QxoFg/hqdefault.jpg';
    }
}
