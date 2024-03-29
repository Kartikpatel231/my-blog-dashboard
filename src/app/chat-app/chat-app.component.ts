import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { ChatServiceService, ChatMessage } from './chat-service.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit {
  @ViewChild('users', { static: true }) usersAutocomplete: MatAutocomplete;

  currentUser: firebase.User | null = null;
  allUserIds: string[] = [];
  userData: ChatMessage[] = [];
  selectedUserId: string | null = null;
  newMessage: string;
  allUserData: ChatMessage[]=[];

  constructor(private authService: AuthService, private chatService: ChatServiceService) {}
  selectUser(userId: string) {
    this.selectedUserId = userId;
  }
  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      if (loggedIn) {
        this.authService.getCurrentUser().subscribe((user) => {
          this.currentUser = user;
          this.chatService.getChatUserIds().subscribe((userIds: string[]) => {
            this.allUserIds = userIds;
            userIds.forEach(userId => {
              this.chatService.getSenderName(userId).subscribe((senderName: string) => {
                this.allUserData.push({
                  id: userId,
                  sender: senderName,
                  message: '',
                  timestamp: null,
                  admin: '',
                  reply: ''
                });
              });
          });
        });
        });
      } else {
        this.currentUser = null;
        this.allUserIds = [];
        this.allUserData = [];
      }
    });
  }

  viewUserChat(userId: string) {
    this.selectedUserId = userId;
    this.chatService.getUserData(userId).subscribe((userData: ChatMessage[]) => {
      this.userData = userData;
    });
  }

  isCurrentUser(sender: string): boolean {
    return this.currentUser ? sender === this.currentUser.displayName || sender === this.currentUser.email : false;
  }

  addChat() {
    if (this.newMessage && this.selectedUserId) {
      const sender ='Admin';
      const replyTo = this.userData.length > 0 ? this.userData[0].id : undefined;
      this.chatService.addChat(this.newMessage, sender, this.selectedUserId, replyTo);
      this.newMessage = ''; // Clear the input field after sending the message
    }
  }
}
