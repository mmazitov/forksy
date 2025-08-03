const Footer = () => {
	const date = new Date().getFullYear();
	return (
		<footer className="bg-[var(--main-color)] mt-auto py-[var(--space)] text-[var(--btn-color)] text-center">
			<p>Forksy @ {date}</p>
		</footer>
	);
};

export default Footer;
