import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Flash } from './flash';
import { FlashService } from './flash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('flashForm', { static: true }) flashForm!: NgForm;
  editing = false;
  editingId!: number;
  flashs!: Flash[];

  flash: Flash = {
    question: '',
    answer: '',
    show: false,
    id: 0,
  };

  flashs$!: Observable<Flash[]>;

  constructor(private flashService: FlashService) {}

  ngOnInit() {
    this.flashs$ = this.flashService.flashs$;
  }

  ngOnDestroy(): void {}

  trackByFlashId(index: number, flash: Flash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    this.flashService.toggleFlash(id);
  }

  handleDelete(id: number) {
    // this.flashs = this.flashs.filter((flash) => flash.id !== id);
    this.flashService.deleteFlash(id);
  }

  handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
    this.flash = this.flashService.getFlash(id);
  }

  handleRememberedChange(flashObj: {
    id: number;
    flag: 'correct' | 'incorrect';
  }) {
    this.flashService.rememberedOnChange(flashObj.id, flashObj.flag);
  }

  handleSubmit() {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  }

  handleClear() {
    this.flash = {
      ...this.flash,
      question: '',
      answer: '',
    };
    this.flashForm.reset();
  }

  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleCancel() {
    this.editing = false;
    this.editingId = 0;
    this.handleClear();
  }
}
