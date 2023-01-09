import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Objet } from '../models/object';
import { Piece } from '../models/piece';
import { PieceService } from '../_services/piece.service';
import { PieceobjectService } from '../_services/pieceobject.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public pieces!: Piece[];
  public objets!: Objet[];
  public showPiece!: Piece;
  dangerousVideoUrl!: string;
  videoUrl!: SafeResourceUrl;
  url: any;
  safeURL: SafeResourceUrl;

  constructor(
    private pieceService: PieceService,
    private pieceobjectService: PieceobjectService,
    private sanitizer: DomSanitizer
  ) {
    let videoURL = 'https://www.youtube.com/watch?v=dLWN4Uxg_oE';
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }

  ngOnInit(): void {
    this.getPieces();
  }
  public getPieces(): void {
    this.pieceService.getPieces().subscribe(
      (response: Piece[]) => {
        this.pieces = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //Our function:
  public findObjectsByIdPiece(pieceId: number): void {
    this.objets = [];
    this.pieceobjectService.findObjectsByIdPiece(pieceId).subscribe(
      (response1: Objet[]) => {
        this.objets = response1;
        console.log(response1);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.objets = [];
  }

  public onOpenModal(piece: Piece): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    /*(see https://g.co/ng/security#xss)*/

    // Always define scheme, host and path separator
    const host = 'https://www.youtube.com/embed/';

    // Additional check to ensure the URL is safe to use
    this.url = host + 'Hrt8A702Jag';

    // Mark the URL safe to use in a resource URL context

    this.showPiece = piece;

    button.setAttribute('data-target', '#showPieceModal');

    container?.appendChild(button);
    button.click();
  }

  // ngOnInit(): void {
  //   // this.userService.getPublicContent().subscribe(
  //   //   data => {
  //   //     this.content = data;
  //   //   },
  //   //   err => {
  //   //     this.content = JSON.parse(err.error).message;
  //   //   }
  //   // );

  // }
}
