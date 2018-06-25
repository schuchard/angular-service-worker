import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { SwUpdate } from '@angular/service-worker';
import { UpdateAvailableEvent, UpdateActivatedEvent } from '@angular/service-worker/src/low_level';
import { BehaviorSubject, merge, fromEvent, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
// import { interval } from 'rxjs';

@Injectable({
  providedIn: CoreModule,
})
export class AppStatusService {
  swUpdates = new BehaviorSubject('');

  constructor(private updates: SwUpdate) {
    // programmatically check for updates every 5 seconds
    // interval(5000).subscribe(() => this.updates.checkForUpdate());

    this.updates.available.subscribe((event: UpdateAvailableEvent) => {
      console.log('[ Available ] current version: ', event.current);
      console.log('[ Available ] available version: ', event.available);

      if (event.available) {
        this.swUpdates.next(event.available.hash.slice(0, 4));
      }
    });

    this.updates.activated.subscribe((event: UpdateActivatedEvent) => {
      console.log('[ Activated ] old version was: ', event.previous);
      console.log('[ Activated ] new version is: ', event.current);
    });
  }

  reloadApp() {
    return this.updates.activateUpdate().then(() => document.location.reload());
  }

  get updateAvailable() {
    return this.swUpdates.asObservable();
  }

  get online() {
    return merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
  }
}
