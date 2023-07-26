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

  constructor(private authService: AuthService, private chatService: ChatServiceService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      if (loggedIn) {
        this.authService.getCurrentUser().subscribe((user) => {
          this.currentUser = user;
          this.chatService.getChatUserIds().subscribe((userIds: string[]) => {
            this.allUserIds = userIds;
          });
        });
      } else {
        this.currentUser = null;
        this.allUserIds = [];
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

  addChat(newMessage: string, sender: string) {
    // Add the logic to send a new chat message
  }
}
