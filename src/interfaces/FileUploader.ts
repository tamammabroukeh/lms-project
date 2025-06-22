import { AxiosRequestConfig } from "axios";

export interface IFiles {
    file?:File;
    preview?: boolean;
	mimeType?: string;
	size?: number;
	uploadId?: string;
	chunkProgressArray?:number[];
	uploadedBytesArray?:number[];
    url?: string;
	name?: string;
	chunkProgressArrayForFile?:number;
    file_name?:string;
}

// export interface UploadProgress {
//   progress: number;
//   uploaded: number;
//   total: number;
//   remainingTime: number;
//   errorMessage?: string | null;
//   isSuccess?: boolean;
// }

export interface IUploadProgress {
  progress: number;
  uploaded: number;
  total: number;
  remainingTime: number;
  errorMessage: string | null;
  isSuccess: boolean;
}
export type UploadId = string;
export type ProgressState = Record<UploadId, IUploadProgress>;
export type AbortControllers = Record<UploadId, AbortController>;
export type PausedFilesRef = React.MutableRefObject<Record<string, boolean>>;
export type ProgressRef = React.MutableRefObject<ProgressState>;

//  export type ProgressState = Record<string, UploadProgress | undefined>;
// export type UploadId = string | number;

// export interface IFile {
//      url: string;
//             file_name: string;
//             mime_type:string;
//         }


// export interface IFileUploader{
//     parentCallback?:(files:IFiles[]) => void;
//     parentCallbackToFillData?:(files:IFiles[]) => void;
//     handleCloseUploadFile?:() => void;
//     typeFile?:string;
//     sizeFile?:number;
//     singleFile?:boolean;
//     placeholder?:string;
//     value?:IFile[];
//     folderId?:string;
//     customAPI? :string;
//     customFormData?:FormData;
//     apiMethod? :string;
//     successCallback?:(data:unknown) => void;
//     showPickFromMyFile?:boolean;
//     showPickFromCourseFile?:boolean;
//     setIsOpenChooseFile?:({}) => void;
//     hideDoneButton?:boolean;
//     hideCancelButton?:boolean;
//     isEnableToDisableCanceling?:boolean;
// }
export interface IFileUploader {
  parentCallback?: (files: IFile[]) => void;
  parentCallbackToFillData?: (files: IFile[]) => void;
  handleCloseUploadFile?: () => void;
  typeFile?: string;
  sizeFile?: number;
  singleFile?: boolean;
  placeholder?: string;
  value?: Array<{
    url: string;
    file_name: string;
    mime_type: string;
  }>;
  folderId?: string;
  customAPI?: string;
  customFormData?: FormData;
  apiMethod?: AxiosRequestConfig["method"];
  successCallback?: (response: any) => void;
  showPickFromMyFile?: boolean;
  showPickFromCourseFile?: boolean;
  setIsOpenChooseFile?: (state: { type: string; isOpen: boolean }) => void;
  hideDoneButton?: boolean;
  hideCancelButton?: boolean;
  isEnableToDisableCanceling?: boolean;
}




// files list
// export interface IFilesList {
//     files:IFiles[];
//     pausedFiles:Record<string, boolean>;
//     progress:ProgressState;
//     removeFile:(uploadId: string) => void;
//     pauseFile:(uploadId: string) => void;
//     resumeFile:(uploadId: string) => void
// }
// Props for FilesList component
export interface IFilesList {
  files: IFile[];
  pausedFiles: Record<string, boolean>;
  progress: ProgressState;
  removeFile: (uploadId: UploadId) => void;
  pauseFile: (uploadId: UploadId) => void;
  resumeFile: (uploadId: UploadId) => void;
}

export interface IFile {
  url?: string;
  name?: string;
  mimeType?: string;
  size?: number;
  file?: File;  
  isImage?: boolean;  // Add this instead of preview
//   preview?: string | null;  // Should be string or null, not boolean
  uploadId?: string;
  chunkProgressArray?: number[];
  uploadedBytesArray?: number[];
}

// State types for FileUploader
export interface IFileUploaderState {
  files: IFile[];
  progress: ProgressState;
  abortControllers: AbortControllers;
  filesFromBackend: IFile[];
}

// Ref types for FileUploader
export interface IFileUploaderRefs {
  pausedFilesRef: PausedFilesRef;
  progressRef: ProgressRef;
}