import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/Song';
import { SongService } from '../../services/SongService';

@Component({
  selector: 'music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService) {
    this.songService.getPlayList().subscribe(r => {
      this.songService.getSongs(r.response[0].id).subscribe(r => {
        this.songs = r.response;
        console.log(this.songs);
      });
    })
  }

  ngOnInit(): void {
  }

}
