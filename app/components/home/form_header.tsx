import React from "react";
import { FaSignOutAlt } from "react-icons/fa"; // Çıkış ikonu için
import { useRouter } from "next/navigation";

interface HeaderProps {
  username: string;
  role: string;
}

const Header: React.FC<HeaderProps> = ({ username, role }) => {
  const router = useRouter(); // useRouter'ı burada çağır

  const handleLogout = () => {
    if (window.history.length > 1) {
      // Eğer geçmiş kaydı varsa, bir önceki sayfaya dön
      router.back();
    } else {
      // Yoksa login sayfasına yönlendir
      router.push('/login');
    }
  };

  return (
    <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-md">
      <div>
        <h2 className="text-xl font-semibold">{username}</h2>
        <p className="text-sm">{role}</p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 p-2 rounded-full hover:bg-red-700"
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default Header;
