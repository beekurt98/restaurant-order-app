import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function PageHeader({ name }) {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.name?.split(" ")[0];
  const lastName = user?.user_metadata?.name?.split(" ").at(-1);

  return (
    <>
    <div className="page-header">
        <img style={{height:"50px", width:"50px"}} src="logos/3.png" />
        <h2>{name}</h2>
      <Link href="/profile">
        <img src={user ? `https://ui-avatars.com/api/?background=588157&color=fff&name=${firstName}+${lastName}` : "/logos/12.png"} alt="" />
      </Link>
    </div>
    </>
  )
}