"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaEye, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";  // useRouter hook'u ekledik
import { useUserContext } from "@/app/context/user_context";

const AdminFormPage: React.FC = () => {
  const { user } = useUserContext();
  const [forms, setForms] = useState([
    { id: 1, name: "Form 1", employee: "Ali Yılmaz", submittedAt: "2024-11-29" },
    { id: 2, name: "Form 2", employee: "Ayşe Demir", submittedAt: "2024-11-28" },
    { id: 3, name: "Form 3", employee: "Mehmet Can", submittedAt: "2024-11-27" },
  ]);

  // Admin bilgileri
  const adminInfo = {
    name: user?.name,  // Admin adı
    role: user?.role,  // Admin rolü
  };

  // Form silme işlemi
  const handleDelete = (id: number) => {
    setForms(forms.filter((form) => form.id !== id));
  };

  // Geri dönme işlemi
  const router = useRouter();  // useRouter hook'unu kullanalım
  const handleGoHome = () => {
    router.push("/pages/home");  // Ana sayfaya yönlendirme
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Admin Bilgileri ve Geri Dön Butonu */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
        <div>
          <div className="text-lg font-bold text-gray-700 mb-2">Admin Bilgileri</div>
          <div className="text-gray-600">
            <p>Ad: {adminInfo.name}</p>
            <p>Rol: {adminInfo.role}</p>
          </div>
        </div>
        <button
          onClick={handleGoHome}
          className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
        >
          <FaArrowLeft size={18} />
          <span>Geri Dön</span>
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-700 mb-6">Gönderilen Formlar</h1>
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Form Adı</th>
              <th className="px-4 py-2 text-left text-gray-600">Çalışan</th>
              <th className="px-4 py-2 text-left text-gray-600">Gönderim Tarihi</th>
              <th className="px-4 py-2 text-center text-gray-600">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="border-t">
                <td className="px-4 py-2">{form.name}</td>
                <td className="px-4 py-2">{form.employee}</td>
                <td className="px-4 py-2">{form.submittedAt}</td>
                <td className="px-4 py-2 flex justify-center space-x-4">
                  {/* Görüntüleme butonu */}
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEye size={18} />
                  </button>
                  {/* Silme butonu */}
                  <button
                    onClick={() => handleDelete(form.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFormPage;