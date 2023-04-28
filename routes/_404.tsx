import { Link } from 'aleph/react';

export default function E404() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  );
}
