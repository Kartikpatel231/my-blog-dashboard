import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/images/bg.jpg';
  selectedImage: any;

  categories: Array<object>
  post: any;
  postForm: FormGroup
  formStatus: string = 'Add New';
  docId: string;
  constructor(private categoryService: CategoriesService, private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute,
    private sanitizer:DomSanitizer) {

    this.route.queryParams.subscribe(val => {
      this.docId = val.id;
       if(this.docId){
      this.postService.loadOneData(val.id).subscribe(post => {
        
        this.post = post;


        this.postForm = this.fb.group({
          title: [this.post.title, [Validators.required, Validators.minLength(10)]],
          permalink: [this.post.permalink, Validators.required],
          excerpt: [this.post.excerpt, [Validators.required, Validators.minLength(50)]],
          category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
          postImg: ['', Validators.required],
          content: [this.post.content, Validators.required],
        })
        this.imgSrc = this.post.postImgPath;
        this.formStatus = 'Edit';
      })
    }else{
      this.postForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(10)]],
        permalink: ['', Validators.required],
        excerpt: ['', [Validators.required, Validators.minLength(50)]],
        category: ['', Validators.required],
        postImg: ['', Validators.required],
        content: ['', Validators.required],
      })
    }
    
    })


  }

  ngOnInit() {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;

    })
  }
  get fc() {
    return this.postForm.controls;
  }
  onTitleChanged($event) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
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
    console.log(this.postForm.value);
    let splited = this.postForm.value.category.split('-');
    console.log(splited);
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splited[0],
        category: splited[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    //  console.log(postData);
    this.postService.uploadImage(this.selectedImage, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = './assets/images/bg.jpg';
  }

}
