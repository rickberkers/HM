import { IonText } from '@ionic/react';
import './ErrorText.css';

type Props = {
    
};

export const ErrorText = (props: Props) => {
    return (
        <IonText color='medium'>
            <p className='ion-text-center'>
            Data could not be retrieved.
            </p>
      </IonText>
    );
};