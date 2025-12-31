import { useState } from "react";
import Header from "../landing/Header";

export default function HeaderExample() {
  const [isDark, setIsDark] = useState(false);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return <Header onThemeToggle={handleThemeToggle} isDark={isDark} />;
}
