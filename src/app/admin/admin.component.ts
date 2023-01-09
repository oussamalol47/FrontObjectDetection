import { HttpErrorResponse } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { element } from 'protractor';
import Swal from 'sweetalert2';
import { Objet } from '../models/object';
import { Piece } from '../models/piece';
import { PieceService } from '../_services/piece.service';
import { PieceobjectService } from '../_services/pieceobject.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public pieces!: Piece[];
  public objets!: Objet[];
  public objetsReference!: Objet[];
  public showPiece!: Piece;
  public editPiece!: Piece;
  public deletePiece!: Piece;
  dangerousVideoUrl!: string;
  videoUrl!: SafeResourceUrl;
  myAlert!: any;

  constructor(
    private pieceService: PieceService,
    private pieceobjectService: PieceobjectService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getPieces();
  }

  public getPieces(): void {
    this.pieceService.getPieces().subscribe(
      (response: Piece[]) => {
        this.pieces = response;
        // console.log(this.pieces[0]);
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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.objets = [];
  }

  //our function 1:
  public findObjectsByIdPieceReference(pieceId: number): void {
    this.objets = [];
    this.pieceobjectService.findObjectsByIdPiece(pieceId).subscribe(
      (response1: Objet[]) => {
        this.objetsReference = response1;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.objets = [];
  }

  //our function 2:
  public compare2(pieceId: number): void {
    this.objets = [];
    this.pieceobjectService.comparePiece(pieceId).subscribe(
      (response: Map<String, number>) => {
        setTimeout(() => {
          for (const entry of Object.entries(response)) {
            // console.log(entry[0] + ' => ' + entry[1]);
            this.myAlert = Swal.fire(entry[0] + ' => ' + entry[1]);
          }
        }, 500);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.objets = [];
  }

  public onUpdatePiece(piece: Piece): void {
    this.pieceService.updatePiece(piece).subscribe(
      (response: Piece) => {
        console.log(response);
        this.getPieces();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePiece(pieceId: number): void {
    this.pieceService.deletePiece(pieceId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPieces();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(piece: Piece, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    //(see https://g.co/ng/security#xss)
    this.dangerousVideoUrl = piece.pathPiece;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.dangerousVideoUrl
    );

    if (mode === 'show') {
      this.showPiece = piece;
      button.setAttribute('data-target', '#showPieceModal');
    }
    if (mode === 'edit') {
      this.editPiece = piece;
      button.setAttribute('data-target', '#updatePieceModal');
    }
    if (mode === 'delete') {
      this.deletePiece = piece;
      button.setAttribute('data-target', '#deletePieceModal');
    }

    container?.appendChild(button);
    button.click();
  }

  compare(piece: Piece) {}
}
