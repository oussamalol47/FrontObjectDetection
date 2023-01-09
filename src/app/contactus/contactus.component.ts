import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Mail } from '../models/mail';
import { MailService } from '../_services/mail.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent implements OnInit {
  public editMail!: Mail;

  constructor(private mailService: MailService) {}

  ngOnInit(): void {}

  public onSendMail(mail: Mail): void {
    this.mailService.addMail(mail).subscribe(
      (response: Mail) => {
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
