'use client';

import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { Geist, Geist_Mono } from 'next/font/google';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IThemeProject } from '/src/styles/IThemeProject';
import '/src/styles/globals.css';
import '/src/styles/index.css';
import '/src/styles/theme.css';
import '/src/styles/home-style.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

interface ThemeContextType {
  themePage: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export default function RootLayout({ children }: ThemeProviderProps) {
  const [themePage, setThemePage] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setThemePage(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (themePage === 'dark') {
      document.documentElement.style.setProperty('--light-background-primary', IThemeProject.darkBackgroundPrimary);
      document.documentElement.style.setProperty('--menu-background-primary', IThemeProject.darkMenuBackgroundPrimary);
    } else {
      document.documentElement.style.setProperty('--light-background-primary', IThemeProject.lightBackgroundPrimary);
      document.documentElement.style.setProperty('--menu-background-primary', IThemeProject.lightMenuBackgroundPrimary);
    }

    localStorage.setItem('theme', themePage);
  }, [themePage]);

  const toggleTheme = () => {
    setThemePage((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const customTheme: ThemeConfig = {
    token: {},
    algorithm: themePage === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeContext.Provider value={{ themePage, toggleTheme }}>
          <ConfigProvider theme={customTheme}>
            {children}
          </ConfigProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};