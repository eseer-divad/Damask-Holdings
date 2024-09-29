import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoginSService } from 'src/app/login/loginService/login-s.service';
import { GetPunchesService } from './time-punch-services/get-punches.service';
import { ElementRef,  } from '@angular/core';


@Component({
  selector: 'app-time-punches',
  templateUrl: './time-punches.component.html',
  styleUrls: ['./time-punches.component.css']
})

export class TimePunchesComponent implements OnInit{
  userInfo: any;
  userId: any;
  punchesResponse: any;
  displayPunches: any[] = []
  currYear: number = (new Date).getFullYear();
  yearList: number[] = [];
  monthList: string[] = ["none", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  dayList: string[] = ["none", "01", "02", "03", "04", "05", "06", "07", "08", "09", 
                       "10", "11", "12", "13", "14", "15", "16", "17",  "18",
                       "19", "20",  "21",  "22",  "23",  "24",  "25",  "26",
                       "27", "28", "29", "30",  "31"];
  WeekdayList: string[] = ["none", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                           "Friday", "Saturday"]
  
  TimeList: string[] = ["none", "06:00",  "06:30", "07:00",  "07:30", "08:00",
                        "08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
                        "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
                        "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
                        "17:30", "18:00", "18:30", "19:00", "19:30", "20:00",
                        "20:30", "21:00", "21:30", "22:00", "22:30", "23:00",
                        "23:30", "00:00", "00:30", "01:00", "01:30", "02:00",
                        "02:30", "03:00", "03:30", "04:00", "04:30", "05:00",
                        "05:30",]

  constructor(private login: LoginSService, private getpunch: GetPunchesService){}
  ngOnInit(): void {
    const currentUserString = localStorage.getItem('userID'); // Update to 'userID'

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

    this.userInfo = this.userInfo.userID;
    this.getpunch.getMyPunches(this.userInfo).subscribe(
      response =>{
        this.punchesResponse = response;
        this.displayPunches = this.punchesResponse;
      }
    );
    console.log(this.punchesResponse);
    for (let index = 0; index <= 100; index++) {
      this.yearList.push(this.currYear - index);
    }
  }

  @ViewChild('search_bar') searchBar!: ElementRef;
  @ViewChild('searchFields') searchFields!: ElementRef;

  @ViewChild('yearSelector') yearSelector!: ElementRef;
  @ViewChild('monthSelector') monthSelector!: ElementRef;
  @ViewChild('daySelector') daySelector!: ElementRef;
  @ViewChild('weekdaySelector')weekdaySelector!: ElementRef;
  @ViewChild('timeOneSelector') timeOneSelector!: ElementRef;
  @ViewChild('timeTwoSelector') timeTwoSelector!: ElementRef;
  @ViewChild('punchIdInput') punchInput!: ElementRef;


  expandSearchBar(){
    this.searchBar.nativeElement.style.height = '100%';
    this.searchBar.nativeElement.style.width = '55.7%';
    this.searchBar.nativeElement.style.borderRadius = '0px 20px 20px 20px';
    this.searchBar.nativeElement.style.backgroundImage = 'linear-gradient(90deg, rgb(36, 232, 246), #00ff80, rgb(36, 232, 246))';
    this.searchFields.nativeElement.style.display = "flex";
  }

  collapseSearchBar(){
    this.searchBar.nativeElement.style.height = '10%';
    this.searchBar.nativeElement.style.width = '40%';
    this.searchBar.nativeElement.style.borderRadius = '0px 0px 20px 20px';
    this.searchBar.nativeElement.style.backgroundImage = 'linear-gradient(90deg, #11848c, #21ea86, #11848c)';
    this.searchFields.nativeElement.style.display = "none";
    this.formatPunchSearchParams();
  }

  formatPunchSearchParams(){
    const selecYear = (this.yearSelector.nativeElement as HTMLSelectElement).value;
    const selecMonth = (this.monthSelector.nativeElement as HTMLSelectElement).value;
    const selecDay = (this.daySelector.nativeElement as HTMLSelectElement).value;
    const selecWeekday = (this.weekdaySelector.nativeElement as HTMLSelectElement).value;
    const selecTimeOne = (this.timeOneSelector.nativeElement as HTMLSelectElement).value;
    const selecTimeTwo = (this.timeTwoSelector.nativeElement as HTMLSelectElement).value;
    const inputPunchId = (this.punchInput.nativeElement as HTMLSelectElement).value;

    let sortList: any[] = this.punchesResponse;
    
    //sorts for year
    if(selecYear != "none"){
      let tempList: any[] = []
      sortList.forEach((element:any) => {
        let year = new Date(element.p_date).getFullYear();
        if(year == parseFloat(selecYear)){
          tempList.push(element);
        }
      });
      sortList = tempList
    }

    //sorts for month
    if(selecMonth != "none"){
      let tempList: any[] = []
      sortList.forEach((element:any)=>{
        let month = new Date(element.p_date).getMonth();
        if(month == (parseInt(selecMonth) - 1)){
          tempList.push(element);
        }
      });
      sortList = tempList;
    }

    //sorts for day
    if(selecDay != "none"){
      let tempList: any[] = []
      sortList.forEach((element: any) =>{
        let day = new Date(element.p_date).getDate();
        if(day == (parseInt(selecDay) - 1)){
          tempList.push(element);
        }
      });
      sortList = tempList;
    }

    //sorts the weekday
    if(selecWeekday != "none"){
      let tempList: any[] = []
      sortList.forEach((element:any) =>{
        if(selecWeekday == element.day){
          tempList.push(element);
        }
      });
      sortList = tempList;
    }

    // sorts the timeframe
    if((selecTimeOne != "none") && (selecTimeTwo != "none")){
      let tempList: any[] = [];
      let ipTimeOne = this.convInputTimeToSecs(selecTimeOne);
      let ipTimeTwo = this.convInputTimeToSecs(selecTimeTwo);
      
      if (ipTimeTwo < ipTimeOne){
        ipTimeTwo = ipTimeTwo + 86400;
      }

      sortList.forEach((element: any) =>{
        let punchTime:number = this.convReturnTimeToSecs(element.p_time);
        if ((punchTime >= ipTimeOne) && (punchTime <= ipTimeTwo)){
          tempList.push(element);
        }
      });
      sortList = tempList;
    }
    
    //sorts the punch id
    if(inputPunchId != "Punch ID"){
      let tempList: any[] = [];
      sortList.forEach((element: any) =>{
        if(element.id.includes(inputPunchId)){
          tempList.push(element);
        }
      });
      sortList = tempList;
    }

    this.displayPunches = sortList;
  }

  convReturnTimeToSecs(timeString:string):number{
    let set = timeString.split(":");
    let hours = parseInt(set[0], 10);
    let minutes = parseInt(set[1], 10);
    let secs = parseInt(set[2], 10);
    
    let seconds = (hours * 3600) + (minutes * 60) + secs;
    return(seconds);
  }

  convInputTimeToSecs(timeString: any):number{
    let set = timeString.split(":");
    let hours = parseInt(set[0], 10);
    let minutes = parseInt(set[1], 10);
    
    let seconds = (hours * 3600) + (minutes * 60);
    return seconds 
  }
}
