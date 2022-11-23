import React, { FC } from 'react';
import { IconsDayEnum } from './constants/day-icons';
import classNames from 'classnames/bind';
import styles from './icon.module.scss';
import { IconsNightEnum } from './constants/night-icons';
import { IconsFlagEnum } from './constants/flag-icons';
import { IconsEnum } from './constants/icons';

const cn = classNames.bind(styles);
const CLASS_NAME = 'Icon';

export type IconColorsType = 'primary' | 'yellow' | 'grey' | 'greyDark' | 'greyLight';

export type IconNameType = keyof typeof IconsDayEnum | keyof typeof IconsNightEnum | keyof typeof IconsFlagEnum | keyof typeof IconsEnum;

export type IconsEnumType = {
    day: any;
    night: any;
    flag: any;
    button: any;
};

type PropsType = {
    name: IconNameType;
    color: IconColorsType;
};

const iconsEnumType: IconsEnumType = {
    day: IconsDayEnum,
    night: IconsNightEnum,
    flag: IconsFlagEnum,
    button: IconsEnum,
};

const Icon: FC<PropsType> = ({ name, color }) => {
    const type = String(name).split('-').shift();

    if (type && iconsEnumType[type as keyof IconsEnumType] && iconsEnumType[type as keyof IconsEnumType][name]) {
        const IconSVG: any = iconsEnumType[type as keyof IconsEnumType][name];
        return <IconSVG className={cn(`${CLASS_NAME}--${color}`, `${CLASS_NAME}--${'size'}`)} />;
    } else {
        return <></>;
    }
};

export default Icon;
