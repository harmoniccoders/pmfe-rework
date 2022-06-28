import Form from 'lib/components/sell/Form';
import Modals from 'lib/Utils/Modals';
import { useState } from 'react';
import { PropertyTitle, PropertyType } from 'types/api';

interface AddPropertyProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  getBanks: any;
}

function AddPropertyModal({
  isOpen,
  onClose,
  propertyTitles,
  propertyTypes,
  getBanks,
}: AddPropertyProps) {
  const [formStep, setFormStep] = useState(0);
  return (
    <Modals
      isOpen={isOpen}
      onClose={onClose}
      pmlogo={true}
      formStep={formStep}
      setFormStep={setFormStep}
      content={
        <>
          <Form
            propertyTypes={propertyTypes}
            propertyTitles={propertyTitles}
            formStep={formStep}
            setFormStep={setFormStep}
            onClose={onClose}
            getBanks={getBanks}
          />
        </>
      }
    />
  );
}

export default AddPropertyModal;
