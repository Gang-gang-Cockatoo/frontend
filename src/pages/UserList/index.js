import { UserProfile } from '../../components';
import './styles.css';

export default function UserList() {
  return (
    <div className="profileList">
      <UserProfile />
      <UserProfile />
      <UserProfile />
    </div>
  );
}
