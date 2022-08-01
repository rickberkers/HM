import { IonSpinner, IonText, SpinnerTypes } from "@ionic/react";
import './Spinner.css';

type SpinnerProps = {
    fullHeight?: boolean,
    text?: string,
    spinner?: {
        name?: SpinnerTypes
        color?: string
    }
};

const Spinner = ({fullHeight = true, text, spinner = {name: "circular", color: "primary"}}: SpinnerProps) => {

    let spinnerText: JSX.Element | undefined;

    if (text && text.length > 1) {
        spinnerText = <IonText color={"medium"}>{text}</IonText>;
    }
    else if (text === '') {
        spinnerText = undefined;
    }
    else {
        spinnerText = <IonText color={"medium"}>{"Loading"}</IonText>;
    }

    return (
        <div className={`${fullHeight ? "full-height" : ""}`}>
            <div className='loading-container'>
                <IonSpinner {...spinner} />
                {spinnerText}
            </div>
        </div>
    );
}

export default Spinner;