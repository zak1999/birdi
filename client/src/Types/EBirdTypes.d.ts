export interface EBird {
  comName: string;
  howMany: number;
  id: number;
  lat: number;
  lng: number;
  locId: string;
  locName: string;
  locationPrivate: boolean;
  obsDt: string;
  obsReviewed: boolean;
  obsValid: boolean;
  sciName: string;
  speciesCode: string;
  subId: string;
  geometry?: number[];
}

export interface FileUpload extends Blob{
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}