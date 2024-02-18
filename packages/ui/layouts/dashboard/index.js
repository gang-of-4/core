import { useSettings } from '../../hooks/use-settings';
import { HorizontalLayout } from './horizontal-layout';
import { VerticalLayout } from './vertical-layout';


export function Layout(props) {
  const settings = useSettings();
  const {sections, bgUrl, ...other} = props;

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
      bgUrl={bgUrl}
      navColor={settings.navColor}
      sections={sections}
      {...other} />
  );
}
