import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stud-assng',
  templateUrl: './stud-assng.component.html',
  styleUrls: ['./stud-assng.component.css']
})
export class StudAssngComponent implements OnInit {

  @Input() fileUpload: any;

  constructor() { }

  ngOnInit(): void {
  }

}
