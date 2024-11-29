import React, { useRef } from "react";
import { FaSignOutAlt, FaDownload, FaUpload } from "react-icons/fa"; // Çıkış, İndirme ve Yükleme ikonları
import { useRouter } from "next/navigation";

interface HeaderProps {
  username: string;
  role: string;
}

const Header: React.FC<HeaderProps> = ({ username, role, }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogout = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/login');
    }
  };

  const handleDownload = () => {
    const fileUrl = "/path/to/your/file.pdf"; // Dosya URL'si
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = "filename.pdf";
    link.click();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-md">
      <div>
        <h2 className="text-xl font-semibold">{username}</h2>
        <p className="text-sm">{role}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={handleDownload} className="bg-green-600 p-2 rounded-full hover:bg-green-700">
          <FaDownload />
        </button>
        <button onClick={handleUploadClick} className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-700">
          <FaUpload />
        </button>
        <button onClick={handleLogout} className="bg-red-600 p-2 rounded-full hover:bg-red-700">
          <FaSignOutAlt />
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="application/pdf"
      />
    </div>
  );
};

export default Header;
