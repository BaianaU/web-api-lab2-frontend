import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>Welcome to Your To-Do List App</h1>
      <p style={{ fontSize: '1.2rem', color: '#555', margin: '20px 0' }}>
        Organize your tasks, stay productive, and never forget anything important.
      </p>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#444' }}>Get Started</h2>
        <p>Log in to manage your tasks or sign up to create a new account.</p>

        <div style={{ marginTop: '20px' }}>
          <Link href="/login">
            <button style={{ padding: '12px 24px', fontSize: '16px', marginRight: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Log In
            </button>
          </Link>

          <Link href="/signup">
            <button style={{ padding: '12px 24px', fontSize: '16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
