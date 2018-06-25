import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss'],
})
export class LaunchComponent implements OnInit, OnDestroy {
  allLaunches: Observable<any>;
  destroy$ = new Subject();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>(`https://api.spacexdata.com/v2/launches`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.allLaunches = res));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
