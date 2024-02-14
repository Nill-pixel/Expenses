import { FaExclamationCircle } from 'react-icons/fa';
import { TypeError } from '../types/Types';

const Error: React.FC<TypeError> = ({ title, children }) => {
  return (
    <div className="error">
      <div className="icon">
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;