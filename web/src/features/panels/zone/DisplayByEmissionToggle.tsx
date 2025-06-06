import ToggleButton, { ToggleButtonOptions } from 'components/ToggleButton';
import { useAtom } from 'jotai';
import { memo, type ReactElement, useCallback } from 'react';
import { LeftPanelToggleOptions } from 'utils/constants';
import { displayByEmissionsAtom } from 'utils/state/atoms';

const options: ToggleButtonOptions<LeftPanelToggleOptions> = [
  {
    value: LeftPanelToggleOptions.ELECTRICITY,
    translationKey: 'country-panel.electricityconsumption',
  },
  {
    value: LeftPanelToggleOptions.EMISSIONS,
    translationKey: 'country-panel.emissions',
  },
];

function EmissionToggle(): ReactElement {
  const [displayByEmissions, setDisplayByEmissions] = useAtom(displayByEmissionsAtom);

  // TODO: perhaps togglebutton should accept boolean values

  const onSetCurrentMode = useCallback(
    (option: LeftPanelToggleOptions | '') => {
      if (option === '') {
        return;
      }
      if (
        (option === LeftPanelToggleOptions.ELECTRICITY && displayByEmissions) ||
        (option === LeftPanelToggleOptions.EMISSIONS && !displayByEmissions)
      ) {
        setDisplayByEmissions(!displayByEmissions);
      }
    },
    [displayByEmissions, setDisplayByEmissions]
  );

  return (
    <div className="mb-4">
      <ToggleButton
        options={options}
        selectedOption={
          displayByEmissions
            ? LeftPanelToggleOptions.EMISSIONS
            : LeftPanelToggleOptions.ELECTRICITY
        }
        onToggle={onSetCurrentMode}
        transparentBackground={false}
      />
    </div>
  );
}

export default memo(EmissionToggle);
