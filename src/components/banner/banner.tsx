import React, { FC, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './banner.module.scss';
import Icon from '../icon/icon';
import { useTranslation } from 'react-i18next';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Banner';

enum ModeEnum {
    'info' = 'Information',
    'error' = 'Error',
    'warn' = 'Warning',
}

type PropsType = {
    mode: 'info' | 'error' | 'warn';
    value: string;
    onClick?: () => void;
};

const Banner: FC<PropsType> = ({ mode, onClick, value }) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(true);

    const hideMe = () => {
        setShow(false);
    };

    if (!show) {
        return <></>;
    }

    return (
        <div
            className={cn(CLASS_NAME, {
                [`${CLASS_NAME}--isError`]: mode === 'error',
                [`${CLASS_NAME}--isInfo`]: mode === 'info',
                [`${CLASS_NAME}--isWarn`]: mode === 'warn',
            })}
        >
            <div className={cn(`${CLASS_NAME}__header`)}>
                <div className={cn(`${CLASS_NAME}__header__title`)}>{t(ModeEnum[mode])}</div>
                <div className={cn(`${CLASS_NAME}__header__button`)} onClick={hideMe}>
                    <Icon name="button-cancel" color="primary" />
                </div>
            </div>
            <div className={cn(`${CLASS_NAME}__content`)}>{value}</div>
            {onClick && (
                <div className={cn(`${CLASS_NAME}__footer`)}>
                    <button onClick={onClick}>{t('Execute')}</button>
                </div>
            )}
        </div>
    );
};

export default Banner;
