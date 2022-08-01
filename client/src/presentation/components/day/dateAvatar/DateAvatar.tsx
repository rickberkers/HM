import './DateAvatar.css';

interface Props {
    number: number;
}

const DateAvatar = ({number}: Props) => {
    return (
        <div className="date-avatar-circle">
            <span className="date-avatar-circle-text">{number}</span>
        </div>
    );
}

export default DateAvatar;