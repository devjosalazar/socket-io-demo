import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

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
    const broadcastingId = '65776074dbad9f6c07ed9944'
    useEffect(() => {
        // const client = io('http://localhost:8082', {
        //   query: {
        //     broadcastingId: broadcastingId,
        //     apiKey:apiKey
        //   }
        // });
        const client = io('http://localhost:8082', {
            query: {
                broadcastingId: broadcastingId
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
        client.on(CONN, (data) => {
            setConnCount(parseInt(data, 10));
        });
        client.on(NEW_PRODUCT, (data) => {
            setConnCount(parseInt(data, 10));
        });
        client.on(REMOVE_PRODUCT, (data) => {
            setShareCount(parseInt(data, 10));
        });
        client.on(ACTIVE_PRODUCT, (data) => {
            setShareCount(parseInt(data, 10));
        });
        client.on(ADD_POPUP, (data) => {
            setShareCount(parseInt(data, 10));
        });
        client.on(REMOVE_POPUP, (data) => {
            setShareCount(parseInt(data, 10));
        });
        client.on(CLOSE_PLAYER, (data) => {
            setShareCount(parseInt(data, 10));
        });
        client.on(WEB_CONN, (data) => {
            setWebConnCount(parseInt(data, 10));
        });
        client.on(MOBILE_CONN, (data) => {
            setMobileConnCount(parseInt(data, 10));
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

        // Limpiar la conexión cuando el componente se desmonta
        return () => {
            client.disconnect();
        };
    }, [apiKey]); // La dependencia de array vacío garantiza que este efecto se ejecute solo una vez al montar el componente

    const sendMessage = () => {
        // Enviar un mensaje al servidor
        if (socket) {
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
            <p>Yo Regular click: {regularClickCount}</p>
            <p>Regular intención click: {regularIntClickCount}</p>
            <p>Popup click:: {popupClickCount}</p>
            <p>Popup intención click:: {popupIntClickCount}</p>
            <p>Producto click: {productClickCount}</p>
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

