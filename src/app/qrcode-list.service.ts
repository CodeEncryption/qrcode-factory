import { Injectable } from '@angular/core';
import { Qrcode } from './qrcode';

@Injectable()
export class QrcodeService {
  list:string[] = [];
  info:string='';
}