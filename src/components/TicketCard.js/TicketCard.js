// components/TicketCard.js
import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket }) => {
	return (
		<div className='ticketCard'>
			<div className='ticketIdAndImagContainer'>
				<div className='ticketIdContainer'>{ticket.id}</div>
				<div className='ticketImageContainer'>
					<img
						className='ticketImage'
						src='https://source.unsplash.com/random/1920x1080/?wallpaper,landscape'
						alt='images'
					/>
					<div className='statusIndicator'></div>
				</div>
			</div>
			<div className='ticketNameContainer'>{ticket.title}</div>
			<div className='featureRequestContainer'>
				<div className='featureRequestIconContainer'>
					<svg
						viewBox='0 0 16 16'
						xmlns='http://www.w3.org/2000/svg'
						fill='#6b6f76'
						class='bi bi-exclamation-square-fill'>
						<g
							id='SVGRepo_bgCarrier'
							stroke-width='0'></g>
						<g
							id='SVGRepo_tracerCarrier'
							stroke-linecap='round'
							stroke-linejoin='round'></g>
						<g id='SVGRepo_iconCarrier'>
							<path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'></path>{' '}
						</g>
					</svg>
				</div>
				<div className='featureRequestTextContainer'>
          <div className='featureRequestStatus'></div>
          <div className='featureRequestText'>
            Feature Request
          </div>
				</div>
			</div>
		</div>
	);
};

export default TicketCard;
