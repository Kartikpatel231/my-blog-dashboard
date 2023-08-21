import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import * as firebase from 'firebase';
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
 
  getSenderName(userId: string): Observable<string> {
    // Fetch sender name from the first message of the user
    return this.firestore.collection('messages').doc(userId).collection<ChatMessage>('userChat', ref => ref.limit(1)).valueChanges().pipe(
      map(userData => userData.length > 0 ? userData[0].sender : 'Unknown')
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
  addChat(newMessage: string, sender: string, userId: string, replyTo?: string): Promise<void> {
    const message: ChatMessage = {
      sender: sender,
      message: newMessage,
      timestamp: firebase.firestore.Timestamp.now(),
      admin: 'admin',
      reply: replyTo || ''
    };

    if (replyTo) {
      // Add a reply message to a specific user's chat
      return this.firestore
        .collection('messages')
        .doc(userId)
        .collection('userChat')
        .add(message)
        .then(() => console.log('Reply added successfully!'))
        .catch((error) => console.error('Error adding reply:', error));
    } else {
      // Add a new message to a specific user's chat
      return this.firestore
        .collection('messages')
        .doc(userId)
        .collection('userChat')
        .add(message)
        .then(() => console.log('Message added successfully!'))
        .catch((error) => console.error('Error adding message:', error));
    }
  }
}
