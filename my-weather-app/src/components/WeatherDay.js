import '../App.css';

export const WeatherDay = ({min, max, weatherType, iconKey, forecastDate}) => {
    if (iconKey < 10) {
        iconKey = '0' + iconKey;
    }
    let iconLink = `https://developer.accuweather.com/sites/default/files/${iconKey}-s.png`
    return (
        <div className='weatherInfo'>
            <h4>{forecastDate}</h4>
            <img alt={iconKey} src={iconLink}></img>
            <div>{weatherType}</div>
            <div>Min: {min} Max: {max}</div>
        </div>
    );
};