const Footer = () => {
	const date = new Date().getFullYear();
	return (
		<footer className="bg-[var(--main-color)] mt-auto py-[var(--space)] text-white text-center">
			<p>Forksy @ {date}</p>
		</footer>
	);
};

export default Footer;
