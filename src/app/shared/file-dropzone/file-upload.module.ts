import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropzoneDirective } from './file-dropzone.directive';
import { FileUploadComponent } from './file-upload.component';

@NgModule({
  declarations: [
    FileDropzoneDirective,
    FileUploadComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
