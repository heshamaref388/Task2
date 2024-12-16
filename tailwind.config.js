/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx}", // تأكد من تضمين جميع الامتدادات المطلوبة
    "./public/index.html", // إذا كان لديك ملف HTML في المجلد العام
  ],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {},
  },
  plugins: [],
};
