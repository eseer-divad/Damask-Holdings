// header.component.ts

import { Component } from '@angular/core';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public isHelpModalVisible: boolean = false;

  openHelpModal(): void {
    this.isHelpModalVisible = true;
  }

  closeHelpModal(): void {
    this.isHelpModalVisible = false;
  }

  getRandomImage(): string {
    const imageNames = ['hd-image1.jpeg', 'hd-image2.jpeg', 'hd-image3.jpeg', 'hd-image4.jpeg', 'hd-image5.jpeg', 'hd-image6.jpeg', 'hd-image7.jpeg', 'hd-image8.jpeg'];
    const randomIndex = Math.floor(Math.random() * imageNames.length);
    return `assets/${imageNames[randomIndex]}`;
  }
}
