import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [connCount, setConnCount] = useState(0);
  const [webConnCount, setWebConnCount] = useState(0);
  const [mobileConnCount, setMobileConnCount] = useState(0);
  const [regularClickCount, setRegularClickCount] = useState(0);
  const [regularIntClickCount, setRegularIntClickCount] = useState(0);
  const [popupClickCount, setPopupClickCount] = useState(0);
  const [popupIntClickCount, setPopupIntClickCount] = useState(0);
  const [productClickCount, setProductClickCount] = useState(0);
  const [addPopupData, setAddPopupData] = useState(null);
  const [removePopupData, setRemovePopupData] = useState(null);
  const [addProduct, setAddProduct] = useState(null);
  const [productList, setProductList] = useState([]);
  const [closePlayer, setClosePlayer] = useState(null);
  const [addPopupList, setAddPopupList] = useState([]);
  const [removePopupList, setRemovePopupList] = useState([]);
  const [removeProductList, setRemoveProductList] = useState([]);
  const [activeProductList, setActiveProductList] = useState([]);


  const LIKE = 'like';
  const SHARE = 'share';
  const CONN = 'conn';
  const NEW_PRODUCT = 'newProducts';
  const REMOVE_PRODUCT = 'removeProducts';
  const ACTIVE_PRODUCT = 'activateProduct';
  const ADD_POPUP = 'addPopup';
  const REMOVE_POPUP = 'removePopup';
  const CLOSE_PLAYER = 'closingPlayer';
  const WEB_CONN = 'webConnection';
  const MOBILE_CONN = 'mobConnection';
  const REGULAR_CLICK = 'regularClick';
  const REGULAR_INT_CLICK = 'regularIntClick';
  const POPUP_CLICK = 'popupClick';
  const POPUP_INT_CLICK = 'popupIntClick';
  const PRODUCT_CLICK = 'productClick';

  const apiKey = 'obRqkm1L9Bh5gSY1I66xiPu7+YGlfto+vK+a7co5H0Wwmub1hSiMNPzcih/CzTGN';
  const broadcastingId = '658af2940c96a86aafc0e663'

    // Recuperar el UUID almacenado en localStorage
  let connectionId = localStorage.getItem('connectionId');

    // Generar un nuevo UUID si no hay uno almacenado
  if (!connectionId) {
        // connectionId = uuidv4();
        // Almacenar el nuevo UUID en localStorage
        localStorage.setItem('connectionId', connectionId);
  }
  connectionId = '658af2940c96a86aafc0e663'
  useEffect(() => {
      // const client = io('http://localhost:8081', {
      const client = io('https://fira-connection-ms-dev.azurewebsites.net', {
        // path: '/web-socket',
        query: {
                  broadcastingId: broadcastingId,
                  connectionId: connectionId
          },
          transportOptions: {
              polling: {
                  extraHeaders: {
                      'value': apiKey
                  }
              }
          }
      });
    // Configurar listeners de eventos
    client.on(LIKE, (data) => {
      setLikeCount(parseInt(data, 10));
    });
    client.on(SHARE, (data) => {
      setShareCount(parseInt(data, 10));
    });

    client.on(NEW_PRODUCT, (data) => {
        console.log('Datos del evento NEW_PRODUCT:', data);
        setAddProduct(data);
        setProductList((prevList) => [...prevList, data]);
    });
    client.on(REMOVE_PRODUCT, (data) => {
        console.log('Datos del evento REMOVE_PRODUCT:', data);
        setRemoveProductList((prevList) => [...prevList, data]);
    });
    client.on(ACTIVE_PRODUCT, (data) => {
        console.log('Datos del evento REMOVE_PRODUCT:', data);
        setActiveProductList((prevList) => [...prevList, data]);
    });

   client.on(ADD_POPUP, (data) => {
          console.log('Datos del evento ADD_POPUP:', data);
          setAddPopupData(data);
          setAddPopupList((prevList) => [...prevList, data]);
      });

   client.on(REMOVE_POPUP, (data) => {
          console.log('Datos del evento REMOVE_POPUP:', data);
          setRemovePopupData(data);

          // Actualiza la lista de popups eliminados
          setRemovePopupList((prevList) => [...prevList, data]);
      });

      client.on(CLOSE_PLAYER, (data) => {
        console.log('Datos del evento CLOSE_PLAYER:', data);
        setClosePlayer(data)
    });

   client.on(CONN, (data) => {
       console.log('Datos del evento CONN:', data);
          setConnCount(parseInt(data.count, 10));
   });

    client.on(WEB_CONN, (data) => {
        console.log('Datos del evento WEB_CONN:', data);
          setWebConnCount(parseInt(data.count, 10));
    });

    client.on(MOBILE_CONN, (data) => {
        console.log('Datos del evento MOBILE_CONN:', data);
          setMobileConnCount(parseInt(data.count, 10));
    });
    client.on(REGULAR_CLICK, (data) => {
          setRegularClickCount(parseInt(data, 10));
      });
    client.on(REGULAR_INT_CLICK, (data) => {
          setRegularIntClickCount(parseInt(data, 10));
      });
    client.on(POPUP_CLICK, (data) => {
          setPopupClickCount(parseInt(data, 10));
      });
    client.on(POPUP_INT_CLICK, (data) => {
          setPopupIntClickCount(parseInt(data, 10));
      });
    client.on(PRODUCT_CLICK, (data) => {
          setProductClickCount(parseInt(data, 10));
      });
    setSocket(client);

      client.on('disconnect', () => {
          console.log('Se ha desconectado del servidor.');
      });


    // Limpiar la conexión y el intervalo cuando el componente se desmonta
    return () => {
      // clearInterval(heartbeatInterval);
      console.log('En return Conexion caida, se manda a desconectar')
      client.disconnect();
    };
  }, [apiKey]); // La dependencia de array vacío garantiza que este efecto se ejecute solo una vez al montar el componente

  const sendMessage = () => {
    // Enviar un mensaje al servidor
    if (socket) {
        console.log('hola')
      socket.emit('clientMessage', 'Hola desde el cliente React!');
    }
  };

  return (
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', margin: '20px' }}>
        <h1 style={{ textAlign: 'center', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          WebSocket Test
        </h1>
        <p>Likes acumulados: {likeCount}</p>
        <p>Shares acumulados: {shareCount}</p>
        <p>Conexiones: {connCount}</p>
        <p>Conexiones web: {webConnCount}</p>
        <p>Conexiones mobile: {mobileConnCount}</p>
        <p>Regular click: {regularClickCount}</p>
        <p>Regular intención click: {regularIntClickCount}</p>
        <p>Popup click:: {popupClickCount}</p>
        <p>Popup intención click:: {popupIntClickCount}</p>
        <p>Producto click: {productClickCount}</p>


          <h3>Información de Add Productos</h3>
          {productList.length > 0 && (
              <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px', border: '1px solid #ddd' }}>
                  <thead>
                  <tr>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Broadcasting ID</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Productos</th>
                  </tr>
                  </thead>
                  <tbody>
                  {productList.map((product, index) => (
                      <tr key={index}>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.broadcastingId}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.products[0].product.name}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          )}

          <h3>Información de Remove Productos</h3>
          {removeProductList.length > 0 && (
              <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px', border: '1px solid #ddd' }}>
                  <thead>
                  <tr>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Product ID</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Broadcasting ID</th>
                  </tr>
                  </thead>
                  <tbody>
                  {removeProductList.map((product, index) => (
                      <tr key={index}>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.id}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.broadcastingId}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          )}

          <h3>Información de Activar Productos</h3>
          {activeProductList.length > 0 && (
              <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px', border: '1px solid #ddd' }}>
                  <thead>
                  <tr>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Product ID</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Broadcasting ID</th>
                  </tr>
                  </thead>
                  <tbody>
                  {activeProductList.map((product, index) => (
                      <tr key={index}>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.id}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{product.broadcastingId}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          )}


          <h3>Información de AddPopup</h3>
          {addPopupList.length > 0 && (
              <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px', border: '1px solid #ddd' }}>
                  <thead>
                  <tr>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>broadcastingId</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>broadcastingProductId</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>price</th>
                      {/* ... (añadir más encabezados según la estructura de tu objeto) */}
                  </tr>
                  </thead>
                  <tbody>
                  {addPopupList.map((popup, index) => (
                      <tr key={index}>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{popup.broadcastingId}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{popup.broadcastingProductId}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{popup.price}</td>
                          {/* ... (añadir más celdas según la estructura de tu objeto) */}
                      </tr>
                  ))}
                  </tbody>
              </table>
          )}

          <h3>Información de RemovePopup</h3>
          {removePopupList.length > 0 && (
              <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px', border: '1px solid #ddd' }}>
                  <thead>
                  <tr>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>broadcastingId</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>broadcastingProductId</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>price</th>
                      {/* ... (añadir más encabezados según la estructura de tu objeto) */}
                  </tr>
                  </thead>
                  <tbody>
                  {removePopupList.map((popup, index) => (
                      <tr key={index}>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{popup.broadcastingId}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{popup.broadcastingProductId}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{popup.price}</td>
                          {/* ... (añadir más celdas según la estructura de tu objeto) */}
                      </tr>
                  ))}
                  </tbody>
              </table>
          )}

          <h3>Información de ClosePlayer</h3>
          {closePlayer && (
              <table>
                  <thead>
                  <tr>
                      <th>broadcastingId</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>{closePlayer.id}</td>
                  </tr>
                  </tbody>
              </table>
          )}

        <button
            style={{
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={sendMessage}
        > Enviar Mensaje al Servidor
        </button>
      </div>
  );
};




export default App;

