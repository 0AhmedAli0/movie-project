import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
Observable;
@Injectable({
  providedIn: 'root',
})
export class TvService {
  constructor(private _HttpClient: HttpClient) {}
  getTvComponent(list: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/tv/${list}?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getTvDetails(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getTvSeasonDetails(id: string, sn: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${sn}?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getTvSimilar(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getTvcast(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getcast(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getcastMovie(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getcasttv(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  getTvTrailer(id: string): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
  search(query: string, page: number): Observable<any> {
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1&api_key=c22d026779498c0553e1f2bc2035befc`
    );
  }
}
