import { Component } from '@angular/core';
import { QrcodeService } from "../qrcode-list.service";
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
  list:any[];
  constructor(private storage:Storage, public service:QrcodeService){}
  ngOnInit(): void {
    this.loadList();
  }
  loadList(){
    this.storage.get('qrcodelist').then(res=>{
      this.service.list=res;
    })
  }
  clear() {
    this.storage.clear().then(() => {
      console.log("clear...");
    });
    this.service.list=[];
  }
}
