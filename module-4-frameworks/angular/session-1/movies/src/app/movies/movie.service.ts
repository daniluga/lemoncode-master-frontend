import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Observable,
  tap,
  catchError,
  throwError,
  EMPTY,
  map,
  of,
  switchMap,
  share,
  shareReplay,
  BehaviorSubject,
  filter,
} from 'rxjs';
import { Movie } from './movie';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesUrl = 'api/movies';

  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);

  /**
   * Subject para manejar eventos de seleccion de peliculas
   * BehaviorSubject para manejar el estado actual de la pelicula seleccionada
   * BehaviorSubject es un Subject que emite el ultimo valor emitido a los nuevos suscriptores
   * "método next" para emitir un nuevo valor
   */
  private movieSelectedSubject = new BehaviorSubject<number | undefined>(
    undefined
  );
  /**
   * observable para que los componentes se suscriban a el
   * id de la pelicula seleccionada, no es la movie completa
   */
  readonly movieSelected$ = this.movieSelectedSubject.asObservable();

  // getMovies(): Observable<Movie[]> {
  //   return this.http
  //     .get<Movie[]>(this.moviesUrl)
  //     .pipe(tap(() => console.log('In http.get pipeline')));
  // }

  /**
   * $ es una convencion para decir que es un observable
   * hemos pasado de getMovies a movies$, de una funcion a un observable
   */
  readonly movies$ = this.http.get<Movie[]>(this.moviesUrl).pipe(
    tap((m) => console.log(JSON.stringify(m))),
    shareReplay(1), // Repite la emision del observable para que no se haga una nueva peticion al servidor
    tap(() => console.log('After shareReplay')),
    catchError((err) => this.handleError(err))
  );

  readonly movie$ = this.movieSelected$.pipe(
    filter((x) => Boolean(x)), // Filtra valores falsos (undefined, null, 0, '') y solo manda valores verdaderos
    switchMap((id) => {
      const movieUrl = `${this.moviesUrl}/${id}`;
      return this.http.get<Movie>(movieUrl).pipe(
        tap(() => console.log('In http.get by id pipeline')),
        switchMap((m) => this.getMovieWithReviews(m)),
        catchError(this.handleError)
      );
    })
  );

  // getMovie(id: number): Observable<Movie> {
  //   const movieUrl = `${this.moviesUrl}/${id}`;

  //   /**
  //    * los operadores acumulan los tipos de retorno de las funciones que se les pasan
  //    * necesitamos operadores que no acumulen tipos de retorno
  //    *
  //    * los high order observers no acumulan tipos de retorno
  //    */

  //   return this.http.get<Movie>(movieUrl).pipe(
  //     tap(() => console.log('In http.get pipeline')),
  //     // map((p) => this.getMovieWithReviews(p)),
  //     switchMap((p) => this.getMovieWithReviews(p)),
  //     tap((x) => x),
  //     catchError((err) => this.handleError(err))
  //   );
  // }

  getMovieWithReviews(movie: Movie): Observable<Movie> {
    if (movie.hasReviews) {
      this.http.get<Review[]>(this.reviewService.getReviewUrl(movie.id)).pipe(
        map((reviews) => {
          const newMovie = { ...movie, reviews } as Movie;
          return newMovie;
        })
      );
    }
    return of(movie);
  }

  movieSelected(selectedMovieId: number): void {
    this.movieSelectedSubject.next(selectedMovieId);
  }

  private handleError(er: HttpErrorResponse): Observable<never> {
    const formatted = this.errorService.formatError(er);
    return throwError(() => formatted);
  }
}
