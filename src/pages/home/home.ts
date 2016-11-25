import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  songs: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
    public af: AngularFire,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController) {
    this.songs = af.database.list('/songs');
  }

  addSong() {
    let prompt = this.alertCtrl.create({
      title: 'Título da Música',
      message: 'Digite o título da música que você deseja adicionar:',
      inputs: [
        {
          name: 'title',
          placeholder: 'Título'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Clicou no cancelar');
          },
        },
        {
          text: 'Salvar',
          handler: data => {
            if (!!data.title && data.title.trim() !== "") {
              this.songs.push({
                title: data.title
              });
            }
            else
              return false;
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(songId: string, songTitle: string) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'O que você deseja fazer?',
      buttons: [
        {
          text: 'Deletar',
          role: 'destructive',
          handler: () => {
            this.songs.remove(songId);
          }
        },
        {
          text: 'Atualizar título da música',
          handler: () => {
            this.updateSong(songId, songTitle);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Fechou o ActionSheet!')
          }
        }
      ]
    });
    actionSheet.present();
  }

  updateSong(songId: string, songTitle: string) {
    let prompt = this.alertCtrl.create({
      title: 'Título da Música',
      message: 'Atualize o nome da música:',
      inputs: [
        {
          name: 'newTitle',
          placeholder: 'Título',
          value: songTitle
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('perdeu!');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            if (data.newTitle && data.newTitle.trim() !== "") {
              this.songs.update(songId, {
                title: data.newTitle
              });
            }
            else
              return false;
          }
        }
      ]
    });
    prompt.present();
  }
}
