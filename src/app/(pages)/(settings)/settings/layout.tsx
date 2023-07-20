import Navbar from "@/src/components/Navbar/Navbar";

function Layout({ children }: { children: React.ReactNode }) {

	return (
		<main>
			<Navbar />
			{children}
		</main>
	)
};

export default Layout;