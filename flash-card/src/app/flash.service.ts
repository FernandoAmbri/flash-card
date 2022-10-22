import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flash } from './flash';

@Injectable({
  providedIn: 'root',
})
export class FlashService {
  flashs: Flash[] = [
    {
      question: 'Question 1',
      answer: 'Answer 1',
      show: false,
      id: this.getRandomNumber(),
    },
    {
      question: 'Question 2',
      answer: 'Answer 2',
      show: false,
      id: this.getRandomNumber(),
    },
    {
      question: 'Question 3',
      answer: 'Answer 3',
      show: false,
      id: this.getRandomNumber(),
    },
  ];

  flashs$ = new BehaviorSubject<Flash[]>(this.flashs);

  constructor() {}

  getRandomNumber() {
    return Math.floor(Math.random() * 10000);
  }

  addFlash(flash: Flash) {
    this.flashs = [
      ...this.flashs,
      {
        ...flash,
        show: false,
        id: this.getRandomNumber(),
      },
    ];
    this.flashs$.next(this.flashs);
  }

  toggleFlash(id: number) {
    const index = this.flashs.findIndex((flash) => flash.id === id)!;
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        show: !this.flashs[index].show,
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

  deleteFlash(id: number) {
    const index = this.flashs.findIndex((flash) => flash.id === id)!;
    this.flashs = [
      ...this.flashs.slice(0, index),
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

  rememberedOnChange(id: number, flag: 'correct' | 'incorrect') {
    const index = this.flashs.findIndex((flash) => flash.id === id)!;
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        remembered: flag,
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);
  }

  updateFlash(id: number, flash: Flash) {
    const index = this.flashs.findIndex((flash) => flash.id === id)!;
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        ...flash,
      },
      ...this.flashs.slice(index + 1),
    ];

    this.flashs$.next(this.flashs);
  }

  getFlash(id: number): Flash {
    const flash = this.flashs.find((flash) => flash.id === id)!;
    return flash;
  }
}
