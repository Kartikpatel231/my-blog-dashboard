import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { map, distinct } from 'rxjs/operators';

export interface ChatMessage {
  id?: string;
  sender: string;
  message: string;
  timestamp: firebase.firestore.Timestamp;
  admin: string;
  reply: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  constructor(private firestore: AngularFirestore) {}

  getChatUserIds(): Observable<string[]> {
    const parentIds$ = this.firestore.collection('messages').snapshotChanges().pipe(
      map((actions) => {
        const parentIdsSet = new Set<string>();
        actions.forEach((action) => {
          const parentId = action.payload.doc.id;
          parentIdsSet.add(parentId);
        });
        return Array.from(parentIdsSet);
      })
    );

    const childIds$ = this.firestore.collectionGroup<ChatMessage>('userChat').snapshotChanges().pipe(
      map((actions: DocumentChangeAction<ChatMessage>[]) => {
        const childIdsSet = new Set<string>();
        actions.forEach((action) => {
          const parentDoc = action.payload.doc.ref.parent;
          if (parentDoc) {
            const grandParentDoc = parentDoc.parent;
            if (grandParentDoc) {
              const childId = grandParentDoc.id;
              childIdsSet.add(childId);
            }
          }
        });
        return Array.from(childIdsSet);
      })
    );

    return combineLatest([parentIds$, childIds$]).pipe(
      map(([parentIds, childIds]) => {
        return [...parentIds, ...childIds];
      }),
      distinct() // Get unique IDs
    );
  }

  getUserData(userId: string): Observable<ChatMessage[]> {
    const parentCollection = this.firestore.collection<ChatMessage>('messages').doc(userId).collection<ChatMessage>('userChat');
    const childCollection = this.firestore.collectionGroup<ChatMessage>('userChat', ref => ref.where('sender', '==', userId));
    
    return combineLatest([parentCollection.valueChanges(), childCollection.valueChanges()]).pipe(
      map(([parentData, childData]) => {
        return [...parentData, ...childData];
      })
    );
  }
}
