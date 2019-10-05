import React, { useState , useMemo} from 'react';
import api from '../../services/api';

import cameraIcon from '../../assets/camera.svg';

import './styles.css';

export default function New({history}){
    const [thumbnail, setThumbnail] = useState(null); 
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState(''); 

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail):null;
    },[thumbnail]
    )

    async function handleSubmit(event){

        event.preventDefault();
        
        const data = new FormData();
        data.append('thumbnail',thumbnail); 
        data.append('company',company); 
        data.append('techs',techs); 
        data.append('price',price); 
         
        const user_id = localStorage.getItem('user');

        await api.post('/spots', data , {
            headers:{ user_id },
        })

        history.push('/dashboard');

    }


    return (
    <form onSubmit={handleSubmit}>

        <label 
            id="thumbnail" 
            style={{ backgroundImage: `url(${preview})` }}
            className={preview?'has-thumbnail' : ''}
        >
            <input type="file" onChange={event => setThumbnail(event.target.files[0])}/> 
            <img src={cameraIcon} alt="selectImg"></img>
        </label>

        <label htmlFor="company">EMPRESA *</label>
        <input
            id="company"
            placeholder="Sua empresa incrivel"
            value={company}
            onChange={event => setCompany(event.target.value)}
        />

        <label htmlFor="techs">TECNOLOGIAS *<span>(separadas por vírgula)</span></label>
        <input
            id="techs"
            placeholder="Quais tecnologias usam"
            value={techs}
            onChange={event => setTechs(event.target.value)}
        />


        <label htmlFor="price">VALOR DA DIARIA *<span>(caso gratuito, deixar em branco)</span></label>
        <input
            id="price"
            placeholder="Valor cobrado por dia"
            value={price}
            onChange={event => setPrice(event.target.value)}
        />        
        <button className="btn">Cadastrar</button>





    </form>
    )
}