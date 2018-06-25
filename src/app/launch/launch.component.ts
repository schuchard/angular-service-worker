import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppStatusService } from '../core/services/app-status.service';

@Component({
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss'],
})
export class LaunchComponent implements OnInit, OnDestroy {
  allLaunches: Observable<any>;
  destroy$ = new Subject();
  online$ = true;

  constructor(private http: HttpClient, private appStatus: AppStatusService) {}

  ngOnInit() {
    this.appStatus.online.pipe(takeUntil(this.destroy$)).subscribe((res) => (this.online$ = res));

    this.http
      .get<any>(`https://api.spacexdata.com/v2/launches`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.allLaunches = res.reverse()));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
