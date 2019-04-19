import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ActivatedRoute } from "@angular/router";
import { QrcodeService } from "../qrcode-list.service";
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Toast } from '@ionic-native/toast/ngx';

declare var $: any;
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit, AfterContentInit {
  info = "";
  constructor(
    private storage: Storage,
    private route: ActivatedRoute,
    public service: QrcodeService,
    private base64ToGallery: Base64ToGallery,
    private toast:Toast,
  ) {}
  ngOnInit(): void {
    this.storage.get("qrcodelist").then(res => {
      if(res != null&&res != ''){
        this.service.list = res
      }
    });
  }
  ngAfterContentInit(): void {
    var param = this.route.snapshot.paramMap.get("info");
    if (param) {
      param = this.decode(param);
      this.info = param;
      setTimeout(()=>{
        $("#qrcode").html("").qrcode({
          text: this.utf16to8(this.info)
        });
      })
    }
  }
  decode(string) {
    var reg = new RegExp(/%2f/, "g");
    return string.replace(reg, "/");
  }
  onClick() {
    $("#qrcode")
      .html("")
      .qrcode({
        // render:'table',
        text: this.utf16to8(this.info)
      });
    this.service.list.push(this.info);
    this.storage.set("qrcodelist", this.service.list).then(() => {});
  }
  save(){
    var picurl = (document.getElementById("qrcode").firstChild as HTMLCanvasElement).toDataURL("image/png");
    this.base64ToGallery.base64ToGallery(picurl, {prefix:'qrcode_',mediaScanner:true}).then(
      res => this.toast.showLongBottom('Save path:'+res).subscribe(toast => {console.log(toast)}),
      err => this.toast.showShortBottom('Error because that'+err).subscribe(toast => {console.log(toast)}),
    );
  }

  utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007f) {
        out += str.charAt(i);
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      }
    }
    return out;
  }
}
