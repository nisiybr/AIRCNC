import React, {useEffect,useState,useMemo} from 'react';
import {Link} from 'react-router-dom'; //cria link paraa ir para outra rota sem history.push
import api from '../../services/api';

import socketio from 'socket.io-client';

import './styles.css';



export default function Dashboard(){
const [spots, setSpots] = useState([]);
const [requests, setRequests] = useState([]);

const user_id = localStorage.getItem('user');
const socket = useMemo( () => socketio('http://localhost:3333', { //passa alem da URL um objeto de configuracao com o user para o websocket do backend
    query: {
        user_id,        
    },
}), [user_id]);


useEffect(() => {
    socket.on('booking_request', data => {
        setRequests([...requests, data])
    })
}, [requests, socket]);


// user: user_id,
// spot: spot_id,
// date,


useEffect(() => {
    async function loadSpots() {
        const user_id = localStorage.getItem('user');
        const response = await api.get('/dashboard', {
            headers: {user_id},
        }) 
        setSpots(response.data);

    }
    loadSpots();


} , []);

async function handleAccept(id){
    await api.post(`/bookings/${id}/approvals`) //chama a rota de aprovação da solicitacao
    setRequests(requests.filter(request => request._id !== id)); //retira da lista
    
}
async function handleReject(id){
    await api.post(`/bookings/${id}/rejections`) //chama a rota de aprovação da solicitacao
    setRequests(requests.filter(request => request._id !== id)); //retira da lista

}

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>
                                {request.user.email} esta solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                            </strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)}>Aceitar</button>
                        <button className="decline" onClick={() => handleReject(request._id)}>Rejeitar</button>
                    </li>
                ) )}
            </ul>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}> 
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                            
                        <strong>{spot.company}</strong>
                        <span>{spot.price?`R$${spot.price}/dia` : 'GRATUITO' }</span>
                    </li>   
                ))}
            </ul>
            <Link to="/new">            
            <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )
}