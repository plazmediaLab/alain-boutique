import { useContext, useState } from 'react';
import UserContext from '../context/user/UserContext';
import { db } from '../utils/firebase';
import Swal from 'sweetalert2'

export default function useDbMethods(){

  const [fetching, setFetching] = useState(false);
  const [deletGroup, setDeletGroup] = useState(false);

  const userContext = useContext(UserContext);
  const { 
    user,
    products,
    groups,
    getProductsMethod,
    getGroupsMethod,
    activeGroupMethod 
  } = userContext;

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
                comment: "This is an initial info test to how add one item on your product list",
                color: '',
                date: new Date(),
                group: "Sister's clothes",
                init: "1819222020",
                mode: "NEW",
                name: "Plazmedia initial product test",
                price: 22,
                sold: false,
                soldDate: null,
                status: "STOCK",
                value: 18,
                soldDate: null
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
          comment: a.data().comment,
          color: a.color === undefined ? '' : a.color,
          date: a.data().date,
          group: a.data().group,
          id: a.id,
          init: a.data().init === "1819222020" ? a.data().init : false,
          mode: a.data().mode,
          name: a.data().name,
          price: a.data().price,
          sold: a.data().sold,
          soldDate: a.data().soldDate,
          status: a.data().status,
          value: a.data().value,
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
          color: item.data().color,
          date: item.data().date,
          id: item.id,
          name: item.data().name,
        }];
      });
  
      groupsList.sort(function (a, b){
        return (b.date.seconds - a.date.seconds)
      });

      getGroupsMethod(groupsList);

    })
  };

  const activeProduct = producId => {
    setFetching(true)

    // Remover lo no deseado de productos
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
    
    try {
      db.collection(user.uid)
        .doc(productsDoc)
        .collection(subCollection)
        .doc(producId)
        .update(data);

        setFetching(false);
    } catch (error) {
        console.log(error);
        setFetching(false);
    }

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
        
        setFetching(true);
        
        db.collection(user.uid)
        .doc(productsDoc)
        .collection(subCollection)
        .doc(producId).delete().then(() => {
          Swal.fire(
            'Producto eliminado correctamente',
            'Tu producto ya no aparecerá en la lista',
            'success'
          )
          setFetching(false);
        })
      }
    }).catch(error => {
      console.log(error);
      setFetching(false);
    })
  };

  const createGroup = data => {

    setFetching(true);
    const { name, color } = data;

    if(!groups.find(item => item.name === name)){
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
        activeGroupMethod({
          name,
          color
        });
        setFetching(false)
      })
      .catch(error => {
        console.log(error.message)
        setFetching(false)
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ese grupo ya existe!',
        text: 'Selecciona de la lista el grupo existente o crea uno con otro nombre',
        timerProgressBar: true,
        timer: 3500,
      })
    }
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

        setDeletGroup(true);

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

          const newGroupsList = groups.filter(x => x.name !== nameGroup);

          if(newGroupsList.length > 0){
            activeGroupMethod({
              name: newGroupsList[0].name,
              color: newGroupsList[0].color
            });
          }else{
            activeGroupMethod({
              name: '',
              color: 'bluegray-100'
            });
          }


        });
      }
    })
  };

  const productSold = productID => {
    setFetching(true)

    // Remover lo no deseado de productos
    let obj = products.find(p => p.id === productID);
    
    delete obj.id
    
    const data = {...obj, status: 'STOCK', sold: true, soldDate: new Date()}
    
    try {
      db.collection(user.uid)
        .doc(productsDoc)
        .collection(subCollection)
        .doc(productID)
        .update(data);

        setFetching(false);
    } catch (error) {
        console.log(error);
        setFetching(false);
    }
  };

  return {
    fetching,
    init,
    getProducts,
    getGroups,
    activeProduct,
    createProduct,
    deleteProduct,
    createGroup,
    deleteGroup,
    productSold
  };
};