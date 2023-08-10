import { Redirect } from 'react-router-dom'

const QrCodeRedirect = (props) => {
    const { restaurantId, tableNo } = props.match.params;
    return <Redirect tp={`/menu-overview/${restaurantId}/${tableNo}`}/>

}

export default QrCodeRedirect;