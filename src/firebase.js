import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-qaYEry-GZ_3XRqNe3-BzYMojjCcEKLY",
    authDomain: "react-whatsapp-vaibhav.firebaseapp.com",
    databaseURL: "https://react-whatsapp-vaibhav.firebaseio.com",
    projectId: "react-whatsapp-vaibhav",
    storageBucket: "react-whatsapp-vaibhav.appspot.com",
    messagingSenderId: "554953128068",
    appId: "1:554953128068:web:0273c321b9b0b28b1cead1",
    measurementId: "G-4TGQP4EM5L"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth  = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();

  export{auth,provider}; //explicitly
  export default db; //implicitly