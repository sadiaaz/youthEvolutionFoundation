export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Youth Evolution Foundation</h1>
      <ul className="flex gap-6">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
}