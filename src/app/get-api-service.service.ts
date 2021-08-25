import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GetApiServiceService {
  private searchUrl: string ="";
  private tokenBody: string ="";
  public static access_token: string;
  private getUrl: string= "";
  public static Client_ID = "090c1d0e9e444e0b97f79b11256ae59d";
  public static Client_SECRET ="69d2dbdc315549d8b20414abce00c942";

  constructor(private http: HttpClient,private activatedRoute: ActivatedRoute) {

  }

  getToken(code: string): Observable<any> {
    const header = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
      })
  };
  this.tokenBody = "https://accounts.spotify.com/api/token";
   let body = "grant_type=authorization_code";
   body+="&code="+code;
   body+="&redirect_uri="+encodeURI("http://localhost:4200/search");
   body+="&client_id="+GetApiServiceService.Client_ID;
   body+="&client_secret="+GetApiServiceService.Client_SECRET;


  return this.http.post<any>(this.tokenBody,body,header);
  }
  getRefreshToken(refresh: any) :Observable<any> {
    const header = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
      })
  };
  this.tokenBody = "https://accounts.spotify.com/api/token";
  let body = "grant_type=refresh_token";
  body+="&refresh_token="+refresh;
  body+="&client_id="+GetApiServiceService.Client_ID;
  body+="&client_secret="+GetApiServiceService.Client_SECRET;

  return this.http.post<any>(this.tokenBody,body,header);
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
