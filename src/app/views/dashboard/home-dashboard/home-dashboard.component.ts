import { Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Bills } from '../../../interfaces/bills';
import { BillsService } from '../../../services/bills/bills.service';
import { Clients } from '../../../interfaces/clients';
import { ClientsService } from '../../../services/clients/clients.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective) private dtElement;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  arrBills: Bills[] = [];
  arrClients: Clients[] = [];
  loading = true;
  constructor(
    private bills: BillsService,
    private clients: ClientsService
  ) { }

  ngAfterViewInit(): void {
    this.dtOptions = {
      pagingType: 'simple',
      pageLength: 10,
      dom: "Bfrtip"
    };
    this.getLastTenBills();
    this.getLastTenClients();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();  
    });
  }

  getLastTenBills() {
    this.bills.getBills().subscribe(
      (data) => {
        this.arrBills = data;
        if (data.length > 10) {
          this.arrBills = data.slice(0, 10);
        }
        this.dtTrigger.next();
        this.loading = false;
      }
    )
  }
  
  getLastTenClients() {
    this.clients.getClients().subscribe(
      (data) => {
        this.arrClients = data;
        if (data.length > 10) {
          this.arrClients = data.slice(0, 10);
        }
        this.dtTrigger.next();
        this.loading = false;
      }
    )
  }
}
