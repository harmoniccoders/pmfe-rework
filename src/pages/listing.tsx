import List from 'lib/components/Listing';
import {
    PropertyTitle,
    PropertyType,
    PropertyView,
  } from 'types/api';

  
const Listing =({
    propertyTitles,
    propertyTypes,
    getStates,
    data,
  }: {
    propertyTitles: PropertyType[];
    propertyTypes: PropertyTitle[];
    getStates: any;
    data: PropertyView[];
  }) => {
    return(
        <>
            <List propertyTypes={propertyTypes}
            propertyTitles={propertyTitles}
            getStates={getStates} data={[]}/>
        </>
    )
}

export default Listing