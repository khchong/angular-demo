import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() onlyImages = false;
  @Output() fileSelected = new EventEmitter<string>();

  isHovering: boolean;

  selectedFileDataUrl: string | ArrayBuffer;
  private selectedFileEvent: FileList;

  setSelectedFile(event: FileList) {
    const file = event.item(0);

    if (this.onlyImages && file.type.split('/')[0] !== 'image') {
      window.alert('Not an Image file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      this.selectedFileEvent = Object.assign({}, event);
      this.selectedFileDataUrl = reader.result;
      this.fileSelected.emit(reader.result as string);
    };
    reader.readAsDataURL(event.item(0));
  }

  toggleHover(hovered: boolean) {
    this.isHovering = hovered;
  }
}
