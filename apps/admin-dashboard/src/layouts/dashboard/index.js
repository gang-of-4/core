import PropTypes from 'prop-types';
import { useSettings } from '../../hooks/use-settings';
import { VerticalLayout } from './vertical-layout';
import { getSections } from './config';
import { withAuthGuard } from '../../hocs/with-auth-guard';


export const Layout = withAuthGuard((props) => {
  const settings = useSettings();
  const sections = getSections();

  return (
    <VerticalLayout
      sections={sections}
      navColor={settings.navColor}
      {...props} />
  );
}, {role: 'admin'});

Layout.propTypes = {
  children: PropTypes.node
};
