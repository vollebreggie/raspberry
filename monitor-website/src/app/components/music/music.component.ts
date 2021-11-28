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
  audioList = [
    {
      url: "file:///C:/projects/raspberry/monitor-website/music/Talking To Myself (Official Audio) - Linkin Park.mp3",
      title: "Talking To Myself (Official Audio) - Linkin Park",
      cover: "https://i.ytimg.com/vi/M5Ni_LskhFc/mqdefault.jpg"
    }
  ];

  constructor(private songService: SongService) {
    this.songService.getCurrentSong("Linkin Park - One More Light - Full Album (2017)").subscribe(r => {
      console.log(r);
    });

    this.songService.getNextSongsInPlayList("Linkin Park - One More Light - Full Album (2017)").subscribe(r => {
      console.log("playlist");
      console.log(r);
    });


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
