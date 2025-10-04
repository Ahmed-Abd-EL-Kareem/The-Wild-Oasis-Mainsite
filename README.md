# The Wild Oasis - واحة البرية

A luxurious cabin booking website built with Next.js, featuring a modern and responsive design for booking premium cabins in the heart of the Italian Dolomites.

موقع حجز كبائن فاخر مبني بـ Next.js، يتميز بتصميم عصري ومتجاوب لحجز الكبائن المتميزة في قلب جبال الدولوميت الإيطالية.

## Features / المميزات

### English

- **Luxury Cabin Listings**: Browse and book premium cabins with detailed information
- **User Authentication**: Secure login system with Google OAuth integration
- **Reservation Management**: Complete booking system with date selection and guest management
- **Responsive Design**: Fully responsive design that works perfectly on all devices
- **Real-time Availability**: Dynamic booking system with real-time availability checking
- **User Dashboard**: Personal account area for managing reservations and profile
- **Modern UI/UX**: Beautiful, intuitive interface with smooth animations

### العربية

- **عرض الكبائن الفاخرة**: تصفح واحجز الكبائن المتميزة مع معلومات مفصلة
- **المصادقة الآمنة**: نظام تسجيل دخول آمن مع تكامل Google OAuth
- **إدارة الحجوزات**: نظام حجز كامل مع اختيار التواريخ وإدارة الضيوف
- **التصميم المتجاوب**: تصميم متجاوب بالكامل يعمل بشكل مثالي على جميع الأجهزة
- **التوفر الفوري**: نظام حجز ديناميكي مع فحص التوفر في الوقت الفعلي
- **لوحة تحكم المستخدم**: منطقة حساب شخصي لإدارة الحجوزات والملف الشخصي
- **واجهة مستخدم عصرية**: واجهة جميلة وبديهية مع رسوم متحركة سلسة

## Tech Stack / التقنيات المستخدمة

### English

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS with custom color scheme
- **Icons**: Heroicons
- **Date Handling**: date-fns library
- **Deployment**: Vercel-ready

### العربية

- **الواجهة الأمامية**: Next.js 15، React 19، Tailwind CSS
- **المصادقة**: NextAuth.js مع Google OAuth
- **قاعدة البيانات**: Supabase (PostgreSQL)
- **التصميم**: Tailwind CSS مع نظام ألوان مخصص
- **الأيقونات**: Heroicons
- **معالجة التواريخ**: مكتبة date-fns
- **النشر**: جاهز للنشر على Vercel

## Getting Started / البدء

### English

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
# Add your Supabase and Google OAuth credentials
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### العربية

1. استنساخ المستودع
2. تثبيت التبعيات:

```bash
npm install
```

3. إعداد متغيرات البيئة:

```bash
cp .env.example .env.local
# أضف بيانات اعتماد Supabase و Google OAuth
```

4. تشغيل خادم التطوير:

```bash
npm run dev
```

5. افتح [http://localhost:3000](http://localhost:3000) في متصفحك

## Project Structure / هيكل المشروع

```
app/
├── _components/          # Reusable components
├── _lib/                # Utility functions and configurations
├── _styles/             # Global styles
├── account/             # User account pages
├── cabins/              # Cabin listing and detail pages
├── api/                 # API routes
└── page.js              # Homepage
```

## Key Features / المميزات الرئيسية

### English

- **Responsive Design**: Mobile-first approach with perfect desktop experience
- **Fixed Mobile Navigation**: Bottom navigation bar for easy mobile access
- **Dynamic Cabin Filtering**: Filter cabins by capacity (1-3, 4-7, 8-12 guests)
- **Date Range Selection**: Interactive calendar for booking dates
- **Real-time Pricing**: Dynamic price calculation based on selected dates
- **User Profile Management**: Complete profile editing with country selection
- **Booking History**: View and manage all past and upcoming reservations

### العربية

- **التصميم المتجاوب**: نهج يركز على الهاتف المحمول مع تجربة سطح مكتب مثالية
- **التنقل الثابت للهاتف المحمول**: شريط تنقل سفلي للوصول السهل على الهاتف المحمول
- **تصفية الكبائن الديناميكية**: تصفية الكبائن حسب السعة (1-3، 4-7، 8-12 ضيف)
- **اختيار نطاق التواريخ**: تقويم تفاعلي لتواريخ الحجز
- **التسعير الفوري**: حساب ديناميكي للأسعار بناءً على التواريخ المختارة
- **إدارة الملف الشخصي**: تحرير كامل للملف الشخصي مع اختيار البلد
- **تاريخ الحجوزات**: عرض وإدارة جميع الحجوزات السابقة والقادمة

## Deployment / النشر

### English

This project is optimized for deployment on Vercel:

```bash
npm run build
npm run start
```

### العربية

هذا المشروع محسن للنشر على Vercel:

```bash
npm run build
npm run start
```

## Contributing / المساهمة

### English

Contributions are welcome! Please feel free to submit a Pull Request.

### العربية

المساهمات مرحب بها! لا تتردد في إرسال طلب سحب.

## License / الترخيص

This project is open source and available under the [MIT License](LICENSE).

هذا المشروع مفتوح المصدر ومتاح تحت [رخصة MIT](LICENSE).
