import { ActivatedRoute } from '@angular/router';
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
  expiryDate: any ;
  public artists: any[];
  constructor(private api: GetApiServiceService, private activatedRoute: ActivatedRoute) {
    this.artists = [];
   }

   ngOnInit(): void {

   if(localStorage.getItem('expiry_date') == null){
    this.activatedRoute.queryParams.subscribe(params =>
      this.api.getToken(params['code'])
        .subscribe(res => {
          console.log(res);
          var now = new Date();
          this.expiryDate = new Date(now.getTime() + res.expires_in*1000);
          console.log(this.expiryDate);
           if(localStorage.getItem('token') == null) {
            localStorage.setItem('token',res.access_token);
            localStorage.setItem('refresh_token',res.refresh_token);
            localStorage.setItem('expiry_date',this.expiryDate);
        }
        })
      );
   }

      else {
        var now = new Date();
        if(localStorage.getItem('expiry_date')! <= now.toString()){
          this.api.getRefreshToken(localStorage.getItem('refresh_token'))
          .subscribe(res => {
            this.expiryDate = new Date(now.getTime() + res.expires_in*1000);
            localStorage.setItem('token',res.access_token);
            localStorage.setItem('expiry_date',this.expiryDate);
          })
        }
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
