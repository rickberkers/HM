import { IonSpinner, SpinnerTypes } from "@ionic/react";
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

    let spinnerText: JSX.Element | undefined = <p>{"Loading"}</p>;
    if(text && text.length > 1) {
        spinnerText = <p>{text}</p>;
    } 
    else if (text === "") {
        spinnerText = undefined;
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