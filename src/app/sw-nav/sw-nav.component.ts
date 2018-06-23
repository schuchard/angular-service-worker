import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppStatusService } from '../core/services/app-status.service';

@Component({
  selector: 'sw-nav',
  templateUrl: './sw-nav.component.html',
  styleUrls: ['./sw-nav.component.css'],
})
export class NavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private appStatus: AppStatusService
  ) {}
}
