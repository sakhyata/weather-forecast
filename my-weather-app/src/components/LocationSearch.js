import { useState } from 'react';
import { API_KEY } from '../constants';

export const LocationSearch = ({ locationKeyFound }) => {

    const [zipCode, setZipCode] = useState('');

    const getLocation = (zip) => {
        fetch(
            `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${API_KEY}&q=${zip}`
        )
        .then(res => res.json())
        .then(res => locationKeyFound({
            name: res[0].LocalizedName,
            key: res[0].Key,
            state: res[0].AdministrativeArea.ID
        }))
        .catch(err => {
            alert('Invalid zipcode!');
        })
    };

    const handleChange = (evt) => {
        if (evt.target.value) {
            setZipCode(evt.target.value);
        }
    };

    const handleSubmit = (zip) => {
        if (zip) {
            getLocation(zip);
        } else {
            alert('Enter zipcode to get weather forecast');
        }
    };

    return (
        <div>
            <input value={zipCode} onChange={evt => handleChange(evt)}></input>
            <button onClick={() => handleSubmit(zipCode)}>Search</button>
        </div>
    );
}