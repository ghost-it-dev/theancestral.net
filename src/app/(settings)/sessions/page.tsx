import { getUserFromSession, getUserSessions } from '@/src/actions/user'
import Section from '@/src/components/Section'
import { ComputerDesktopIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import { redirect } from 'next/navigation'
import moment from 'moment'
import { cookies } from 'next/headers'
import getAgentInfo from '@/src/lib/getAgentInfo'
import LogoutSession from './LogoutSession'

export default async function Page() {
	const user = await getUserFromSession();
	const sessions = await getUserSessions();

	if (!user) redirect('/')

	return (
		<>
			<div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
				<Section title='Browser Sessions' description='Manage and logout your active sessions on other browsers and devices.'>
					<div className='flex flex-col gap-2'>
						{sessions.map(session => (
							<div key={session._id.toString()} className='w-full p-3 flex justify-between items-center rounded-md bg-transparent border border-[#1F2C37] shadow-md'>
								<div className='flex items-center flex-row gap-2'>
									{/* Change this icon depending on if its a phone or desktop */}
									{getAgentInfo(session.userAgent).platform === 'iPhone' || getAgentInfo(session.userAgent).platform === 'Android' ? (
										<DevicePhoneMobileIcon className='h-6 w-6 text-gray-300' />
									) : (
										<ComputerDesktopIcon className='h-6 w-6 text-gray-300' />
									)}
									<div className='flex flex-col'>
										<span className='text-xl text-gray-100 font-medium'>{getAgentInfo(session.userAgent).platform} - {getAgentInfo(session.userAgent).browser}</span>
										<span className='text-xs text-gray-300'>0.0.0.0 - {moment(session.lastUsed).fromNow()}</span>
									</div>
								</div>
								{/* Logout if it is any other session than the current */}
								{session._id.toString() !== cookies().get('session')?.value && (
									<LogoutSession sessionId={session._id.toString()} />
								)}
							</div>
						))}
					</div>
				</Section>
			</div>
		</>
	)
}
