
function Home({ children, style,className }) {
	const Logout = () => {
		localStorage.clear()
		window.location.reload();
	}
	return (
			<button
				className={className}
				onClick={Logout}
				style={style}
				>
				{children}
				Logout
				</button>
	)
}
export default Home;