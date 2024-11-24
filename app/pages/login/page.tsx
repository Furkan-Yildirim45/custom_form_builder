"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    
    // useRouter hook'unu kullanarak yönlendirme işlemi
    const router = useRouter();
  
    const handleLogin = () => {
        router.push("/pages/home");  

    //   if (!email || !password) {
    //       alert("Lütfen tüm alanları doldurun.");
    //     return;
    //   }
  
    //   // Burada gerçek bir giriş işlemi yapılabilir
    //   if (email === "admin@gmail.com" && password === "admin123") {
    //     router.push("/home");  
    //   } else {
    //     setError("Geçersiz e-posta veya şifre.");
    //   }
    };
  
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Giriş Yap</h2>
          <p className="text-center text-gray-500 mb-6">Hesabınıza giriş yapmak için bilgilerinizi girin.</p>
  
          {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
  
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">E-posta</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder="E-posta adresiniz"
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              placeholder="Şifrenizi girin"
            />
          </div>
  
          <button
            onClick={handleLogin}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Giriş Yap
          </button>
  
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">Şifremi Unuttum?</a>
          </div>
        </div>
      </div>
    );
  };

export default LoginPage;
