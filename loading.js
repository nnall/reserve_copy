import React from 'react';
import { Spinner } from 'baseui/spinner';
import { useStyletron } from 'baseui';
import Logo from './images/noWordLogo.png';

const LoadingComponent = () => {
	const [css, theme] = useStyletron();
	return (
		<div
			className={css({
				position: 'relative', // Container should be relative
				alignItems: 'center',
				display: 'flex',
				justifyContent: 'center', // Center content horizontally
				marginTop: '250px',
				flexDirection: 'column',
			})}
		>
			<img
				src={Logo}
				className="img-fluid bg-transparent"
				style={{ height: '250px', width: '250px'}}
				alt="Gowithgig"
			/>
			<Spinner
				$borderWidth={theme.sizing.scale100}
				$size={theme.sizing.scale1600}
				className={css({
					position: 'absolute', // Position spinner absolutely
				})}
			/>
			<div
				className={css({
					...theme.typography.HeadingXSmall,
					paddingBlockStart: theme.sizing.scale650,
					paddingBlockEnd: theme.sizing.scale500,
				})}
			>
				Loading...
			</div>
		</div>

	);
};

export default LoadingComponent;
