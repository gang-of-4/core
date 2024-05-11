import { useSettings } from '../../hooks/use-settings';
import { VerticalLayout } from './vertical-layout';


export function Layout(props) {
  const settings = useSettings();
  const { auth, sections, bgUrl, ...other } = props;

  return (
    <VerticalLayout
      auth={auth}
      bgUrl={bgUrl}
      navColor={settings.navColor}
      sections={sections}
      {...other} />
  );
}
