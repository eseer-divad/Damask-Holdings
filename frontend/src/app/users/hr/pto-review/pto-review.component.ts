import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginSService } from 'src/app/login/loginService/login-s.service';
import { ElementRef } from '@angular/core';
import { PopupModalComponent } from 'src/app/boilerplates/popup-modal/popup-modal.component';
import { map } from 'rxjs/operators';
import { ViewAllRequestsService } from './PTOservices/viewAllRequests/view-all-requests.service';
import { approvePTORequest } from './PTOservices/approveRequests/approve-pto-request.service';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { NONE_TYPE } from '@angular/compiler';
import { generate } from 'rxjs';
import { PTOreqResponse } from 'src/app/users/employee/e-pto/PTOservices/RequestPTO/req-pto.service';
import { DeleteReqService } from 'src/app/users/employee/e-pto//PTOservices/deletePTOrequest/delete-req.service';

export interface deleteArgs{
    id: string,
    date: string,
    status: string,

};

export interface reqArgs{
    id: string,
    date: string,
    status: string
};

@Component({
    selector: 'app-pto-review',
    templateUrl: './pto-review.component.html',
    styleUrls: ['./pto-review.component.css'],
    template:`
            <button (click)="openModal()">Open Modal</button>
            <app-popup-modal></app-popup-modal>
            `
})

export class PtoReviewComponent implements OnInit{
    displayReqs: any[] = [];
    deleteDisplayReqs: any[] =[];
    ReqDate!: FormGroup;
    currPTO!: number;
    PTOStatus!: string;
    private delTimeOut = false;

    constructor(private elementRef: ElementRef, private loginService: LoginSService,
                private viewReqs: ViewAllRequestsService, private AD_req: approvePTORequest){
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
    ADemployeeID!: string;
    AD_PTO_ID!: string;
    AD_status!: string;

    get request(): { [key: string]: AbstractControl } {
        return this.ReqDate.controls;
    }

    ngOnInit(): void{
        this.userID = this.loginService.getUserIDFromLocalStorage();
        this.viewReqs.getReqs(this.userID).subscribe(
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
                element.fullID = element.id
                element.fullEID = element.eid
                element.id  = "..." + (element.id.toString()).substr(50, 14)
                element.eid = "..." + (element.eid.toString()).substr(50,14)
                });
                this.GenReturnPTOreqViews(this.currReqs);
            }
        )
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

    // also handles the accept/deny modal's expanded search tab and
    // refromats the returned results based on search params
    minimizeDelSearchOps(){
        this.delSearchOpts.nativeElement.style.height = '6%';
        this.delSearchFields.nativeElement.style.display = 'none';
        this.formatDelOptsWithSearchParams()
        this.delTimeOut = false;
    }

      // handles the return of results in the accept/deny modal based on search params
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

    //this is the api call to delte a request
    deleteRequest(index: number){
        let status !: any;
        let delArgs = {
            id : this.deleteDisplayReqs[index].id.slice(3),
            userId : this.userID
        }
        this.viewReqs.getReqs(delArgs).subscribe(
          response =>{
            status = response;
            console.log(status);
            console.log(response);
            console.log(status.status);
            console.log(response.status);
            if (status.status == "Success"){
                alert("Deletion accepted:\n item : " + delArgs.id + "\nHas been successfully Deleted")
                //this.returnCurrentRequests();
                this.GenReturnPTOreqViews(this.currReqs);
                this.formatDelOptsWithSearchParams();
            } else {
                alert("ERROR: Deletion Unsuccessful: " + status)
            }
            }
        )
    }

    // this is the api call to approve a request
    approveRequest(index: number){
        let status !: any;

        // for the selected element find it's full employeeID and requestID
        this.currReqs.forEach((element:any) => {
            if((this.deleteDisplayReqs[index].id == element.id)){
                this.ADemployeeID = element.fullEID;
                this.AD_PTO_ID = element.fullID;
                this.AD_status = 'true';
                }
            });

        // store the values for the selected element to pass to setReqs
        let approveArgs = {
            id :    this.AD_PTO_ID,
            eid :   this.ADemployeeID,
            status: this.AD_status
        }

        // send set request and log success/failure
        this.AD_req.setReqs(approveArgs).subscribe(
          response =>{
            status = response;
            console.log(status);
            console.log(response);
            console.log(status.status);
            console.log(response.status);
            if (status.status == "Success"){
                alert("Denial accepted:\n item : " + approveArgs.id + "\nHas been successfully Approved")
                this.returnCurrentRequests();
                this.GenReturnPTOreqViews(this.currReqs);
                this.formatDelOptsWithSearchParams();
            } else {
                alert("ERROR: Deletion Unsuccessful: " + status)
            }
            }
        )
    }

    // this is the api call to deny a request
    denyRequest(index: number){
        let status !: any;

        // for the selected element find it's full employeeID and requestID
        this.currReqs.forEach((element:any) => {
            if((this.deleteDisplayReqs[index].id == element.id)){
                this.ADemployeeID = element.fullEID;
                this.AD_PTO_ID = element.fullID;
                this.AD_status = 'false';
                }
            });

        // store the values for the selected element to pass to setReqs
        let approveArgs = {
            id :    this.AD_PTO_ID,
            eid :   this.ADemployeeID,
            status: this.AD_status
        }

        // send set request and log success/failure
        this.AD_req.setReqs(approveArgs).subscribe(
          response =>{
            status = response;
            console.log(status);
            console.log(response);
            console.log(status.status);
            console.log(response.status);
            if (status.status == "Success"){
                alert("Denial accepted:\n item : " + approveArgs.id + "\nPTO request has been denied")
                this.returnCurrentRequests();
                this.GenReturnPTOreqViews(this.currReqs);
                this.formatDelOptsWithSearchParams();
            } else {
                alert("ERROR: Deletion Unsuccessful: " + status)
            }
            }
        )
    }

    FormatDeleteLists(data: any[]): void{
        data.forEach((element:any) =>{
            if(element.status == "Pending"){
                let arg: any = element;
                this.deleteDisplayReqs.push(arg);
            }
        })
    }

    //API call to return all requests for this user and format them
    returnCurrentRequests(){
        this.currReqs = [];
        this.viewReqs.getReqs(this.currReqs.userID).subscribe(
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

    GenReturnPTOreqViews(data: any[]): void {
        this.displayReqs = data;
    }
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
}
