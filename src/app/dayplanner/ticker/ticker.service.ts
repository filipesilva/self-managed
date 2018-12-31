import { Injectable } from '@angular/core';
import { timer, Subject, merge } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class TickerService {
  private _fiveMinuteTicker = timer(0, 5 * 60 * 1000).pipe(map(() => Date.now()));
  private _onDemandSubject = new Subject();
  private _onDemandTicker = this._onDemandSubject.pipe(delay(0), map(() => Date.now()));
  ticker = merge(this._fiveMinuteTicker, this._onDemandTicker);

  tick() {
    this._onDemandSubject.next();
  }
}
