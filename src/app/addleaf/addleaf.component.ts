import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';
import {Router} from '@angular/router';
import { User } from '../user';
import { FormGroup, NgForm } from '@angular/forms';
//import { Variable } from '@angular/compiler/src/render3/r3_ast';

var baseData = "";
const  maxsize=30*1024*1024; //in MegaBytes
var totalsize=0;


@Component({
  selector: 'app-addleaf',
  templateUrl: './addleaf.component.html',
  styleUrls: ['./addleaf.component.scss']
})
export class AddleafComponent implements OnInit {
  sendres:any
  srcData:any
  fileToUpload: any=[];
  plantName:any
  userModel=new User('','','');
  login_flag:any;
 //msg:string=''

  constructor(private httpClient:HttpClientService, private router:Router) { 
    
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    console.log(event);
    for(var i=0; i<event.target.files.length; i++){
      console.log(typeof event.target.files[i].type)
      console.log(event.target.files[i].type)
      if(event.target.files[i].type=='image/jpeg'||event.target.files[i].type=='image/png'||event.target.files[i].type=='image/jpg')
        this.fileToUpload.push(event.target.files[i]);
    }
    console.log(this.fileToUpload);
  }
  /*onChangetext() {
      var x=<HTMLInputElement>document.getElementById('plant');
      this.plantName=x.value;
      console.log(this.plantName);
  }*/
  
  onsubmit()
  {
    this.httpClient.checksignin().subscribe(
      res=>{
        this.login_flag=res
        console.log(this.login_flag);
        this.check() 
    });
  }

  check()
  {
    if(this.login_flag)
      this.upload();
    else
    this.router.navigate(['login']);
  }

  async upload()
  {
    for(var i=0;i<this.fileToUpload.length;i++)
    {
     totalsize+=this.fileToUpload[i].size;
    }

    if(this.fileToUpload.length>0 && this.fileToUpload.length<=10 && totalsize<=maxsize){
      this.httpClient.sendimgname([this.plantName, this.fileToUpload.length]).subscribe(
        res=>{
          
        }) 
      await new Promise(resolve=>setTimeout(resolve,250));   
      this.httpClient.sendfiledata(this.userModel).subscribe(
        res=>{
        })
      await new Promise(resolve=>setTimeout(resolve,250));   
      for(var i=0;i<this.fileToUpload.length;i++){
          this.httpClient.sendimagedata(this.fileToUpload[i]).subscribe(
          res=>{
            this.sendres=res; 
          })
          await new Promise(resolve=>setTimeout(resolve,250));
          console.log(i);
        }
        await new Promise(resolve=>setTimeout(resolve,250));
        console.log('sendres');
        alert(this.sendres);
        window.location.reload();
  }
  else{
    window.location.reload();
    alert("Check image size,type and quantity");
    console.log(totalsize);

  }
}
}


