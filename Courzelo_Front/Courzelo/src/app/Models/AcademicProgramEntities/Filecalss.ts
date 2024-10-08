import { Course } from "./Course";

export class Filecalss {
    id!: string;
    fileName!: string;
    fileType!: string;
    data: Uint8Array;
    course!: Course; 
  
    constructor(fileName: string, fileType: string, data: Uint8Array) {
      this.fileName = fileName;
      this.fileType = fileType;
      this.data = data;
    }
  }