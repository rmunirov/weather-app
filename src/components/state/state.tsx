import React, { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './state.module.scss';

const cn = classNames.bind(styles);
const CLASS_NAME = 'State';

export type StateType = {
    title: string;
    value: string;
};

type PropsType = {
    data: StateType;
};

const State: FC<PropsType> = ({ data }) => {
    return (
        <div className={cn(CLASS_NAME)}>
            <div className={cn(`${CLASS_NAME}__value`)}>{data.value}</div>
            <div className={cn(`${CLASS_NAME}__title`)}>{data.title}</div>
        </div>
    );
};

export default State;
