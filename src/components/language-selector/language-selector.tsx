import React, { FC, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './language-selector.module.scss';
import Icon from '../icon/icon';
import { useTranslation } from 'react-i18next';

const cn = classNames.bind(styles);
const CLASS_NAME = 'LanguageSelector';

const LanguageSelector: FC = () => {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState<'ru' | 'en'>(i18n.language as 'ru' | 'en');

    const clickHandler = () => {
        const switchToLng = language === 'ru' ? 'en' : 'ru';
        setLanguage(switchToLng);
        i18n.changeLanguage(switchToLng);
    };

    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__flag`)}>
                <Icon name="flag-russia" color="primary" />
            </div>
            <div onClick={clickHandler}>
                <div
                    className={cn(`${CLASS_NAME}__slider`, {
                        [`${CLASS_NAME}__slider--isRussian`]: language === 'ru',
                        [`${CLASS_NAME}__slider--isEnglish`]: language === 'en',
                    })}
                >
                    <div className={cn(`${CLASS_NAME}__slider__thumb`)}></div>
                </div>
            </div>
            <div className={cn(`${CLASS_NAME}__flag`)}>
                <Icon name="flag-usa" color="primary" />
            </div>
        </div>
    );
};

export default LanguageSelector;
