import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-premium-pdf',
  templateUrl: './premium-pdf.component.html',
  styleUrls: ['./premium-pdf.component.css']
})
export class PremiumPdfComponent implements OnInit {
  pdfPosts$: Observable<any>;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.pdfPosts$ = this.firestore.collection<any>('pdfs').valueChanges();
  }

  trackPdfPosts(index: number, pdfPost: any): string {
    return pdfPost.id; // Replace with your unique identifier for each PDF post
  }

  deletePdf(pdfId: string): void {
    // Implement the delete logic here
    // You can use the AngularFirestore `doc` method to delete the document by ID
    this.firestore.doc('pdfs/' + pdfId).delete().then(() => {
      console.log('PDF deleted successfully.');
    }).catch((error) => {
      console.error('Error deleting PDF:', error);
    });
  }
}
