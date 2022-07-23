import { IonText } from '@ionic/react';

type Props = {
    text: string;
};

export const Text = ({text}: Props) => {
    return (
        <IonText color='medium'>
            <p className='ion-text-center'>
                {text}
            </p>
      </IonText>
    );
};

export const ErrorText = () => <Text text={"Data could not be retrieved."}></Text>
export const NoHouseholdText = () => <Text text={"No active household selected"}></Text>