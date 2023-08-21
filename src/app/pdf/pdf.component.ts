import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfPost } from '../models/pdfpost';
import { PdfService } from './pdf.service';

@Component({
    selector: 'app-pdf',
    templateUrl: './pdf.component.html',
    styleUrls: ['./pdf.component.css']
  })
export class PdfComponent implements OnInit {

  imgSrc: any = './assets/images/bg.jpg';
  selectedImage: any;

  pdfpost: any;
  pdfForm: FormGroup
  docId: string;
  constructor( private fb: FormBuilder,
    private pdfService:PdfService,
    private route: ActivatedRoute,
    private sanitizer:DomSanitizer) {

    this.route.queryParams.subscribe(val => {
      this.docId = val.id;
       if(this.docId){
      this.pdfService.loadOneData(val.id).subscribe(pdfpost => {
        
        this.pdfpost = pdfpost;


        this.pdfForm = this.fb.group({
          title: [this.pdfpost.title, [Validators.required, Validators.minLength(10)]],
          postImg: ['', Validators.required],
        })
        this.imgSrc = this.pdfpost.postPdfPath;
      })
    }else{
      this.pdfForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(10)]],
        postPdf: ['', Validators.required],
      })
    }
    
    })


  }

  ngOnInit() {

  }
  get fc() {
    return this.pdfForm.controls;
  }
  onTitleChanged($event) {
    const title = $event.target.value;
  }
  showPreview($event) {
    const reader = new FileReader();
    reader.onload = event => {
      this.imgSrc=this.sanitizer.bypassSecurityTrustResourceUrl($event.target.result);
     
      // this.imgSrc = event.target.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }
  onSubmit() {
    console.log(this.pdfForm.value);
   
    const postData: PdfPost = {
      title: this.pdfForm.value.title,
      postPdfPath: '',
      createdAt: new Date()
    }
    //  console.log(postData);
    this.pdfService.uploadImage(this.selectedImage, postData);
    this.pdfForm.reset();
    this.imgSrc = './assets/images/bg.jpg';
  }

}

