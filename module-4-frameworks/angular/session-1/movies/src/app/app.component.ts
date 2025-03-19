import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  concatMap,
  delay,
  from,
  fromEvent,
  mergeMap,
  of,
  range,
  Subscription,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  pageTitle = 'movies';

  /**
   * el ! es para decirle a typescript que no se preocupe
   * que el valor no va a ser null
   */
  // sub!: Subscription;
  // subArray!: Subscription;
  // subFrom!: Subscription;
  // subEvent!: Subscription;
  // subEventKeyboard!: Subscription;

  // ngOnInit(): void {
  //   /**
  //    * emite de forma asincrona tantos args como se le pasen
  //    * hasta que no lo emite todo no sigue la siguiente linea de codigo
  //    *
  //    * suscribe soporta objeto + callback
  //    *
  //    * suscribe tiene que limpiarse para no colgar la app
  //    */
  //   this.sub = of(2, 4, 6, 8).subscribe((value) =>
  //     console.log(`Value from "of" from "sub": ${value}`)
  //   );
  //   /**
  //    * 1 emision de un array
  //    */
  //   this.subArray = of([2, 4, 6, 8]).subscribe((value) =>
  //     console.log(`Value from "of" from "subArray": ${value}`)
  //   );
  //   /**
  //    * El from emite los valores de un array uno a uno
  //    */
  //   this.subFrom = from([2, 4, 6, 8]).subscribe({
  //     next: (value) =>
  //       console.log(`Value from "from" from "subFrom": ${value}`),
  //     complete: () => console.log('Complete'),
  //   });

  //   /**
  //    * hacer click en cualquier parte del documento
  //    */
  //   this.subEvent = fromEvent(document, 'click').subscribe({
  //     next: (event) => console.log(`Click event":`, event.target),
  //     complete: () => console.log('No more click events'),
  //   });

  //   /**
  //    * hacer click y escribir
  //    */
  //   const keys: string[] = [];

  //   this.subEventKeyboard = fromEvent(document, 'keydown').subscribe(
  //     (event) => {
  //       const key = (event as KeyboardEvent).key;
  //       keys.push(key);
  //       console.log(`Keys pressed:`, keys);
  //       console.log(`Keys pressed: ${keys.join('')}`);
  //     }
  //   );
  // }

  // ngOnDestroy(): void {
  //   /**
  //    * Limpiar la subscripcion evitando memory leaks y demás.
  //    */
  //   this.sub.unsubscribe();
  //   this.subArray.unsubscribe();
  //   this.subFrom.unsubscribe();
  //   this.subEvent.unsubscribe();
  // }

  ngOnInit(): void {
    /**
     * concatmap es un operador que recibe un valor y devuelve un observable
     * que se suscribe a ese observable
     */
    range(1, 5)
      .pipe(concatMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((item) => console.log('concatMap:', item));

    /**
     * mergeMap no espera a q termine la operacion en curso
     */
    range(11, 5)
      .pipe(mergeMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((item) => console.log('mergeMap:', item));

    /**
     * cada vez que emite un valor, cancela la operacion anterior y empieza una nueva
     */
    range(111, 5)
      .pipe(switchMap((i) => of(i).pipe(delay(this.randomDelay()))))
      .subscribe((item) => console.log('mergeMap:', item));
  }
  ngOnDestroy(): void {}

  private randomDelay(): number {
    return Math.floor(Math.random() * 1000) + 500;
  }
}
