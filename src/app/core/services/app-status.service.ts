import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { SwUpdate } from '@angular/service-worker';
import { UpdateAvailableEvent, UpdateActivatedEvent } from '@angular/service-worker/src/low_level';

@Injectable({
  providedIn: CoreModule,
})
export class AppStatusService {
  constructor(private updates: SwUpdate) {
    this.updates.available.subscribe((event: UpdateAvailableEvent) => {
      console.log('[ Available ] current version: ', event.current);
      console.log('[ Available ] available version: ', event.available);
    });
    this.updates.activated.subscribe((event: UpdateActivatedEvent) => {
      console.log('[ Activated ] old version was: ', event.previous);
      console.log('[ Activated ] new version is: ', event.current);
    });
  }
}
