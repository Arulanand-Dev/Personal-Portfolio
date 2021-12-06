import { Component, OnInit } from '@angular/core';
import Typewriter from 't-writer.js';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const target = document.querySelector('.category');
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 80,
      deleteSpeed: 80,
      typeColor: 'white',
    });

    writer
      .type('.NET – Full Stack developer')
      .rest(1000)
      .changeOps({ deleteSpeed: 60 })
      .remove(27)
      .type('React Js developer')
      .rest(1000)
      .clear()
      .start();
  }
}
