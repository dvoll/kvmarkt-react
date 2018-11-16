import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "./firebase.config";

export const initializeFirebase = () => firebase.initializeApp(firebaseConfig);

// export const fire = firebase;

let db: firebase.firestore.Firestore;

export const firestore = () => {
    if (db === undefined) {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();

        db.settings({
            timestampsInSnapshots: true
        });

        db.enablePersistence({ experimentalTabSynchronization: true }).catch(
            err => {
                console.error(err);

                if (err.code === "failed-precondition") {
                    // Multiple tabs open, persistence can only be enabled
                    // in one tab at a a time.
                    // ...
                } else if (err.code === "unimplemented") {
                    // The current browser does not support all of the
                    // features required to enable persistence
                    // ...
                }
            }
        );
    }

    return db;
};
// schemes.forEach(s => 
//     firestore().collection('Schemes').add(s).then( x =>  console.log(x))
//     )