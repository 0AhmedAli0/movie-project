import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TvService } from '../tv.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-season-details',
  standalone: true,
  imports: [NgForOf, RouterLink],
  templateUrl: './season-details.component.html',
  styleUrl: './season-details.component.scss',
})
export class SeasonDetailsComponent implements OnInit {
  SeasonDetails: any;
  seriesDetails: any;
  seriesSimilar: any;
  imagePrefix: string = 'https://image.tmdb.org/t/p/original';
  direction: number = 0;
  imgContainer: any;
  scrollAmount: number = 0;
  slideButton: any;
  maxScrollWidth: number = 0;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _TvService: TvService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.url.subscribe((url) => {
      this._TvService.getTvDetails(url[1].path).subscribe((response) => {
        this.seriesDetails = response;
      });
      this._TvService.getTvSimilar(url[1].path).subscribe((response) => {
        this.seriesSimilar = response.results;
      });
      this._TvService
        .getTvSeasonDetails(url[1].path, url[3].path)
        .subscribe((response) => {
          this.SeasonDetails = response;
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
