import '../../../src/scss/components/btn/types/_primary.scss';
import '../../../src/scss/components/btn/types/_secondary.scss';

function UserNav() {
  return (
    <div>
      <h2>Hello</h2>
        <button className="btn btn--primary" type="button">Log out</button>
        <input className="input input--secondary" type='search' placeholder='input'/>
    </div>
  )
};

export default UserNav;


