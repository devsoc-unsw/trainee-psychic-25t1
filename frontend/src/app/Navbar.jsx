
export default function Navbar() {
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-72 p-4 shadow">
            <li><a>HOME</a></li>
            <li><a>LEADERBOARD</a></li>
            <li><a>PROFILE</a></li>
          </ul>
        </div>

        <a className="btn btn-ghost text-xl">tentative name 🤺</a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>HOME</a></li>
          <li><a>LEADERBOARD</a></li>
          <li><a>PROFILE</a></li>
        </ul>
      </div>
    </div>
  )
}