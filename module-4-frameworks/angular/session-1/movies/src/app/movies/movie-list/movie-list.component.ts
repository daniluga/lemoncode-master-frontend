import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { MovieService } from '../movie.service';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgIf, NgClass, NgFor, MovieDetailComponent, AsyncPipe],
  templateUrl: './movie-list.component.html',
  styles: ``,
})
export class MovieListComponent {
  // implements OnInit, OnDestroy {
  pageTitle = 'Movies';
  errorMessage = '';
  // sub!: Subscription;

  // Movie service
  private movieService = inject(MovieService);
  readonly movies$ = this.movieService.movies$.pipe(
    tap(() => console.log('In component pipe')),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  // Movies
  // movies: Movie[] = [];

  // Selected movie id to highlight the entry
  // selectedMovieId: number = 0;
  readonly selectedMovieId$ = this.movieService.movieSelected$;

  // ngOnInit(): void {
  //   this.sub = this.movieService.movies$
  //     // .getMovies()
  //     .pipe(
  //       tap(() => console.log('In component pipe')),
  //       catchError((err) => {
  //         this.errorMessage = err;
  //         return EMPTY;
  //       })
  //     )
  //     .subscribe((movies) => {
  //       this.movies = movies;
  //       console.log('Movies', this.movies);
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onSelected(movieId: number): void {
    // this.selectedMovieId = movieId;
    this.movieService.movieSelected(movieId);
  }
}
