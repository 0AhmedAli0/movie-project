import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NgForOf, RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent implements OnInit {
  now_playing: any;
  popular: any;
  top_rated: any;
  upcoming: any;
  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  direction: number = 0;
  imgContainer: any;
  scrollAmount: number = 0;
  slideButton: any;
  maxScrollWidth: number = 0;

  constructor(private _MoviesService: MoviesService) {}
  ngOnInit(): void {
    this._MoviesService
      .getMovieComponent('now_playing')
      .subscribe((response) => {
        this.now_playing = response.results;
      });
    this._MoviesService.getMovieComponent('popular').subscribe((response) => {
      this.popular = response.results;
    });
    this._MoviesService.getMovieComponent('top_rated').subscribe((response) => {
      this.top_rated = response.results;
    });
    this._MoviesService.getMovieComponent('upcoming').subscribe((response) => {
      this.upcoming = response;
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
    console.log(this.slideButton);
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
}
