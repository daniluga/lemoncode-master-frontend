import { Component, OnDestroy, OnInit } from '@angular/core';
import { MemberEntity } from '../../../model';
import { NgFor, NgIf } from '@angular/common';
import { HighlightDirective } from '../../directives/highlight.directive';
import {
  FormsModule,
  // Para forms reactivos, lo de abajo
  ReactiveFormsModule,
} from '@angular/forms';
import { SearchByLoginPipe } from '../../pipes/search-by-login.pipe';
import { MembersService } from '../../services/members.service';
import { Subscription } from 'rxjs';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  imports: [
    NgFor,
    HighlightDirective,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    SearchByLoginPipe,
    UserEditComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  members: MemberEntity[] = [];
  newMember!: MemberEntity;
  memberSelected!: MemberEntity;
  subscription!: Subscription; // Para desuscribirnos de los observables

  constructor(
    private membersService: MembersService // private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    // this.members = await this.membersService.getOrgMembers();
    /**
     * Nos suscribimos al observable que nos devuelve la lista de miembros de la organización.
     * Cada vez que se emita un nuevo valor, se ejecutará la función que pasamos como argumento.
     */
    this.subscription = this.membersService
      .getOrgMembers()
      .subscribe((members) => (this.members = members));
    this.resetNewMember();
    // this.createEditForm(); // Inicializamos el formulario de edición
  }

  add() {
    console.log(this.newMember);
    this.members.push(this.newMember);
    this.resetNewMember();
  }

  private resetNewMember() {
    this.newMember = {
      id: '',
      login: '',
      avatar_url: '',
    };
  }

  handleFileInput($event: any) {
    const files = $event.target.files as FileList;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.newMember.avatar_url = reader.result as string;
    };
  }

  // save() {
  //   if (this.editForm.valid) {
  //     this.members = [...this.members]; // Hace falta cambiar la referencia del elemento para que se actualice la vista porque no se detecta el cambio.
  //     const member = this.editForm.value; // Entradas de los form controls que tenemos.
  //     const index = this.members.findIndex((item) => item.id === member.id); // Buscamos el índice del miembro a editar.
  //     this.members.splice(index, 1, member); // Reemplazamos el miembro a editar por el nuevo.
  //   }
  // }

  save(member: MemberEntity) {
    this.members = [...this.members]; // Hace falta cambiar la referencia del elemento para que se actualice la vista porque no se detecta el cambio.
    const index = this.members.findIndex((item) => item.id === member.id); // Buscamos el índice del miembro a editar.
    this.members.splice(index, 1, member); // Reemplazamos el miembro a editar por el nuevo.
  }

  select(member: MemberEntity): void {
    this.memberSelected = member;
    /**
     * patchValue() -> Método de FormGroup que nos permite actualizar los valores
     * de los campos del formulario.
     */
    // console.log(this.memberSelected);
    // this.editForm.patchValue(this.memberSelected);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
