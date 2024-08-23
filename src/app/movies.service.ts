import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private _HttpClient: HttpClient) {}
  getData(mediaType: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getMovieDetails(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getLatestMovie(): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getMovieSimilar(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getMovieCast(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getMovieComponent(list: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/movie/${list}?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getMovietrailer(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
}
