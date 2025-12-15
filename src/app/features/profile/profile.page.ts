import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonSpinner,
  ViewWillEnter,
  ToastController,
  IonMenu,
  IonList,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import introjs from 'intro.js';
import 'intro.js/introjs.css';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonBackButton,
    IonSpinner,
    IonMenu,
    IonList,
    IonLabel,
    IonItem,
  ],
})
export class ProfilePage implements ViewWillEnter {
  displayName = '';
  username = '';
  location = '';
  profilePhoto = 'assets/profile.svg';
  reviews = 10;
  rating = 4;
  stars = Array(5).fill(0);
  biography = '';

  posts = [
    {
      title: 'Nuevo single 🎵',
      description: 'Lanzando hoy mi track "Vibes Electrónicas". ¡Escúchalo!',
      img: 'assets/post1.webp',
      likes: 120,
      comments: 24,
    },
    {
      title: 'Colaboración épica',
      description: 'Trabajo con artista X en un nuevo tema que saldrá pronto.',
      img: 'assets/post2.webp',
      likes: 98,
      comments: 10,
    },
    {
      title: 'ClipBeat Demo 🎬',
      description: 'Explora mi demo y déjame feedback sobre el proyecto.',
      img: 'assets/post3.webp',
      likes: 75,
      comments: 8,
    },
  ];

  user: any = null;
  loading = true;

  socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/evanslituma/',
      icon: 'logo-instagram',
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com/@evanslituma',
      icon: 'logo-youtube',
    },
  ];

  constructor(
    private toastController: ToastController,
    private userService: UserService
  ) {}

  async ionViewWillEnter() {
    this.userService.loadUser();
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.displayName = `${user.name} ${user.lastname}`;
      this.username = user.username;
      this.location = user.city;
      this.biography = user.biography;
    });

    setTimeout(() => {
      this.loading = false;
    }, 1000);
    setTimeout(() => {
      const tourDone = localStorage.getItem('tourDone');
      if (!tourDone) {
        this.startTour();
        localStorage.setItem('tourDone', 'true');
      }
    }, 1000);
  }

  editProfile() {
    console.log('Edit profile');
  }

  // Método para guardar cambios en LocalStorage
  saveProfile() {
    localStorage.setItem('userProfile', JSON.stringify(this.user));
    console.log('Perfil guardado', this.user);
  }

  toggleSidebar() {
    const menu = document.querySelector('ion-menu') as any;
    menu?.open();
  }

  closeSidebar() {
    const menu = document.querySelector('ion-menu') as any;
    menu?.close();
  }

  // Métodos de navegación dentro del sidebar
  goTo(section: string) {
    console.log('Ir a sección:', section);
    this.closeSidebar();
  }

  logout() {
    console.log('Cerrar sesión');
    localStorage.removeItem('userProfile'); // opcional, limpiar datos demo
    this.closeSidebar();
  }

  async shareProfile() {
    const url = `https://clipbeat.com/@${this.user.username}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Compartir perfil',
          url: url,
        });

        const toast = await this.toastController.create({
          message: 'Perfil compartido',
          duration: 2000,
          color: 'success',
          position: 'top',
          buttons: ['OK'],
        });

        await toast.present();
      } catch (err) {
        const toast = await this.toastController.create({
          message: 'Error al compartir el perfil:' + err,
          duration: 2000,
          color: 'danger',
          position: 'top',
          buttons: ['OK'],
        });

        await toast.present();
      }
    } else {
      await navigator.clipboard.writeText(url);

      const toast = await this.toastController.create({
        message: 'URL copiada al portapapeles',
        duration: 2000,
        color: 'success',
        position: 'top',
        buttons: ['OK'],
      });

      await toast.present();
    }
  }

  startTour() {
    const intro = introjs();

    intro.setOptions({
      steps: [
        {
          intro: 'Bienvenido a mi demo de ClipBeat',
        },
        {
          element: '.profile-container',
          intro:
            'Este es el contenedor principal de tu perfil, donde aparece la información básica.',
          position: 'bottom',
        },
        {
          element: '.create-button',
          intro: 'Este botón te permite editar tu perfil.',
          position: 'bottom',
        },
        {
          element: '.links',
          intro: 'Aquí puedes ver y acceder a tus redes sociales.',
          position: 'bottom',
        },
        {
          element: '.posts-grid',
          intro: 'Este es tu feed de publicaciones.',
          position: 'bottom',
        },
        {
          element: '.header-end-button:nth-child(2)',
          intro:
            'Este botón te permite acceder a ajustes y opciones adicionales.',
          position: 'bottom',
        },
        {
          element: '.header-end-button:nth-child(1)',
          intro: 'Este botón te permite compartir tu perfil.',
          position: 'bottom',
        },
        {
          intro: '¡Edita tu perfil! Dale personalidad a esta pestaña :)',
        },
      ],
      showProgress: true,
      exitOnOverlayClick: false,
      nextLabel: 'Siguiente',
      prevLabel: 'Anterior',
      doneLabel: 'Terminar',
      overlayOpacity: 0.8,
    });

    intro.start();
  }
}
