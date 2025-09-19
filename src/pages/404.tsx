import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>404- Country is not found</h1>
        <p>Sorry, the country you are looking for does not exist or could not be found.</p>
        <Link href="/">
          <p style={{ color: 'blue', textDecoration: 'underline' }}>Go back Home</p>
        </Link>
      </main>
    </>
  );
}
