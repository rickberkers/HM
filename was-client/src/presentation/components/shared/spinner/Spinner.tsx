import { IonCol, IonGrid, IonRow, IonSpinner } from "@ionic/react";
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="spinner-container">
            <IonSpinner/>
        </div>
    );
}
 
export default Spinner;