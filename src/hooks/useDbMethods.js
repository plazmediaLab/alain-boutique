import { useContext } from 'react';
import UserContext from '../context/user/UserContext';
import { db } from '../utils/firebase';
import Swal from 'sweetalert2'

export default function useDbMethods(){

  const userContext = useContext(UserContext);
  const { user, products , getProductsMethod } = userContext;

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
                init: "1819222020",
                mode: "NEW"
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
          mode: a.data().mode,
          init: a.data().init === "1819222020" ? a.data().init : false 
        }]
      })
      getProductsMethod(products);
    });
  };

  const activeProduct = producId => {
    // Remover lo no deseado de productos
    // const obj = products.map( ({ status, ...product }) => product );
    let obj = products.find(p => p.id === producId);

    let action;

    switch (obj.status) {
      case 'ACTIVE': 
        action = 'STOCK'
        break
      case 'STOCK': 
        action = 'ACTIVE'
        break
    }

    delete obj.status
    delete obj.id

    const data = {...obj, status: action}

    db.collection(user.uid)
    .doc(productsDoc)
    .collection(subCollection)
    .doc(producId)
    .update(data);
  };

  const createProduct = data => {
    db.collection(user.uid)
    .doc(productsDoc)
    .collection(subCollection).add(data).catch(error => error);
  };

  return {
    init,
    getProducts,
    activeProduct,
    createProduct
  };
};