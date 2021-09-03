import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { ArtistAlbumsComponent } from './artist-albums/artist-albums.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShortFormatPipe } from './pipes/short-format.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxPaginationModule }  from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ArtistAlbumsComponent,
    NavbarComponent,
    HomeComponent,
    ShortFormatPipe,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatPaginatorModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
