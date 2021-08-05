import { Component, OnInit } from '@angular/core';
import { GetApiServiceService } from '../get-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.css']
})
export class ArtistAlbumsComponent implements OnInit {

  private id : any;
  public albums : any[];
  constructor(private api: GetApiServiceService, private activatedRoute: ActivatedRoute) {
    this.albums = [];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(params => {
        this.id = params.get("id");
      });

      this.api.GetArtistAlbums(this.id)
        .subscribe(res => {
          this.albums = res.items;
          console.log(res.items)
        });
  }

  RedirectToSpotify(url: any){

    window.location.href = `${url}`
  }

}
