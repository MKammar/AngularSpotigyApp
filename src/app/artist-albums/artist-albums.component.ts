import { ArtistSearchComponent } from './../artist-search/artist-search.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GetApiServiceService } from '../get-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.css']
})
export class ArtistAlbumsComponent implements OnInit {

  private id : any;
  public albums : any[];
  totalRecords: any;
  page: number = 1;
  // @ViewChild(ArtistSearchComponent) artistSearch: ArtistSearchComponent;

  constructor(private api: GetApiServiceService, private activatedRoute: ActivatedRoute) {
    this.albums = [];
  }

  // @HostListener('window:popstate', ['$event'])
  //   onPopState() {
  //     this.artistSearch.searchDelay("a");
  //    console.log('Back button pressed');
  //  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.id = params.get("id");
      });

      this.api.GetArtistAlbums(this.id)
        .subscribe(res => {
          this.albums = res.items;
          this.totalRecords = res.items.length;
          console.log(res.items)
        });
  }

  RedirectToSpotify(url: any){

    window.location.href = `${url}`
  }

}
