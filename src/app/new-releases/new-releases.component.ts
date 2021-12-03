import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases: any[] = [];

  constructor(musicData: MusicDataService) {
    musicData.getNewReleases().subscribe({
      next: (data: any) => this.releases = data.albums.items
    });
  }

  ngOnInit(): void {
  }

}
