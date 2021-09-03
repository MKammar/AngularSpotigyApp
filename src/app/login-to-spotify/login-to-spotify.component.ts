import { Component, OnInit } from '@angular/core';
import { getJSDocParameterTags } from 'typescript';

@Component({
  selector: 'app-login-to-spotify',
  templateUrl: './login-to-spotify.component.html',
  styleUrls: ['./login-to-spotify.component.css']
})
export class LoginToSpotifyComponent  {

  public static Client_ID = "090c1d0e9e444e0b97f79b11256ae59d";
  public static Spotify_Authorize_Endpoint = "https://accounts.spotify.com/authorize";
  public static Redirect_URl = "http://localhost:4200/search";
  public static Scopes = ["user-read-email","user-read-private"];
  public static Scopes_Param = LoginToSpotifyComponent.Scopes.join("%20");

  constructor() { }


  loginRedirect = function () {
      window.location.href = `${LoginToSpotifyComponent.Spotify_Authorize_Endpoint}?client_id=${LoginToSpotifyComponent.Client_ID}&response_type=code&redirect_uri=${LoginToSpotifyComponent.Redirect_URl}&scope=${LoginToSpotifyComponent.Scopes_Param}&show_dialog=true`;
    }


}
