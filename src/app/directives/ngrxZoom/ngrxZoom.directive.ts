import {
  Directive,
  ElementRef,
  AfterViewChecked,
  Input,
  HostListener,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Renderer2,
  Inject
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Directive({
  selector: '[appNgrxZoom]'
})
export class AppNgrxZoomDirective implements OnInit, OnDestroy {
  @Input() atCalcHeight: string;

  public mousemove = new Subject<MouseEvent>();
  private subscription: Subscription;
  private figureEl: ElementRef;

  constructor(
    @Inject(ElementRef) private el: ElementRef,
    @Inject(Renderer2) private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.figureEl = this.el.nativeElement;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): any {
    this.mousemove.next(event);
    this.mousemove.map(this.zoom(event)).subscribe(e => {
      this.setBackgroundImage(this.figureEl, this.figureEl['children'][0].src);
      this.changeBackgroundPosition(this.figureEl, event);
    });
  }

  changeBackgroundPosition(el, event) {
    this.renderer.setStyle(el, 'backgroundPosition', `${event.x}% ${event.y}%`);
  }

  setBackgroundImage(el, imageUrl) {
    this.renderer.setStyle(el, 'backgroundImage', `url(${imageUrl})`);
  }

  zoom(figure) {
    return e => {
      let offsetX, offsetY, x, y;

      offsetX = e.offsetX;
      offsetY = e.offsetY;

      x = offsetX / figure.offsetWidth * 100;
      y = offsetY / figure.offsetHeight * 100;

      return { x, y };
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
