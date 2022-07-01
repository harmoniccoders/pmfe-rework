import React, { useEffect, useState } from 'react';
import { PropertyModel } from 'types/api';
import { PrimarySelect } from './PrimarySelect';
//@ts-ignore
import NaijaStates from 'naija-state-local-government';

type Props = {
  name?: any;
  register: any;
  error: any;
  errors?: any;
  getValues: any;
  watch: any;
};

export default function PrimaryState({
  name,
  register,
  error,
  errors,
  getValues,
  watch,
}: Props) {
  const naijaStates = NaijaStates.all();
  const selectedState = getValues('state');

  const [lgas, setLgas] = useState([]);

  //Get Local Government
  useEffect(() => {
    const getLga = async (state: string) => {
      if (selectedState !== '' && selectedState !== undefined) {
        setLgas(NaijaStates.lgas(state).lgas);
        return;
      }
    };
    getLga(selectedState as unknown as string);
  }, [watch('state')]);

  return (
    <>
      <PrimarySelect<PropertyModel>
        register={register}
        error={error}
        label="State"
        placeholder="Which state in Nigeria is your property located"
        name={name || 'state'}
        options={
          <>
            {naijaStates.map((x: any) => {
              return <option value={x.state}>{x.state}</option>;
            })}
          </>
        }
      />

      {selectedState !== '' && name !== 'location' ? (
        <PrimarySelect<PropertyModel>
          register={register}
          error={errors}
          label="LGA"
          placeholder="Local Government Area"
          name="lga"
          options={
            <>
              {lgas.map((x: any) => {
                return <option value={x}>{x}</option>;
              })}
            </>
          }
        />
      ) : null}
    </>
  );
}
