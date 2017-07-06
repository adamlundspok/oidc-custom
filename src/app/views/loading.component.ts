import { Component, ViewChild, Injectable } from '@angular/core';

@Component({
  selector: 'app-load-spinner',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

@Injectable()
export class LoadingComponent  {
    private message = 'Loading';
    private hidden = true;

    public setMessage(message: string): void {
        this.message = message;
    }

    public show(): void {
        this.hidden = false;
    }

    public hide(): void {
        this.hidden = true;
    }

    public isShowing(): boolean {
        return this.hidden;
    }
}
