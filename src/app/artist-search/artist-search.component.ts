import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { GetApiServiceService } from '../get-api-service.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnInit {

  search: string ="" ;

  public artists: any[];
  constructor(private api: GetApiServiceService) {
    this.artists = [];
   }

   ngOnInit(): void {
     if(localStorage.getItem('token') == null) {
      let response = location.hash.split('=')[1];
      let access_token = response.split('&')[0];
      localStorage.setItem('token',access_token);

     }
   }

  onKey() {
    this.api.searchArtist(this.search)
      .subscribe(res => {
        this.artists = res.artists.items;
        console.log(res.artists.items);
      })

  }


}
