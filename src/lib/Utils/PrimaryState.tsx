import React, { useEffect, useState } from 'react';
import { PropertyModel } from 'types/api';
import { PrimarySelect } from './PrimarySelect';
//@ts-ignore
import NaijaStates from 'naija-state-local-government';

export default function PrimaryState({
  register,
  error,
  errors,
  getValues,
  watch,
}: any) {
  const naijaStates = NaijaStates.all();
  const selectedState = getValues('state');
  const [lgas, setLgas] = useState([]);

  //Get Local Government
  useEffect(() => {
    const getLga = async (state: string) => {
      if (state !== undefined) {
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
        name="state"
        options={
          <>
            {naijaStates.map((x: any) => {
              return <option value={x.state}>{x.state}</option>;
            })}
          </>
        }
      />

      {getValues('state') !== undefined ? (
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
