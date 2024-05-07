import { NavLink, Link } from "react-router-dom";
import "./header.scss";
import logo from "./logo_vclients.svg";

function Header() {
	return (
		<header className="header">
			<Link to="/" className="logo">
				<img width={140} src={logo} alt="logo" />
			</Link>
			<nav>
				<ul className="header__list">
					<li className="header__link">
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? "header__link_active" : ""
							}
						>
							Расписание
						</NavLink>
					</li>
					<li className="header__link">
						<NavLink
							to="/history"
							className={({ isActive }) =>
								isActive ? "header__link_active" : ""
							}
						>
							История
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
