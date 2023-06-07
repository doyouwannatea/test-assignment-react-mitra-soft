import { classNamesFunc } from 'classnames-generics';
import styles from './ErrorStub.module.scss';

const classNames = classNamesFunc<keyof typeof styles>();

type Props = { error: string };

function ErrorStub({ error }: Props) {
  return (
    <div className={classNames(styles.wrapper)}>
      <p className={classNames(styles.error)}>Ошибка</p>
      <p className={classNames(styles['error-text'])}>{error}</p>
    </div>
  );
}

export default ErrorStub;
