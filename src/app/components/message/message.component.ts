import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public message: string;

  @Input() messageString: string;

  constructor() { 

  }

  ngOnInit() {
    this.message = this.messageString;
  }

}
