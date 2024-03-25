import "./header.scss";
import logo from "./logo_vclients.svg";

function Header() {
	return (
		<header className="header">
			<a href="/" className="logo">
				<img width={140} src={logo} alt="logo" />
			</a>
			<nav>
				<ul className="header__list">
					<li className="header__link header__link_active">
						<a href="/">Расписание</a>
					</li>
					<li className="header__link">
						<a href="/">История</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
