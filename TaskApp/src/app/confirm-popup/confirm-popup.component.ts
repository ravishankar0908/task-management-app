import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmPopupComponent>) {}
  readonly data = inject<any>(MAT_DIALOG_DATA);
  confirmed() {
    this.dialogRef.close(true);
  }
}
