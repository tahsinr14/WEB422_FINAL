import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results: any;
  searchQuery: string = String();

  constructor(activatedRoute: ActivatedRoute, musicData: MusicDataService) {
    activatedRoute.queryParamMap.subscribe(query => {
      this.searchQuery = String(query.get('q'));

      musicData.searchArtists(this.searchQuery).subscribe({
        next: data => this.results = data.artists.items.filter((artist: any) => artist.images.length)
      });
    });
  }

  ngOnInit(): void {
  }

}
