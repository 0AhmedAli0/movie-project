import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  trendingmovie: any[] = [];
  trendingTv: any[] = [];
  trendingPeople: any[] = [];
  upComing: any[] = [];
  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  direction: number = 0;
  imgContainer: any;
  scrollAmount: number = 0;
  slideButton: any;
  maxScrollWidth: number = 0;

  constructor(private _MoviesService: MoviesService) {}

  ngOnInit(): void {
    this._MoviesService.getData('movie').subscribe((response) => {
      this.trendingmovie = response.results.slice(0, 10);
    });
    ////
    this._MoviesService.getData('tv').subscribe((response) => {
      this.trendingTv = response.results.slice(0, 10);
    });
    ////
    this._MoviesService.getData('person').subscribe((response) => {
      this.trendingPeople = response.results.slice(0, 10);
    });
    this._MoviesService.getLatestMovie().subscribe((response) => {
      this.upComing = response.results;
    });
    this.imgContainer = document.querySelector(
      '.slider .slider-content .imags-container'
    );
  }

  slideButtonPre() {
    this.scrollAmount = this.imgContainer.clientWidth * -1;
    this.imgContainer.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
  }
  slideButtonNex() {
    this.scrollAmount = this.imgContainer.clientWidth;
    console.log(this.imgContainer.scrollLeft);
    this.imgContainer.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
  }
  handelSlideButtom() {
    this.maxScrollWidth =
      this.imgContainer.scrollWidth - this.imgContainer.clientWidth;
    this.slideButton = document.querySelectorAll(
      '.slider .slider-content .slide-button'
    );
    this.slideButton[0].style.display =
      this.imgContainer.scrollLeft <= 0 ? 'none' : 'block';
    this.slideButton[1].style.display =
      this.imgContainer.scrollLeft >= this.maxScrollWidth ? 'none' : 'block';
  }
}
