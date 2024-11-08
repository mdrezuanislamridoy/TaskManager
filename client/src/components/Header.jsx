/* eslint-disable react/prop-types */
export default function Header({ loggedIn, onLogout }) {
  return (
    <div className="flex justify-between">
      <div className="left">abcd</div>
      <div className="right">
        {loggedIn && <button onClick={onLogout}>Logout</button>}
      </div>
    </div>
  );
}
