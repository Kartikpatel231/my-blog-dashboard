import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
 categoryArray:Array<object>;
 formCategory:string;
 formStatus:string='Add';
 categoryId:string;
  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe( val=> {
      console.log(val);
      this.categoryArray=val;
    })
  }
  onSubmit(formData) {
    let categoryData: Category = {
      category: formData.value.category
    }
    if(this.formStatus=='Add'){
      this.categoryService.saveData(categoryData);
      formData.reset();
    }
    //console.log(categoryData);
     else if(this.formStatus=='Edit'){
      this.categoryService.updateData(this.categoryId,categoryData);
      formData.reset();
      this.formStatus='Add';
     }
    let springCategoryData: Category = {
      category: formData.value.category
    }
    this.categoryService.saveDataInSpring(springCategoryData);
  }


onEdit(category,id){
  this.formCategory=category;
  console.log(category);
  this.formStatus='Edit';
  this.categoryId=id;
}

onDelete(id){
this.categoryService.deleteData(id);
}
}
