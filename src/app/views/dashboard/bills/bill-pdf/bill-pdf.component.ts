import { Component, Input, ViewChild, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Bills } from '../../../../interfaces/bills';
import { Clients } from '../../../../interfaces/clients';
import { Users } from '../../../../interfaces/users';
import { Items } from '../../../../interfaces/items';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-bill-pdf',
  templateUrl: './bill-pdf.component.html',
  styleUrls: ['./bill-pdf.component.scss']
})
export class BillPdfComponent implements AfterViewInit {
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;
  @Input('billItems') billItems: Items;
  @Input('billData') billData: Bills;
  @Input('clientData') clientData: Clients;
  @Input('userData') userData: Users;
  @Input('totalPerPrice') totalPerPrice;
  @Input('totalPrices') totalPrices;
  @Output() cerrarPdf = new EventEmitter<any>();
  constructor() {}

  ngAfterViewInit(): void {
    
    /* const DATA = document.getElementById('pdfTable');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');      
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      this.cerrarPdf.emit(false);
    }); */
  }
  getSumTotals() {
    Object.keys(this.billItems).forEach((i, el) => {
      const currentTotalPrice: number = this.billItems[i].amount * this.billItems[i].pricePer;
      this.totalPrices = this.totalPrices + currentTotalPrice;
      this.totalPerPrice = this.totalPerPrice + this.billItems[i].pricePer;
    });
  }
}