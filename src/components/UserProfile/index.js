import './styles.css';

export default function UserProfile() {
  return (
    <div className="profileCard">
      <h1>Vlad Stefan</h1>
      <h2>onedevv1@gmail.com</h2>
      <h2>Scor: 250</h2>
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
          <tr>
            <td>Quiz 1</td>
            <td>10:00</td>
            <td>90</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Quiz 2</td>
            <td>15:30</td>
            <td>75</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Quiz 3</td>
            <td>20:15</td>
            <td>60</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
