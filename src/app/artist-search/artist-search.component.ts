import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { GetApiServiceService } from '../get-api-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.css']
})
export class ArtistSearchComponent implements OnInit {

  search: string = "" ;
  expiryDate: any ;
  public artists: any[];
  private timer: any;
  private delaySearch: boolean = true;
  noimage: any = "../../assets/Images/noimage.png"
  totalRecords: any;
  page: number = 1;

  constructor(private api: GetApiServiceService, private activatedRoute: ActivatedRoute, private router: Router) {
      this.artists = [];
      this.router.events
        .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
        .subscribe(event => {
          if (
            event.id === 1 &&
            event.url === event.urlAfterRedirects
          ) {
            this.artists = [];
            sessionStorage.clear();
          }
        })
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
      if(sessionStorage.getItem('artistList') != null){
        this.artists = JSON.parse(sessionStorage.getItem('artistList')!);
        this.search = sessionStorage.getItem('searchChars')!
      }

   }

   searchDelay(name: any){
    console.log(name);
     if(name == ""){
       this.totalRecords = 0;
       this.artists = [];
       sessionStorage.clear();
     }
     else {
      this.api.searchArtist(name)
      .subscribe(res => {
        sessionStorage.setItem('artistList',JSON.stringify(res.artists.items));
        sessionStorage.setItem('searchChars',name);
        this.artists = res.artists.items;
        this.totalRecords = res.artists.items.length;
        console.log(res.artists.items.length);
      })
     }

   }

    onKey() {
      let _this = this;
      if(this.delaySearch){
        if(this.timer){
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(
          function(){
          _this.searchDelay(_this.search)
        },
        1000,this.search);
      }
      else {
        this.searchDelay(this.search);
      }

  }


}
