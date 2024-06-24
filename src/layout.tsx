import {FC, useMemo} from "react";
import {Outlet, Link, useLocation} from 'react-router-dom'

import routes from '@/router';
import {Dropdown} from 'antd';
import type {MenuProps} from 'antd';

interface ILayout {}

const Layout: FC<ILayout> = () => {
    const location = useLocation();

    const items: MenuProps['items'] = useMemo(() => {
        return routes[2].children?.filter((item:any) => item.isMenu).map((route:any) => {
            return {
                key: route.path!,
                label: <Link to={route.path || '/'}>{route.name!}</Link>
            }
        });
    }, [routes])

  return (
    <div>
        <Dropdown menu={{ items }}>
            <span>{location.pathname}</span>
        </Dropdown>
        <Outlet/>
    </div>
  );
};

export default Layout;