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
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      title: "Smaple 1",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    },
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
      title: "Sample 2",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
    },
    {
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
      title: "Sample 3",
      cover: "https://i1.sndcdn.com/artworks-000249294066-uow7s0-t500x500.jpg"
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
