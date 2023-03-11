import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactArray:any;
  constructor(private contactService:ContactService) { }

  ngOnInit() {
    this.contactService.loadData().subscribe(val=>{
      this.contactArray=val;
    })
  }
  onDelete(id){
    this.contactService.deleteData(id);
  }

}
