import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: any[] = [];
  artist: any;

  constructor(musicData: MusicDataService, activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe(params => {
      let id: string = String(params.get('id'));

      musicData.getArtistById(id).subscribe({
        next: (data: any) => this.artist = data
      });
      musicData.getAlbumsByArtistId(id).subscribe({
        next: data => this.albums = data.items.filter((album: any, index: number, self: Array<any>) => self.findIndex(({id}: any) => album.id == id) == index)
      });
    });
  }

  ngOnInit(): void {
  }

}
