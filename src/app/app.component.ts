import { Component } from '@angular/core';
import { AppStatusService } from './app-status.service';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public appStatus: AppStatusService) {}
}
