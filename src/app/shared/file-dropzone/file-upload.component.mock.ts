import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  template: `<div>FileUploadComponentMock</div>`
})
export class FileUploadComponentMock {

  @Input() onlyImages = false;

  @Output() fileSelected = new EventEmitter<string>();
}
