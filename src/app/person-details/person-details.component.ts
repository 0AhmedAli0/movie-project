import { Component, OnInit } from '@angular/core';
import { TvService } from '../tv.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [NgForOf, RouterLink, RouterOutlet],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss',
})
export class PersonDetailsComponent implements OnInit {
  personeDetailes: any;
  personeMovies: any;
  personetv: any;

  imagePrefix: string = 'https://image.tmdb.org/t/p/w500';
  constructor(
    private _TvService: TvService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.url.subscribe((Aurl) => {
      this._TvService.getcast(Aurl[1].path).subscribe((response) => {
        this.personeDetailes = response;
      });
      this._TvService.getcastMovie(Aurl[1].path).subscribe((response) => {
        this.personeMovies = response.cast;
      });
      this._TvService.getcasttv(Aurl[1].path).subscribe((response) => {
        this.personetv = response.cast;
      });
    });
  }

  tvclick() {
    document.querySelector('.row .known .movie')?.classList.remove('active');
    document.querySelector('.row .known .tv')?.classList.add('active');
    document.querySelector('.row .alltv')?.classList.remove('hidden');
    document.querySelector('.row .allmovies')?.classList.add('hidden');
  }
  movieclick() {
    document.querySelector('.row .known .movie')?.classList.add('active');
    document.querySelector('.row .known .tv')?.classList.remove('active');
    document.querySelector('.row .alltv')?.classList.add('hidden');
    document.querySelector('.row .allmovies')?.classList.remove('hidden');
  }
}
