import React from 'react'
import { Switch } from '@headlessui/react'
import classNames from 'classnames'

export interface SwitchGroupProps {
	label: string;
	description: string;
	enabled: boolean;
	setEnabled: (enable: boolean) => void;
}

const SwitchGroup = ({ label, description, enabled, setEnabled }: SwitchGroupProps) => {

	return (
		<Switch.Group as="div" className="flex items-center justify-between">
			<span className="flex flex-grow flex-col">
				<Switch.Label as="span" className="text-sm font-bold text-gray-300" passive>
					{label}
				</Switch.Label>
				<Switch.Description as="span" className="text-xs text-gray-300">
					{description}
				</Switch.Description>
			</span>
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={classNames(
					enabled ? 'bg-indigo-600' : 'bg-[#364150]',
					'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
				)}
			>
				<span
					aria-hidden="true"
					className={classNames(
						enabled ? 'translate-x-5' : 'translate-x-0',
						'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
					)}
				/>
			</Switch>
		</Switch.Group>
	)
}

export default SwitchGroup