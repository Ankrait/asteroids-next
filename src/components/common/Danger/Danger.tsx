import Image from 'next/image';

import warning_img from '../../../app/warning.png';

import styles from './Danger.module.scss';

const Danger = () => {
	return (
		<div className={styles.danger}>
			<Image src={warning_img} alt="warning" width={12} height={12} /> Опасен
		</div>
	);
};

export default Danger;
