import { Component, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ngrx-image-zoom',
  styleUrls: ['ngrxImageZoom.scss'],
  template: `
  <figure appNgrxZoom>
    <img [src]="safeImage" alt="zoom" />
  </figure>
  `
})
export class AppNgrxImageZoomComponent implements OnInit {
  @Input() urlSrc: string;

  safeImage: any;

  constructor(
    @Inject(DomSanitizer) private domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.safeImage = this.domSanitizer.bypassSecurityTrustUrl(this.urlSrc);
  }

}
