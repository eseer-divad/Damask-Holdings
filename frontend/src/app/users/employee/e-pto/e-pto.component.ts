import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoginSService } from 'src/app/login/loginService/login-s.service';
import { ReqPTOService } from './PTOservices/RequestPTO/req-pto.service';
import { ElementRef } from '@angular/core';
import { PopupModalComponent } from 'src/app/boilerplates/popup-modal/popup-modal.component';
import { map } from 'rxjs/operators';
import { PTOValService } from './PTOservices/getPTOval/ptoval.service';
import { ViewRequestsService } from './PTOservices/viewRequests/view-requests.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';
import { generate } from 'rxjs';
import { DeleteReqService } from './PTOservices/deletePTOrequest/delete-req.service';

export interface deleteArgs{
  id: string,
  date: string
};

export interface reqArgs{
  id: string,
  date: string,
  status: string
}

@Component({
  selector: 'app-e-pto',
  templateUrl: './e-pto.component.html',
  styleUrls: ['./e-pto.component.css'],
  template:`
          <button (click)="openModal()">Open Modal</button>
          <app-popup-modal></app-popup-modal>
          `
})

export class EPtoComponent implements OnInit{
  //These Declare variables are seperate because they are for handling display
  //elements on the DOM and input collection for HTTP Responses
userInfo: any;
displayReqs: any[] = [];
deleteDisplayReqs: any[] =[];
ReqDate!: FormGroup;
currPTO!: number;
private delTimeOut = false;

constructor(private elementRef: ElementRef, private loginService: LoginSService,
            private PTO_val: PTOValService, private reqPTO: ReqPTOService,
            private viewReqs: ViewRequestsService, private delReq: DeleteReqService){
    this.ReqDate = new FormGroup({
    date: new FormControl('')
  });
  };

    //Variables declared for use between multiple functions
  userID!: any;
  currReqs!: any;
  reqid!: string;
  DelSearchRes: deleteArgs[] = [];
  ReqSearchRes: reqArgs[] = [];

  get request(): { [key: string]: AbstractControl } {
    return this.ReqDate.controls;
  }

  //on load function
  ngOnInit(): void{
    const currentUserString = localStorage.getItem('userID');

    if (currentUserString) {
      const currentUser = JSON.parse(currentUserString);
      this.userInfo = {
        userID: currentUser.userID,
        isAdmin: currentUser.isAdmin,
        firstname: currentUser.firstname,
        middlename: currentUser.middlename,
        lastname: currentUser.lastname,
        dob: currentUser.dob,
        routingnum: currentUser.routingnum,
        accountnum: currentUser.accountnum,
        streetaddress: currentUser.streetaddress,
        state: currentUser.state,
        zipcode: currentUser.zipcode,
        token: currentUser.token
      };
    } else {
      // for debugging
      console.log(currentUserString)
      console.error('No valid user information found.');
    }

    this.userID = this.userInfo.userID;
    this.PTO_val.getPTO(this.userInfo.userID).subscribe(
      response =>{
        this.currPTO = response.PTO;
      }
    )
    this.returnCurrentRequests()
  }
  //Modal DOM element listeners
  @ViewChild('modal1') modal1!: PopupModalComponent;
  @ViewChild('modal2') modal2!: PopupModalComponent;
  @ViewChild('modal3') modal3!: PopupModalComponent;
  @ViewChild('modal4') modal4!: PopupModalComponent;
  //Deletion DOM element Listeners
  @ViewChild('delSearchOpts') delSearchOpts!:ElementRef;
  @ViewChild('delSearchFields') delSearchFields!: ElementRef;
  @ViewChild('dDropDown') dDropDown!: ElementRef;
  //Search sort DOM element Listeners
  @ViewChild('idInput') idInput!: ElementRef;
  @ViewChild('reqSearchOpts') reqSearchopts!: ElementRef;
  @ViewChild('reqSearchFields') reqSearchFields!: ElementRef;
  @ViewChild('sortDropDown') sortDropDown!: ElementRef;
  @ViewChild('statDropDown') statDropDown!: ElementRef;
  @ViewChild('reqIdInput') reqIdInput!: ElementRef;

  //API call to return all requests for this user and format them
  returnCurrentRequests(){
    this.currReqs = [];
    this.viewReqs.getReqs(this.userInfo.userID).subscribe(
      response =>{
        this.currReqs = response;
        this.currReqs.forEach((element: any) => {
          if (element.status == "None"){
            element.status = "Pending";
          }
          else if (element.status == "False"){
            element.status = "Denied";
          }
          else if (element.status == "True"){
            element.status = "Approved";
          }
          element.id = "..." + (element.id.toString()).substr(50, 14)
        });
        this.GenReturnPTOreqViews(this.currReqs);
        this.FormatDeleteLists(this.currReqs);
      }
    )
  }

  //handles the delete modals expanded search tab
  expandDelSearchOps(){
    this.delSearchOpts.nativeElement.style.height = '28%';
    if(!this.delTimeOut){
      setTimeout(() => {
      this.delSearchFields.nativeElement.style.display = 'block';
      this.delTimeOut = true;
      }, 150);
    }
  }

  //handles requests modals expanded search tab
  expandreqSearchOps(){
    this.reqSearchopts.nativeElement.style.height = '38%';
    if(!this.delTimeOut){
      setTimeout(() => {
      this.reqSearchFields.nativeElement.style.display = 'block';
      this.delTimeOut = true;
      }, 150);
    }
  }

  //also handles the delete modal's expanded search tab and
  //refromats the returned results based on search params
  minimizeDelSearchOps(){
    this.delSearchOpts.nativeElement.style.height = '6%';
    this.delSearchFields.nativeElement.style.display = 'none';
    this.formatDelOptsWithSearchParams()
    this.delTimeOut = false;
  }

  minimizeReqSearchOps(){
    this.reqSearchopts.nativeElement.style.height = '6%';
    this.reqSearchFields.nativeElement.style.display = 'none';
    this.FormatReqWithSearchParams()
    this.delTimeOut = false;
  }

  //handles the return of results in the delete modal based on search params
  formatDelOptsWithSearchParams(){
    const dropdownValue = (this.dDropDown.nativeElement as HTMLSelectElement).value;
    const idInput = (this.idInput.nativeElement as HTMLSelectElement).value;
    this.currReqs.forEach((element:any) => {
      if((element.status == "Pending")){
          if (element.id.includes(idInput)){
            this.DelSearchRes.push(element)
          }
      }
    });
    if(dropdownValue != 'N'){
      if(dropdownValue == "A"){
        this.DelSearchRes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } else if (dropdownValue == "D"){
        this.DelSearchRes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    }
    this.deleteDisplayReqs = this.DelSearchRes;
    this.DelSearchRes = [];
  }

  FormatReqWithSearchParams(){
    const orderValue = (this.sortDropDown.nativeElement as HTMLSelectElement).value;
    const statValue = (this.statDropDown.nativeElement as HTMLSelectElement).value;
    const id_input = (this.reqIdInput.nativeElement as HTMLSelectElement).value;
    let temp: any[] = []
    if (statValue != "None"){
      this.currReqs.forEach((element: any) => {
        if (element.status == statValue){
          temp.push(element)
        }
      });
    } else {
      temp = this.currReqs;
    }
    if(id_input){
      temp.forEach((item: any) =>{
        if(item.id.includes(id_input)){
          this.ReqSearchRes.push(item);
        }
      });
    } else {
      this.ReqSearchRes = temp;
    }
    if(orderValue != 'N'){
      if(orderValue == "A"){
        this.ReqSearchRes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } else if (orderValue == "D"){
        this.ReqSearchRes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    }
    this.displayReqs = this.ReqSearchRes;
    this.ReqSearchRes = [];
  }

  GenReturnPTOreqViews(data: any[]): void {
    this.displayReqs = data;
  }

  FormatDeleteLists(data: any[]): void{
    data.forEach((element:any) =>{
      if(element.status == "Pending"){
        let arg: any = element;
        this.deleteDisplayReqs.push(arg);
      }
    })
  }

  //This chunck just handles model open and close events, I cound
  //handle this with a query selector and switch statment to make it look
  //cleaner, but I'm lazy
  openModal1(): void {
    this.modal1.openPopup();
  }
  closeModal1(): void {
    this.modal1.closePopup();
  }
  openModal2(): void {
    this.modal2.openPopup();
  }
  openModal3(): void {
    this.modal3.openPopup();
  }
  openModal4(): void {
    this.modal4.openPopup();
  }
  closeModal4(): void {
    this.modal4.closePopup();
  }
  testprint(){
    console.log(this.request['date'].value)
  }

  //this is the API call the submit a request
  PTOrequest(){
    const request = {
      userId : this.userID = this.userInfo.userID,
      reqDate: this.request['date'].value
    }
    this.reqPTO.submitRequest(request).subscribe(
      response =>{
        this.reqid = response.id;
        this.returnCurrentRequests();
        this.GenReturnPTOreqViews(this.currReqs);
        this.formatDelOptsWithSearchParams();
      }
    )
    this.closeModal1();
    this.openModal4();
  }

  //this is the api call to delte a request
deleteRequest(index: number){
  let status !: any;
  let delArgs = {
    id : this.deleteDisplayReqs[index].id.slice(3),
    userId : this.userID
  }
  this.delReq.delete_PTO_req_employee(delArgs).subscribe(
    response =>{
      status = response;
      console.log(status);
      console.log(response);
      console.log(status.status);
      console.log(response.status);
      if (status.status == "Success"){
        alert("Deletion accepted:\n item : " + delArgs.id + "\nHas been successfully Deleted")
        this.returnCurrentRequests();
        this.GenReturnPTOreqViews(this.currReqs);
        this.formatDelOptsWithSearchParams();
      } else {
        alert("ERROR: Deletion Unsuccessful: " + status)
      }
    }
  )
}
}
