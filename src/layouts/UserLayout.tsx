import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useIntl, ConnectProps, connect } from 'umi';
import React from 'react';
import SelectLang from '@/components/SelectLang';
import { ConnectState } from '@/models/connect';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Project THEA Admin</span>
              </Link>
            </div>
            <div className={styles.desc}>Tracking Haulage in East Africa to control COVID-19</div>
          </div>
          {children}
        </div>
		<DefaultFooter copyright={`${new Date().getFullYear()} Project THEA`} 
			links={[
			  {
				key: 'bodastage-solutions',
				title: 'Bodastage Solutions',
				href: 'https://www.bodastage.solutions',
				blankTarget: true,
			  },
			  {
				key: 'university-of-edinburgh',
				title: 'University of Edinburgh',
				href: 'https://www.ed.ac.uk',
				blankTarget: true,
			  },
			  {
				key: 'roslin',
				title: 'The Roslin Institute',
				href: 'https://www.ed.ac.uk/roslin',
				blankTarget: true,
			  },
			  {
				key: 'nihr',
				title: 'NIHR',
				href: 'https://www.nihr.ac.uk',
				blankTarget: true,
			  },
			  {
				key: 'ukri-medical',
				title: 'UKRI Medical Research Council',
				href: 'https://mrc.ukri.org',
				blankTarget: true,
			  },
			  {
				key: 'makerere-university',
				title: 'Makerere University',
				href: 'https://muk.ac.ug',
				blankTarget: true,
			  },
			  {
				key: 'psfu',
				title: 'PSFU',
				href: 'https://www.psfuganda.org',
				blankTarget: true,
			  },
			  {
				key: 'moh',
				title: 'MoH',
				href: 'https://www.health.go.ug/',
				blankTarget: true,
			  },
			]}/>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
