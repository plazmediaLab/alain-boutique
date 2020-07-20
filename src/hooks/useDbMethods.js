import { useContext } from 'react';
import UserContext from '../context/user/UserContext';
import { db } from '../utils/firebase';

export default function useDbMethods(){

  const userContext = useContext(UserContext);
  const { user, groups, getProductsMethod } = userContext;

  const productsDoc = 'products';
  const userDoc = 'user';
  const subCollection = 'items';
  
  // Usuario nuevo, primer registro de prueba
  const init = collectionName => {
    let collectionRef = db.collection(collectionName);

    collectionRef.get().then(userRegister => {
      if(userRegister.empty){
        console.log('Nuevo usuario');
        collectionRef
          .doc(userDoc)
          .set({ register: true })
        collectionRef
          .doc(productsDoc)
          .collection(subCollection)
          .get()
          .then(snapshot => {
            if(snapshot.empty){
              collectionRef.doc(productsDoc).collection(subCollection).add({
                name: "Plazmedia initial product test",
                value: 18,
                price: 22,
                date: new Date(),
                comment: "This is an initial info test to how add one item on your product list",
                group: "Sister's clothes",
                status: "STOCK",
                init: "1819222020"
              })
            }
          });
      }else{
        console.log('Usuario ya registrado');
      };
    });
  };

  const getProducts = collectionName => {
    let collectionRef = db.collection(collectionName);

    collectionRef
    .doc(productsDoc)
    .collection(subCollection)
    .onSnapshot(snapshot => {
      let products = []
      snapshot.forEach(a => {
        products = [...products, {
          id: a.id,
          name: a.data().name,
          value: a.data().value,
          price: a.data().price,
          date: a.data().date,
          comment: a.data().comment,
          group: a.data().group,
          status: a.data().status,
          init: a.data().init === "1819222020" ? a.data().init : false 
        }]
      })
      getProductsMethod(products);
    });
  };

    // db.collection(docID).doc("groups").set({"name": [
    //   "evan",
    //   "ropa ana",
    //   "vero",
    // ]}).then(res => {
    //   console.log(res);
    // })
    // db.collection(docID).add({
    //   name: "camisa 5m",
    //   value: 20,
    //   price: 35,
    //   date: new Date(),
    //   status: "STOCK",
    //   group: "evan",
    //   comment: "camisa roja de superman",
    // }).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })

    // db.collection(docID).doc('JqXMRxNeRuNrtn6kTP6U').onSnapshot(querySnapshot => {
    //   console.log(querySnapshot.data());
    // })
    // db.collection(docID).doc('JqXMRxNeRuNrtn6kTP6U').collection('evan').onSnapshot(querySnapshot => {
    //   querySnapshot.forEach(item => {
    //     console.log(item.data());
    //   })
    // });
    // db.collection(docID).onSnapshot(querySnapshot => {
    //   querySnapshot.forEach(doc => {
    //     // console.log(`${doc.id} => ${doc.data()}`);
        
    //     console.log(doc);
    //     console.log(doc.data());

    //     products = [
    //       ...products,
    //       {
    //         id: doc.id,
    //         name: doc.data().name,
    //         value: doc.data().value,
    //         price: doc.data().price,
    //         comment: doc.data().comment,
    //         date: doc.data().date,
    //         status: doc.data().status,
    //         photo: doc.data().photo,
    //       }
    //     ];
    //   })
    //   getProductsState(products);
    //   products = [];
    // })

  return {
    init,
    getProducts
  };
};