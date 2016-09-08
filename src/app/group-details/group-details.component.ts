import { Component } from '@angular/core';
import { MdInput } from '@angular2-material/input';
import { MdButton } from '@angular2-material/button';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.less'],
  directives: [MdInput, MdButton]
})
export class GroupDetails {

}