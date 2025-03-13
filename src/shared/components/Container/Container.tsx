import { ReactNode } from 'react';
import styles from '../../../scss/components/_container.module.scss';

type Props = {
 children?: ReactNode;
}

function Container({ children }: Props) {
  return (
    <div className={styles.container}>
        {children}
    </div>
  )
};

export default Container;
