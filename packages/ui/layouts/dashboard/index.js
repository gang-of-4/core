import PropTypes from 'prop-types';
import { useSettings } from '../../hooks/use-settings';
import { HorizontalLayout } from './horizontal-layout';
import { VerticalLayout } from './vertical-layout';


export const Layout = (props) => {
  const settings = useSettings();
  const {sections, ...other} = props;

  if (settings.layout === 'horizontal') {
    return (
      <HorizontalLayout
        sections={sections}
        navColor={settings.navColor}
        {...other} />
    );
  }

  return (
    <VerticalLayout
      sections={sections}
      navColor={settings.navColor}
      {...other} />
  );
};

Layout.propTypes = {
  children: PropTypes.node
};
