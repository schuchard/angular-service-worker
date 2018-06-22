import { Component } from '@angular/core';
import { AppStatusService } from './core/services/app-status.service';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Service Worker';

  constructor(private appStatus: AppStatusService) {
  }
}
