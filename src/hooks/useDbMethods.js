import { useContext } from 'react';
import UserContext from '../context/user/UserContext';
import { db } from '../utils/firebase';
import Swal from 'sweetalert2'

export default function useDbMethods(){


  const userContext = useContext(UserContext);
  const { user, products, groups, activeGroup, getProductsMethod, getGroupsMethod, activeGroupMethod } = userContext;

  const productsDoc = 'products';
  const userDoc = 'user';
  const subCollection = 'items';
  const groupDoc = 'groups';
  const subCollectionG = 'list';
  
  // Usuario nuevo, primer registro de prueba
  const init = userId => {
    let collectionRef = db.collection(userId);

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

  const getProducts = userId => {
    let collectionRef = db.collection(userId);

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

  const getGroups = userId => {
    db.collection(userId).doc(groupDoc).collection(subCollectionG).onSnapshot(snapshot => {
      let groupsList = [];
      snapshot.forEach(item => {
        return  groupsList = [...groupsList, {
          id: item.id,
          name: item.data().name,
          date: item.data().date
        }];
      });
  
      groupsList.sort(function (a, b){
        return (b.date.seconds - a.date.seconds)
      });

      if(activeGroup === ''){
        if(groupsList.length > 0){
          activeGroupMethod(groupsList[0].name);
        }else{
          activeGroupMethod('');
        }
      };

      getGroupsMethod(groupsList);

    })
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

        default:
          break;
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
    .collection(subCollection).add(data).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado correctamente',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    }).catch(error => {
      return error
    });
  };

  const deleteProduct = producId => {
    Swal.fire({
      title: '¿Estas segur@ de querer eliminar este producto?',
      text: "Esto acción no podrá ser revertida",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5480DE',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminarlo!'
    }).then((result) => {
      if (result.value) {
        db.collection(user.uid)
        .doc(productsDoc)
        .collection(subCollection)
        .doc(producId).delete().then(() => {
          Swal.fire(
            'Producto eliminado correctamente',
            'Tu producto ya no aparecerá en la lista',
            'success'
          )
        })
      }
    })
  };

  const createGroup = data => {

    const { name } = data;

    db.collection(user.uid)
    .doc(groupDoc)
    .collection(subCollectionG)
    .add(data).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Grupo creado exitosamente',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      activeGroupMethod(name);
    })
    .catch(error => console.log(error))

    // console.log(capitalize(data.name.replace('_', ' ')))
  };

  const deleteGroup = nameGroup => {

    const group = groups.find(item => item.name === nameGroup);
    const { id } = group;
    
    Swal.fire({
      title: '¿Estas segur@ de querer eliminar este grupo?',
      text: "Esto eliminara todos los productos relacionados a este y esta acción no podrá ser revertida",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5480DE',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminarlo!'
    }).then((result) => {
      if (result.value) {
        db.collection(user.uid)
        .doc(groupDoc)
        .collection(subCollectionG)
        .doc(id)
        .delete().then(() => {
          
          Swal.fire(
            'Grupo eliminado correctamente',
            'El grupo y sus productos ya no aparecerán en la lista',
            'success'
          )

        });
      }
    })
  };

  return {
    init,
    getProducts,
    getGroups,
    activeProduct,
    createProduct,
    deleteProduct,
    createGroup,
    deleteGroup
  };
};