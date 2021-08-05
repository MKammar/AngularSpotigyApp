import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GetApiServiceService {
  private searchUrl: string ="";
  public static access_token: string;
  private getUrl: string= "";

  constructor(private http: HttpClient,private activatedRoute: ActivatedRoute) {

  }

  searchArtist(artist: string, type='artist'): Observable<any> {

    const header = {
        headers: new HttpHeaders({
            'Authorization' : 'Bearer '+localStorage.getItem('token'),
        })
    };
    this.searchUrl = 'https://api.spotify.com/v1/search?q='+artist+'&type='+type+'&market=US&limit=10&offset=0';
    return this.http.get(this.searchUrl, header)
  }

  GetArtistAlbums(id: any) : Observable<any>{
    this.getUrl = '	https://api.spotify.com/v1/artists/'+id+'/albums';
    const header = {
      headers: new HttpHeaders({
          'Authorization' : 'Bearer '+localStorage.getItem('token'),
      })
  };

  return this.http.get(this.getUrl, header)
  }
}
