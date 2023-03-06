import { Injectable } from '@angular/core';

import {Student} from 'src/app/interfaces/data'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { AngularFirestore } from '@angular/fire/compat/firestore'

import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  auth = getAuth();

  constructor(public database: AngularFirestore, private alertController: AlertController) { }

  //this method insert the data of passengers in database.
  async insertStudent(data: Object, document: string){

    const res = await this.database.collection('alumno').doc(document).set(data)
    .then(
      response => {}
    ).catch(
      response => {

        console.log(response)
      }
    );

  }
}
