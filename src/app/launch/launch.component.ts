import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { AppStatusService } from '../app-status.service';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss'],
})
export class LaunchComponent implements OnInit, OnDestroy {
  allLaunches: Observable<any>;
  destroy$ = new Subject();
  online$ = true;
  cols: Observable<number>;

  constructor(
    private http: HttpClient,
    private appStatus: AppStatusService,
    private observableMedia: ObservableMedia
  ) {}

  ngOnInit() {
    this.appStatus.online.pipe(takeUntil(this.destroy$)).subscribe((res) => (this.online$ = res));

    this.http
      .get<any>(`https://api.spacexdata.com/v2/launches`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => (this.allLaunches = res.reverse()));

    this.configureGrid();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private configureGrid() {
    const grid = new Map([['xs', 1], ['sm', 2], ['md', 2], ['lg', 3], ['xl', 3]]);
    let start: number;

    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });

    this.cols = this.observableMedia.asObservable().pipe(
      map((change) => grid.get(change.mqAlias)),
      startWith(start)
    );
  }
}
