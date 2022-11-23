import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './layout.module.scss';
import LanguageSelector from '../language-selector/language-selector';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Layout';

const Layout: FC = ({ children }) => {
    return (
        <div className={cn(CLASS_NAME)}>
            <header className={cn(`${CLASS_NAME}__header`)}>
                <div className={cn(`${CLASS_NAME}__header__container`)}>
                    <LanguageSelector />
                </div>
            </header>
            <main className={cn(`${CLASS_NAME}__main`)}>
                <div className={cn(`${CLASS_NAME}__main__container`)}>{children}</div>
            </main>
            <footer className={cn(`${CLASS_NAME}__footer`)}>
                <div className={cn(`${CLASS_NAME}__footer__container`)}></div>
            </footer>
        </div>
    );
};

export default Layout;
