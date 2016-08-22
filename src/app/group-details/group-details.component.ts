import { Component, MdInput, MdButton } from './group-details';

@Component({
  selector: 'app-group-details',
  template: require('./group-details.component.html'),
  styles: [require('./group-details.component.less')],
  directives: [MdInput, MdButton]
})
export class GroupDetails {

}