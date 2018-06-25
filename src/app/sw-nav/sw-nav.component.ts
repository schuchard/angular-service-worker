import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AppStatusService } from '../core/services/app-status.service';

@Component({
  selector: 'sw-nav',
  templateUrl: './sw-nav.component.html',
  styleUrls: ['./sw-nav.component.css'],
})
export class NavComponent {
  constructor(private breakpointObserver: BreakpointObserver, public appStatus: AppStatusService) {}
}
