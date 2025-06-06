import { useEvents, useTrackEvent } from 'hooks/useTrackEvent';
import { useTranslation } from 'react-i18next';

import { getContributors } from './util';

export default function Attribution({ zoneId }: { zoneId: string }) {
  const { t } = useTranslation();
  const contributors = getContributors(zoneId);

  return (
    <div className="flex flex-col gap-3 pt-1.5">
      {contributors.length > 0 && (
        <div className="flex flex-row justify-between">
          <div className="text-sm font-semibold">{t('country-panel.helpfrom')}</div>
          <ContributorList contributors={contributors} />
        </div>
      )}
    </div>
  );
}

function ContributorList({ contributors }: { contributors: string[] }) {
  const trackEvent = useTrackEvent();
  const { trackContributorAvatar } = useEvents(trackEvent);

  return (
    <div className="flex flex-wrap gap-1">
      {contributors.map((contributor) => (
        <a
          key={contributor}
          href={`https://github.com/${contributor}`}
          rel="noopener noreferrer"
          target="_blank"
          onClick={trackContributorAvatar}
        >
          <img
            src={`https://avatars.githubusercontent.com/${contributor}?s=20`} // loads the avatar image at a default size of 20px
            srcSet={`https://avatars.githubusercontent.com/${contributor}?s=40 2x`} // loads the avatar image at a default size of 40px for high resolution displays
            alt={contributor}
            height="20"
            width="20"
            loading="lazy" // makes sure the image don't load until the user scrolls down
            className="rounded-full"
          />
        </a>
      ))}
    </div>
  );
}
