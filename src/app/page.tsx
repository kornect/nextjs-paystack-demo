import Link from 'next/link'

export default function Home() {
  return (
      <div>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mt-4">Welcome to the payment page</h1>

            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" href="/checkout">Pay now</Link>
        </div>
      </div>
  );
}
