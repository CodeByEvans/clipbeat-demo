import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonList,
  IonInput,
  ToastController,
} from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonBackButton,
    IonList,
    IonInput,
  ],
})
export class EditProfilePage {
  profilePhoto = 'assets/profile.svg';

  user = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    birthdate: '',
    phone: '',
    city: '',
    biography: '',
  };

  constructor(
    private toastController: ToastController,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.userService.loadUser();
    this.userService.getUser().subscribe((user) => {
      this.user.name = user.name;
      this.user.lastname = user.lastname;
      this.user.username = user.username;
      this.user.email = user.email;
      this.user.birthdate = user.birthdate || '';
      this.user.phone = user.phone || '';
      this.user.city = user.city;
      this.user.biography = user.biography;
    });
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      const toast = await this.toastController.create({
        message: 'Por favor completa todos los campos',
        duration: 2000,
        color: 'danger',
        position: 'top',
        buttons: ['OK'],
      });

      await toast.present();
      return;
    }

    // Guardamos en LocalStorage
    localStorage.setItem('userProfile', JSON.stringify(this.user));

    const toast = await this.toastController.create({
      message: 'Perfil actualizado',
      duration: 2000,
      color: 'success',
      position: 'top',
      buttons: ['OK'],
    });

    await toast.present();
  }
}
