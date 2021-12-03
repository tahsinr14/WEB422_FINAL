import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any> = [];
  musicData: MusicDataService;

  constructor(musicData: MusicDataService) {
    this.musicData = musicData;

    this.musicData.getFavourites().subscribe({
      next: data => this.favourites = data.tracks
    });
  }

  ngOnInit(): void {
  }

  removeFromFavourites(id: string) {
    this.musicData.removeFromFavourites(id).subscribe({
      next: data => this.favourites = data.tracks
    });
  }

}
