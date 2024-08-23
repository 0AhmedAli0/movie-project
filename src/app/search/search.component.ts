import { Component, OnInit } from '@angular/core';
import { TvService } from '../tv.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgForOf, RouterLink, NgIf],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  searchResults: any;
  imagePrefix: string = 'https://image.tmdb.org/t/p/original';

  constructor(
    private _TvService: TvService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.url.subscribe((url) => {
      this._TvService.search(url[1].path, 1).subscribe((response) => {
        this.searchResults = response.results;
      });
    });
  }
}
