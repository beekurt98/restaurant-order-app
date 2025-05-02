"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  return (
    <div className="navbar-wrapper">
      
      <div className="navbar">
        <Link className={activePath === "/" ? "selected-page" : ""} href="/">Home</Link>
        <Link className={activePath === "/products" ? "selected-page" : ""} href="/products">Products</Link>
        <Link className={activePath === "/cart" ? "selected-page" : ""} href="/cart">Cart</Link>
        <Link className={activePath === "/orders" ? "selected-page" : ""} href="/orders">Orders</Link>
        <Link className={activePath === "/settings" ? "selected-page" : ""} href="/settings">Settings</Link>
      </div>
    </div>
  );
}
