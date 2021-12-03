import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;
  snackBar: MatSnackBar;
  musicData: MusicDataService;

  constructor(snackBar: MatSnackBar, musicData: MusicDataService, activatedRoute: ActivatedRoute) {
    this.snackBar = snackBar;
    this.musicData = musicData;

    activatedRoute.paramMap.subscribe(param => {
      let id: string = String(param.get('id'));

      this.musicData.getAlbumById(id).subscribe({
        next: data => this.album = data
      });
    });
  }

  ngOnInit(): void {
  }

  addToFavourites(trackID: string) {
    this.musicData.addToFavourites(trackID).subscribe({
      next: () => this.snackBar.open("Added to Favourites", "Done", { duration: 1500 }),
      error: () => this.snackBar.open("Unable to add song to Favourites", "Error", { duration: 1500 })
    })
  }
}
