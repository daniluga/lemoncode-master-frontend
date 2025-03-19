import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Movie } from '../movie';
import { catchError, EMPTY, Subscription } from 'rxjs';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe],
  templateUrl: './movie-detail.component.html',
  styles: ``,
})
export class MovieDetailComponent {
  // export class MovieDetailComponent implements OnChanges, OnDestroy {

  private movieService = inject(MovieService);
  movie$ = this.movieService.movie$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  errorMessage = '';
  pageTitle = this.movie
    ? `Product Detail for: ${this.movie.movieName}`
    : 'Movie Detail';

  addToCart(movie: Movie) {}

  // @Input() movieId: number = 0;
  // sub!: Subscription;
  // movie: Movie | null = null; // Movie to display

  // ngOnChanges(changes: SimpleChanges): void {
  //   const id = changes['movieId'].currentValue;
  //   if (id > 0) {
  //     this.sub = this.movieService
  //       .getMovie(id)
  //       .pipe(
  //         catchError((err) => {
  //           this.errorMessage = err;
  //           return EMPTY;
  //         })
  //       )
  //       .subscribe({
  //         next: (movie) => (this.movie = movie),
  //         error: (err) => (this.errorMessage = err),
  //       });
  //   }
  // }
  // ngOnDestroy(): void {
  //   if (this.sub) {
  //     this.sub.unsubscribe();
  //   }
  // }
}
