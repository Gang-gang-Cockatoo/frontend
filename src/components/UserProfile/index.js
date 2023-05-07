import './styles.css';

export default function UserProfile({ user, leaderboard }) {
  if (!user) return;

  return (
    <div className="profileCard">
      <h1>{user.firstName + ' ' + user.lastName}</h1>
      <h2>{user.email}</h2>
      <h2>{user.points}</h2>
      <table>
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Timp</th>
            <th>Scor</th>
            <th>Loc</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(({ _id, quiz, time, score, place }) => (
            <tr key={_id}>
              <td>{quiz}</td>
              <td>{time}</td>
              <td>{score}</td>
              <td>{place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
