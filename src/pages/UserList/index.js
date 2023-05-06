import { Page, UserProfile } from '../../components';
import './styles.css';

export default function UserList() {
  return (
    <Page>
      <div className="profileList">
        <UserProfile />
        <UserProfile />
        <UserProfile />
      </div>
    </Page>
  );
}
