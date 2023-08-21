import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router) { }
  uploadImage(selectedImage, postData) {
    const filePath = `postPDF/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post Pdf uploaded successfully');
      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postPdfPath = URL;
        console.log(postData);
       // this.afs.collection('posts').add(postData).then(docRef => {
         // this.toastr.success('Data Insert Successfully');
          //this.router.navigate(['/posts']);
       // })
            this.saveData(postData);
      })
    })
  }
  saveData(postData){
    this.afs.collection('pdfs').add(postData).then(docRef=>{
      this.toastr.success('Data Insert Successfully');
      this.router.navigate(['/posts']);
    })
  }

  loadData() {
    return this.afs.collection('pdfs').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  loadOneData(id) {
    return this.afs.doc(`pdfs/${id}`).valueChanges();

  }

  deletePdf(pdfId) {
    this.afs.doc(`pdfs/${pdfId}`).delete().then(() => {
      this.toastr.success('PDF deleted successfully');
    }).catch(error => {
      console.error('Error deleting PDF:', error);
    });
  }

  updatePdf(pdfId, updatedData) {
    this.afs.doc(`pdfs/${pdfId}`).update(updatedData).then(() => {
      this.toastr.success('PDF updated successfully');
      this.router.navigate(['/posts']);
    }).catch(error => {
      console.error('Error updating PDF:', error);
    });
  }  
 
 
}
