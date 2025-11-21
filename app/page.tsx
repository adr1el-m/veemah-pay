import Image from 'next/image';
import heroImg from '@/assets/img/hanzlwi.jpg';
import logo from '../assets/img/veemahpay-logo.png';

export default function Page() {
  return (
    <main>
      <header className="site-header">
        <div className="inner container">
          <div className="brand">
            <Image src={logo} alt="VeemahPay" width={220} height={60} priority />
          </div>
          <nav className="top-nav">
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
          </nav>
        </div>
        <div className="inner container">
          <Image src={heroImg} alt="VeemahPay hero" style={{ width: '100%', height: 'auto', borderRadius: 12 }} priority />
        </div>
      </header>

      
    </main>
  );
}