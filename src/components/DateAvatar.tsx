import './DateAvatar.css';

interface DateAvatarProps {
    number: number;
}

const DateAvatar: React.FC<DateAvatarProps> = ({number}) => {
    return (
        <div className="date-avatar-circle">
            <span className="date-avatar-circle-text">{number}</span>
        </div>
    );
}

export default DateAvatar;