import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/images/Disney+_logo.svg'

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href="/"><Image src={logo} alt="Disney Logo" width={90} height={50} /></Link>
    </div>
  )
}

export default Navbar