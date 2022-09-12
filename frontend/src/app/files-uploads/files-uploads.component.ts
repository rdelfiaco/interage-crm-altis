import { Usuario } from './../login/usuario';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { BancoDados } from '../shared/services/bancoDados';
import { ToastService,  UploadFile, UploadInput, UploadOutput,  humanizeBytes } from 'ng-uikit-pro-standard';
import { LocalStorage } from '../shared/services/localStorage';

@Component({
  selector: 'app-files-uploads',
  templateUrl: './files-uploads.component.html',
  styleUrls: ['./files-uploads.component.scss']
})
export class FilesUploadsComponent implements OnInit {

  @Input() fileType: string;
  @Input() IdDirectory: string;

  fileTable: Array<any>;

  _files: Set<File>;
  pathUpload: string; 

  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
 // options: UploaderOptions
  usuarioLogado: Usuario

  constructor( 
    private bancoDados: BancoDados = new BancoDados,
    private toastrService: ToastService,
    private localStorage: LocalStorage,
  ) { 

    // this.options = {
    //   concurrency: 1,
    //   maxUploads: 2,
    //   allowedContentTypes: ['text/plain']
    // };
    this.usuarioLogado = this.localStorage.getLocalStorage('usuarioLogado') as Usuario; 

    this.files = [];
    this._files = new Set();
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i ++) {
      files += this.files[i].name;
       if (!(this.files.length - 1 === i)) {
         files += ', ';
      }
    }
    return files;
 }

  startUpload(): void {

    const event: UploadInput = {
    type: 'uploadAll',
    url: 'http://localhost:3010/postFiles',
    method: 'POST',
    data: { foo: 'bar' },
    headers: {
        id_usuario: this.usuarioLogado.id.toString(),
        token: this.usuarioLogado.token,
        pathfile: this.pathUpload
     }
    };
    
    this.files = [];
    this.uploadInput.emit(event);

    this.ngOnInit()

  };

cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
}

onUploadOutput(output: UploadOutput | any): void {
    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    this.showFiles();
}

  async ngOnInit() {

    this.pathUpload = !this.IdDirectory ?  this.fileType + '/' :  this.fileType + '/' +  this.IdDirectory + '/'

    let resp = await this.bancoDados.lerDados('getFiles',{ path: this.fileType }) as any;
    if(!resp || resp.error) 
     {
      this.toastrService.error('Erro ao ler arquivos ');
      return;
    }
    console.log(resp)
    this.fileTable = resp.resposta.files;
    return;
  }






}
