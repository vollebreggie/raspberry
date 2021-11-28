import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Keys } from '../../keys/keys';
import { AudioPlayerOptions } from '../../services/AudioPlayerOptions';
import { MusicPlayerService } from '../../services/MusicPlayerService';
import { SongService } from '../../services/SongService';

@Component({
  selector: 'music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent extends AudioPlayerOptions implements OnInit {
  @Input() width;
  @Input() height;
  @Input() backgroundColor;
  @Input() audioTimeColor;
  @Input() audioTitleColor;
  @Input() volumeSliderColor;
  @Input() timeSliderColor;
  @Input() audioList = [];
  @Input() next = true;
  @Input() previous = true;
  @Input() shuffle = true;
  @Input() repeat = true;
  @Input() scrollTitle = false;
  @Input() playButtonColor = "#a2a5a36e";
  @Input() pauseButtonColor = "#a2a5a36e";
  @Input() nextButtonColor = "#a2a5a36e";
  @Input() previousButtonColor = "#a2a5a36e";
  @Input() repeatButtonColor = "rgb(76, 130, 175)";
  @Input() activeRepeatButtonColor = "rgb(76, 130, 175)";
  @Input() volumeButtonColor = "rgb(76, 130, 175)";
  @Input() muteButtonColor = "rgb(76, 130, 175)";
  @Output() nextEvent = new EventEmitter();
  @Output() previousEvent = new EventEmitter();
  @Output() repeatEvent = new EventEmitter();
  @Output() shuffleEvent = new EventEmitter();
  @Output() seekEvent = new EventEmitter();
;
  selectedAudio;
  currentAudioIndex = 0;
  repeatActive = false;
  isError = false;
  isShuffle = false;
  volumeBeforeMute;

  constructor(private musicPlayerService: MusicPlayerService, private songService: SongService) {
    super();

    this.musicPlayerService.commandoSubject.asObservable().subscribe(pc => {
      switch (pc.type) {
        case Keys.musicPlay:
          this.songService.getSongs(pc.playListId).subscribe(r => {
            this.audioList = r.response;
            this.play();
          })
          break;
        case Keys.musicPause:
          this.pause();
          break;
        case Keys.musicNext:
          this.nextAudio();
          break;
        case Keys.musicPrevious:
          this.previousAudio();
          break;
      }
    })
  }

  ngOnInit() {
    this.options();
    this.initiateAudioPlayer();
    //check audio is ended for next song
    this.isAudioEnded.subscribe(data => {
      if (!this.isRepeat && this.audioList.length > 0) {
        this.nextAudio();
      }
    })
  }

  nextAudio() {
    if (this.audioList.length - 1 != this.currentAudioIndex) {
      this.currentAudioIndex += 1;
      this.selectedAudio = this.audioList[this.currentAudioIndex];
      this.getAudioLength();
      if (this.isAudioPlaying) {
        this.play();
      }
      this.nextEvent.emit();
    } else {
      this.pause();
    }
  }

  previousAudio() {
    if (this.currentAudioIndex != 0) {
      this.currentAudioIndex -= 1;
      this.selectedAudio = this.audioList[this.currentAudioIndex];
      this.getAudioLength();
      if (this.isAudioPlaying) {
        this.play();
      }
      this.previousEvent.emit();
    }
  }

  seekAudio(seekAudioValue) {
    if (this.audioVolume != 0) {
      this.isMute = false;
    }
    this.audioPlayer.nativeElement.currentTime = seekAudioValue.target.value;
    this.seekEvent.emit();
  }

  repeatAudio() {
    this.isRepeat = !this.isRepeat;
    this.repeatActive = !this.repeatActive;
    this.audioPlayer.nativeElement.loop = this.isRepeat;
    this.repeatEvent.emit();
  }

  /*   shuffleAudio() {
      this.isShuffle = !this.isShuffle;
      if (this.isShuffle) {
      let randomItem = Math.floor(Math.random() * this.audioList.length);
      console.log(randomItem);
      
      }
      this.shuffleEvent.emit();
    } */

  volumeChange(volume) {
    this.audioPlayer.nativeElement.volume = volume.target.value / 100;
  }

  muteAudio() {
    if (this.isMute) {
      this.audioPlayer.nativeElement.volume = 0.5;
      this.isMute = false;
    } else {
      this.audioPlayer.nativeElement.volume = 0;
      this.isMute = true;
    }
  }

  initiateAudioPlayer() {
    if (this.audioList.length <= 0) {
      this.isError = true;
    } else {
      this.selectedAudio = this.audioList[this.currentAudioIndex];
    }
  }
}