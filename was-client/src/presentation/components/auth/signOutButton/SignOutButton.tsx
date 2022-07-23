import { IonButton } from '@ionic/react';
import './SignOutButton.css';

type Props = {
    onClick?: React.MouseEventHandler
}

const DateAvatar = (props: Props) => {
    
    return (
        <IonButton onClick={props.onClick} class='ion-margin' expand='block' color="danger">
            Sign Out
        </IonButton>
    );
}

export default DateAvatar;