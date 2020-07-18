import { useContext } from 'react';
import UserContext from '../context/user/UserContext';
import { db } from '../utils/firebase';

export default function useDbMethods(){

  const userContext = useContext(UserContext);
  const { groups } = userContext;

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
    const addGroup = (userID, name) => {
      const newArray = [...groups, name]
      console.log(newArray);
      console.log(userID);
      
      db.collection(userID).doc("groups").set({newArray});
    };

  return {
    addGroup
  };
};