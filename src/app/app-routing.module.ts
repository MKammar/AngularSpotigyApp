import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginToSpotifyComponent } from './login-to-spotify/login-to-spotify.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { ArtistAlbumsComponent } from './artist-albums/artist-albums.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'search', component: ArtistSearchComponent },
  {path: 'login', component: LoginToSpotifyComponent },
  {path: 'ArtistAlbums/:id', component: ArtistAlbumsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ArtistSearchComponent, LoginToSpotifyComponent]
