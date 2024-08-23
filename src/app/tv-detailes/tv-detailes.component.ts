import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TvService } from '../tv.service';

@Component({
  selector: 'app-tv-detailes',
  standalone: true,
  imports: [RouterLink, NgForOf],
  templateUrl: './tv-detailes.component.html',
  styleUrl: './tv-detailes.component.scss',
})
export class TvDetailesComponent implements OnInit {
  seriesDetails: any;
  seriescast: any;
  seriesSimilar: any;
  Tvtrailer: any;
  trailerid: any;
  trailerVideo: any;
  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  direction: number = 0;
  imgContainer: any;
  scrollAmount: number = 0;
  slideButton: any;
  maxScrollWidth: number = 0;
  constructor(
    private _TvService: TvService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.url.subscribe((url) => {
      this._TvService.getTvDetails(url[1].path).subscribe((response) => {
        this.seriesDetails = response;
      });
      this._TvService.getTvSimilar(url[1].path).subscribe((response) => {
        this.seriesSimilar = response.results;
      });
      this._TvService.getTvcast(url[1].path).subscribe((response) => {
        this.seriescast = response.cast;
      });
      this._TvService.getTvTrailer(url[1].path).subscribe((response) => {
        this.Tvtrailer = response.results;
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
