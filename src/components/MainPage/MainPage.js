import React, { useState, useEffect, useCallback } from 'react';
import './MainPage.css';
import TicketCard from '../TicketCard.js/TicketCard';

const MainPage = () => {
	const [allTickets, setAllTickets] = useState([]);
	const [filteredTickets, setFilteredTickets] = useState([]);
	const [users, setUsers] = useState([]);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);
	const [groupBy, setGroupBy] = useState('status');
	const [sortBy, setSortBy] = useState('priority');
	const priorityNames = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

	useEffect(() => {
		fetchData();
	}, []);

  const getUserById = useCallback((userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown User';
  }, [users]); // Include 'users' in the dependency array

	useEffect(() => {
		const groupAndSortTickets = () => {
			let processedTickets = [...allTickets];

			if (groupBy === 'status') {
				const uniqueStatuses = [
					...new Set(allTickets.map((ticket) => ticket.status)),
				];
				processedTickets = uniqueStatuses.map((status) => ({
					columnName: status,
					tickets: allTickets.filter((ticket) => ticket.status === status),
				}));
			} else if (groupBy === 'user') {
				const uniqueUsers = [
					...new Set(allTickets.map((ticket) => ticket.userId)),
				];

				processedTickets = uniqueUsers.map((userId) => ({
					columnName: getUserById(userId),
					tickets: allTickets.filter((ticket) => ticket.userId === userId),
				}));
			} else if (groupBy === 'priority') {
				const uniquePriorities = [
					...new Set(allTickets.map((ticket) => ticket.priority)),
				];
				uniquePriorities.sort().reverse();
				processedTickets = uniquePriorities.map((priority) => ({
					columnName: priority,
					tickets: allTickets.filter((ticket) => ticket.priority === priority),
				}));
			}
			processedTickets.forEach((group) => {
				if (group.tickets) {
					if (sortBy === 'priority') {
						group.tickets.sort((a, b) => b.priority - a.priority);
					} else if (sortBy === 'title') {
						group.tickets.sort((a, b) =>
							(a.title || '').localeCompare(b.title || '')
						);
					}
				}
			});

			setFilteredTickets(processedTickets);
		};

		groupAndSortTickets();
	}, [allTickets, groupBy, sortBy,getUserById]);

	const fetchData = async () => {
		try {
			const response = await fetch(
				'https://api.quicksell.co/v1/internal/frontend-assignment'
			);
			const data = await response.json();
			setAllTickets(data.tickets);
			setUsers(data.users);
			setFilteredTickets(data.tickets);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const renderColumns = () => {
		return (
			<div className='kanbanBoard'>
				{filteredTickets.map((column) => (
					<div
						key={column.name}
						className='kanbanColumn'>
						<div className='columnHeadingContainer'>
							{groupBy === 'priority' ? (
								<div className='columnHeadingText'> {priorityNames[column.columnName]}</div>
							) : (
								<div className='columnHeadingText'> {column.columnName}</div>
							)}
							<div className='columnHeadingCount'>{column && column.tickets && column.tickets.length}</div>
						</div>
						{column.tickets &&
							column.tickets.map((ticket) => (
								<TicketCard
									key={ticket.id}
									ticket={ticket}
								/>
							))}
					</div>
				))}
			</div>
		);
	};
	return (
		<div className='mainBodyContainer'>
			<div className='headerForBody'>
				<div className='displayDropDownContainer'>
					<div
						className='displayContainer'
						onClick={() => {
							setIsDropdownVisible(!isDropdownVisible);
						}}>
						<div className='displayIconContainer'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 48 48'
								id='Filter'>
								<path
									d='M4 10h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2H22.91A6 6 0 0 0 11.09 8H4a1 1 0 0 0 0 2zM17 5a4 4 0 1 1-4 4A4 4 0 0 1 17 5zM44 23H36.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2H25.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM31 28a4 4 0 1 1 4-4A4 4 0 0 1 31 28zM44 38H22.91a6 6 0 0 0-11.82 0H4a1 1 0 0 0 0 2h7.09a6 6 0 0 0 11.82 0H44a1 1 0 0 0 0-2zM17 43a4 4 0 1 1 4-4A4 4 0 0 1 17 43z'
									data-name='Layer 15'
									fill='#909398'
									className='color000000 svgShape'></path>
							</svg>
						</div>
						<div className='displayTextContainer'>
							Display
							<div className='downArrowContainer'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									id='DownArrow'>
									<path
										d='M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z'
										fill='#909398'
										class='color000000 svgShape'></path>
								</svg>
							</div>
						</div>
					</div>
					{isDropdownVisible && (
						<div className='displayFilterDropdown'>
							<label className='dropdownElementContainer'>
								Grouping
								<select
									value={groupBy}
									onChange={(e) => setGroupBy(e.target.value)}>
									<option value='status'>By Status</option>
									<option value='user'>By User</option>
									<option value='priority'>By Priority</option>
								</select>
							</label>

							<label className='dropdownElementContainer'>
								Ordering
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}>
									<option value='priority'>Priority</option>
									<option value='title'>Title</option>
								</select>
							</label>
						</div>
					)}
				</div>
			</div>

			{renderColumns()}
		</div>
	);
};

export default MainPage;
