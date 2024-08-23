import { Component, OnInit } from '@angular/core';
import { TvService } from '../tv.service';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [RouterLink, NgForOf],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.scss',
})
export class TvComponent implements OnInit {
  airing_today: any;
  on_the_air: any;
  popular: any;
  top_rated: any;
  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  direction: number = 0;
  imgContainer: any;
  scrollAmount: number = 0;
  slideButton: any;
  maxScrollWidth: number = 0;
  constructor(private _TvService: TvService) {}
  ngOnInit(): void {
    this._TvService.getTvComponent('airing_today').subscribe((response) => {
      this.airing_today = response.results;
    });
    this._TvService.getTvComponent('on_the_air').subscribe((response) => {
      this.on_the_air = response.results;
    });
    this._TvService.getTvComponent('popular').subscribe((response) => {
      this.popular = response.results;
    });
    this._TvService.getTvComponent('top_rated').subscribe((response) => {
      this.top_rated = response.results;
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
