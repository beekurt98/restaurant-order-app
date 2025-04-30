import Link from "next/link";

export default function Navbar() {

  return (
    <div className="navbar">
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/settings">Settings</Link>
    </div>
  )
}