import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames/bind';
import styles from './current-stats.module.scss';
import State, { StateType } from '../state/state';
import Skeleton from 'react-loading-skeleton';

const cn = classNames.bind(styles);
const CLASS_NAME = 'CurrentStats';

type PropsType = {
    stats: Array<StateType>;
};

export const CurrentStatsSkeleton: FC = () => {
    const Wrapper = ({ children }: PropsWithChildren<unknown>) => {
        return (
            <div className={cn(`${CLASS_NAME}__item`)} style={{ padding: '10px' }}>
                {children}
            </div>
        );
    };

    return <Skeleton containerClassName={cn(`${CLASS_NAME}`)} wrapper={Wrapper} width="100px" height="50px" count={6} />;
};

const CurrentStats: FC<PropsType> = ({ stats }) => {
    return (
        <div className={cn(CLASS_NAME)}>
            {stats.map((item) => {
                return (
                    <div key={item.title} className={cn(`${CLASS_NAME}__item`)}>
                        <State data={item} />
                    </div>
                );
            })}
        </div>
    );
};

export default CurrentStats;
