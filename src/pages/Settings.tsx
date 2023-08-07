import { NativeSelect, TextInput } from '@mantine/core';
import { AccountCurrencySelect } from 'entities/accounts';
import { viewerModel } from 'entities/viewer';
import { FocusEvent } from 'react';
import { Flex } from 'shared/ui';
import { withPrivateGuard } from './utils/withPrivateGuard';

const startDayList: viewerModel.StartDay[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];
const startDayOptions = startDayList.map(
  (item) =>
    ({
      label: `${item}`,
      value: `${item}`,
    } as const)
);

const Settings = () => {
  const me = viewerModel.api.useMeQuery();
  const [updateMeMutation, updateMe] = viewerModel.api.useUpdateMeMutation();
  const handleBlur =
    (property: keyof viewerModel.UpdateMeRequestDto) =>
    (ev: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const currentValue = me.currentData?.[property];
      let value: string | number = ev.target.value;

      if (typeof currentValue === 'number') {
        value = Number(value);
      }

      if (me.currentData?.[property] === value) return;

      updateMeMutation({ updateMeRequestDto: { [property]: value } });
    };

  if (!me.currentData) return null;

  return (
    <Flex direction="column" gap={16}>
      <TextInput
        label="First name"
        defaultValue={me.currentData.firstName}
        onBlur={handleBlur('firstName')}
        disabled={updateMe.isLoading}
      />
      <TextInput
        label="Last name"
        defaultValue={me.currentData.lastName}
        onBlur={handleBlur('lastName')}
        disabled={updateMe.isLoading}
      />
      <AccountCurrencySelect
        defaultValue={me.currentData.mainCurrency}
        onBlur={handleBlur('mainCurrency')}
        disabled={updateMe.isLoading}
      />
      <NativeSelect
        label="Start day"
        data={startDayOptions}
        defaultValue={me.currentData.startDay}
        onBlur={handleBlur('startDay')}
      />
    </Flex>
  );
};

export default withPrivateGuard(Settings);
