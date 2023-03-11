import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {map} from 'rxjs/operators';
const baseURL='http://localhost:8080/category/data';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  constructor(private afs:AngularFirestore,private http:HttpClient,private toastr:ToastrService) { }
  saveData(data){
    this.afs.collection('categories').add(data).then(docRef=>{
      console.log(docRef);
      this.toastr.success('Data Insert Successfully');

    })

    .catch(err=>{console.log(err)});
  }
  saveDataInSpring(data):Observable<any>{
        return this.http.post(baseURL,data);
  }
  loadData(){
  return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions =>{
       return actions.map(a=>{
          const data=a.payload.doc.data();
          const id=a.payload.doc.id;
          return {id,data}
        })
      })
    )
  }
  updateData(id,EditData){
    this.afs.doc(`categories/${id}`).update(EditData).then(docRef=>{
      this.toastr.success('Data Update Successfully');

    })
  }
  deleteData(id){
    this.afs.collection('categories').doc(id).delete().then(docRef=>{
      this.toastr.success('Data Delete Successfully');

    })
  }
}
