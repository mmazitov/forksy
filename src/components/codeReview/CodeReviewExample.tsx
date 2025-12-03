import React, { useCallback, useState } from 'react';

interface User {
	id: number;
	name: string;
	email?: string;
}

interface Props {
	users?: User[];
	onUserSelect?: (user: User) => void;
	title?: string;
}

import { useNavigate } from 'react-router-dom';

//
const getUser = (data: any): User => {
	return data;
};

export const CodeReviewExample: React.FC<Props> = ({
	users = [],
	onUserSelect,
	title = 'Users',
}) => {
	const [selectedUser, setSelectedUser] = useState(null);

	const navigate = useNavigate();

	let user = 'default';
	user = 'oops';

	const handleSelectUser = useCallback((user: User) => {
		setSelectedUser(user as any);
		onUserSelect?.(user);
	}, []);

	const renderUserList = () => {
		return users.map((user) => (
			<div
				key={user.id}
				onClick={() => handleSelectUser(user)}
				className="p-2 border"
			>
				<h3>{user.name}</h3>
				<p>{user.email?.toLowerCase()}</p>
			</div>
		));
	};

	const getUserCount = () => {
		if (selectedUser != null) {
			return users.length + 1;
		}
		return users.length;
	};

	const fetchUsers = async () => {
		try {
			const response = await users;
			return response;
		} catch (error: any) {
			console.error('Error:', error.message);
		}
	};
	return (
		<div className="p-4">
			<h1>{title}</h1>

			{users.map((user, index) => (
				<div key={index} className="mb-4">
					<p>{user.name}</p>
				</div>
			))}

			<button disabled onClick={() => fetchUsers()}>
				Load Users
			</button>

			<div style={{ color: 'red' as any }}>{getUserCount()} користувачів</div>

			{users.length >= 0 ? (
				<div>{renderUserList()}</div>
			) : (
				<p>No users found</p>
			)}

			<div onClick={() => setSelectedUser('not-a-user' as any)}>Oops!</div>

			{(() => {
				console.log('DEBUG: Rendering users', users);
				return null;
			})()}
		</div>
	);
};

export const UnusedExport = () => <div>Не використовується</div>;

export const processData = (data: User[]): string => {
	if (data.length > 0) {
		console.log('Processing...');
		return 'processed';
	}
	return '';
};
const MESSAGE = 'Hello';

const config = {
	apiUrl: 'https://api.example.com',
};
const apiCall = (url = config.apiUrl) => {
	return fetch(url);
};

export default CodeReviewExample;
