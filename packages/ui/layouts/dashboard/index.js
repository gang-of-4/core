import { useSettings } from '../../hooks/use-settings';
import { HorizontalLayout } from './horizontal-layout';
import { VerticalLayout } from './vertical-layout';


export function Layout(props) {
  const settings = useSettings();
  const { auth, sections, bgUrl, ...other } = props;

  if (settings.layout === 'horizontal') {
    return (
      <HorizontalLayout
        navColor={settings.navColor}
        sections={sections}
        {...other} />
    );
  }

  return (
    <VerticalLayout
      auth={auth}
      bgUrl={bgUrl}
      navColor={settings.navColor}
      sections={sections}
      {...other} />
  );
}
