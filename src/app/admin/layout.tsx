import Navbar from '@/src/components/Navbar/Navbar';
import {
	CogIcon,
} from '@heroicons/react/24/outline'

const subNavigation = [
	{ name: 'Account', href: '#', icon: CogIcon, current: false },
	{ name: 'Sessions', href: '#', icon: CogIcon, current: false }
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="relative flex min-h-[100vh] flex-col">
				<Navbar />
				<main className="mx-auto w-full max-w-7xl flex-grow flex px-4 xl:px-8 py-6">
					<div className="lg:grid lg:grid-cols-12 lg:gap-x-5 w-full">
						<aside className="lg:col-span-3">
							<nav className="space-y-1">
								{subNavigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className={'group rounded-md px-3 py-2 flex items-center text-sm font-medium bg-[#1E2936] text-gray-100 hover:text-gray-300'}
										aria-current={item.current ? 'page' : undefined}
									>
										<item.icon
											className={'flex-shrink-0 mr-2 h-6 w-6 text-gray-100 group-hover:text-gray-300'}
											aria-hidden="true"
										/>
										<span className="truncate">{item.name}</span>
									</a>
								))}
							</nav>
						</aside>
						{children}
					</div>
				</main>
			</div>
		</>
	);
}
