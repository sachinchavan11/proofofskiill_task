import { Geist, Geist_Mono } from "next/font/google";
import UserManagementUI from "../components/UserManagementUI";



export default function Home() {
  return (
    <div className="flex bg-white">
      <UserManagementUI />
    </div>
  );
}
