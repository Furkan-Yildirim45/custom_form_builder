"use client"
import React, { useRef, useState } from "react";
import { FaSignOutAlt, FaDownload, FaUpload, FaPaperPlane, FaListAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/app/context/user_context";

interface HeaderProps {
  username: string;
  setPdfUrl: (url: string) => void;  // PDF URL'ini üst bileşene iletmek için callback
}

const Header: React.FC<HeaderProps> = ({ username, setPdfUrl }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pdfUrl, setPdfUrlState] = useState<string | null>(null);  // PDF URL'sini burada tutacağız
  const [isSending, setIsSending] = useState(false);  // Gönderme işlemi durumu
  const { user } = useUserContext();

  const handleLogout = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/login');
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;  // Dinamik olarak yüklenen PDF URL'si
      link.download = "downloaded-file.pdf";  // İndirme ismi
      link.click();
    } else {
      alert('Henüz PDF dosyası yüklenmedi.');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Dosya URL'sini oluştur
      setPdfUrlState(fileUrl);  // PDF URL'sini state'e kaydet
      setPdfUrl(fileUrl);  // URL'i üst bileşene ilet

      // URL'i serbest bırakmak için
      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    }
  };

  const handleSend = async () => {
    if (!pdfUrl) {
      alert("Henüz yüklenmiş bir dosya yok.");
      return;
    }

    setIsSending(true);

    try {
      // Burada dosya gönderme işlemini yapacağız. Örnek bir API isteği:
      const formData = new FormData();
      formData.append("file", pdfUrl); // Dosyayı formdata'ya ekliyoruz

      // API isteği gönder (örneğin 'POST /api/upload' endpoint'ine)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Dosya başarıyla gönderildi!");
      } else {
        alert("Dosya gönderilirken bir hata oluştu.");
      }
    } catch (error) {
      alert("Bir hata oluştu.");
    } finally {
      setIsSending(false);  // Gönderme işlemi tamamlandığında
    }
  };

  const handleComingForms = () => {
    console.log("Yönlendirme yapılacak...");
    router.push('/pages/admin');
  };

  return (
    <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-md">
      <div>
        <h2 className="text-xl font-semibold">{username}</h2>
        <p className="text-sm">{user?.role}</p>
      </div>
      <div className="flex space-x-2">

        <button
          onClick={handleDownload}
          className="bg-green-600 p-2 rounded-full hover:bg-green-700"
          disabled={!pdfUrl}  // PDF URL'si yoksa butonu devre dışı bırak
        >
          <FaDownload />
        </button>
        <button onClick={handleUploadClick} className="bg-yellow-600 p-2 rounded-full hover:bg-yellow-700">
          <FaUpload />
        </button>
        <button
          onClick={handleSend}
          className="bg-blue-600 p-2 rounded-full hover:bg-blue-700"
          disabled={isSending || !pdfUrl}  // Gönderme işlemi sırasında butonu devre dışı bırak
        >
          <FaPaperPlane />
        </button>
        <button onClick={handleLogout} className="bg-red-600 p-2 rounded-full hover:bg-red-700">
          <FaSignOutAlt />
        </button>
        {/* Admin Button */}
        {
          user?.role === "Admin" && (
            <button
              onClick={handleComingForms}
              className="bg-purple-600 p-2 rounded-full hover:bg-purple-700"
            >
              <FaListAlt />
            </button>
          )
        }
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="application/pdf"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Header;
