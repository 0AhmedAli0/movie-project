import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [NgForOf, RouterLink, NgIf],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieDetails: any;
  movieSimilar: any;
  MovieCast: any;
  movietrailer: any;
  trailerid: any;
  trailerVideo: any;
  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  videoPrefix: string = 'https://www.youtube.com/embed/';
  direction: number = 0;
  imgContainer: any;
  scrollAmount: number = 0;
  slideButton: any;
  maxScrollWidth: number = 0;
  constructor(
    private _MoviesService: MoviesService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.url.subscribe(() => {
      this._MoviesService
        .getMovieDetails(this._ActivatedRoute.snapshot.params['id'])
        .subscribe((response) => {
          this.movieDetails = response;
        });
      this._MoviesService
        .getMovieSimilar(this._ActivatedRoute.snapshot.params['id'])
        .subscribe((response) => {
          this.movieSimilar = response.results;
        });
      this._MoviesService
        .getMovieCast(this._ActivatedRoute.snapshot.params['id'])
        .subscribe((response) => {
          this.MovieCast = response.cast;
        });
      this._MoviesService
        .getMovietrailer(this._ActivatedRoute.snapshot.params['id'])
        .subscribe((response) => {
          this.movietrailer = response.results;
          if (response.results.length > 0) {
            for (let x of response.results) {
              if (x.type == 'Trailer') {
                this.trailerid = x.key;
                this.trailerVideo = document.querySelector('.trailer-video');
                this.trailerVideo.innerHTML = `
               <iframe
                width="100%"
                height="${this.trailerVideo.clientWidth / 2}"
                src="https://www.youtube.com/embed/${this.trailerid}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>`;
              }
            }
          } else {
            this.trailerVideo.innerHTML = '';
          }
        });
    });
  }
  slideButtonPre(chil: any) {
    this.imgContainer = document.querySelectorAll('.slider .slider-content');
    this.scrollAmount = this.imgContainer[chil].clientWidth * -1;
    this.imgContainer[chil].scrollBy({
      left: this.scrollAmount,
      behavior: 'smooth',
    });
  }
  slideButtonNex(chil: any) {
    this.imgContainer = document.querySelectorAll('.slider .slider-content ');
    this.scrollAmount = this.imgContainer[chil].clientWidth;
    this.imgContainer[chil].scrollBy({
      left: this.scrollAmount,
      behavior: 'smooth',
    });
  }
  handelSlideButtom(chil: any) {
    this.imgContainer = document.querySelectorAll('.slider .slider-content');
    this.maxScrollWidth =
      this.imgContainer[chil].scrollWidth - this.imgContainer[chil].clientWidth;
    this.slideButton = document.querySelectorAll('.slider .slide-button');
    if (chil == 0) {
      this.slideButton[0].style.display =
        this.imgContainer[chil].scrollLeft <= 0 ? 'none' : 'block';
      this.slideButton[1].style.display =
        this.imgContainer[chil].scrollLeft >= this.maxScrollWidth
          ? 'none'
          : 'block';
    } else if (chil == 1) {
      this.slideButton[2].style.display =
        this.imgContainer[chil].scrollLeft <= 0 ? 'none' : 'block';
      this.slideButton[3].style.display =
        this.imgContainer[chil].scrollLeft >= this.maxScrollWidth
          ? 'none'
          : 'block';
    } else {
      this.slideButton[4].style.display =
        this.imgContainer[chil].scrollLeft <= 0 ? 'none' : 'block';
      this.slideButton[5].style.display =
        this.imgContainer[chil].scrollLeft >= this.maxScrollWidth
          ? 'none'
          : 'block';
    }
  }
  ngOnDestroy(): void {}
}
