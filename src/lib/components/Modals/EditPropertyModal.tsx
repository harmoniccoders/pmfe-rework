import EditPropertyForm from 'lib/components/sell/EditPropertyForm';
import { useState } from 'react';
import {
  PropertyModel,
  PropertyTitle,
  PropertyType,
  RentCollectionType,
  TenantType,
} from 'types/api';
import EditRentForm from 'lib/components/rent/EditRentForm';
import Modals from 'lib/Utils/Modals';

interface EditPropertyProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitles: PropertyTitle[];
  propertyTypes: PropertyType[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];
  getBanks: any[];
  item: PropertyModel;
}

function EditPropertyModal({
  isOpen,
  onClose,
  propertyTitles,
  propertyTypes,
  getBanks,
  propertyTenants,
  propertyCollection,
  item,
}: EditPropertyProps) {
  const [formStep, setFormStep] = useState(0);
  return (
    <>
      <Modals
        isOpen={isOpen}
        onClose={onClose}
        pmlogo={true}
        formStep={formStep}
        setFormStep={setFormStep}
        content={
          <>
            {item.isForSale && (
              <EditPropertyForm
                propertyTypes={propertyTypes}
                propertyTitles={propertyTitles}
                formStep={formStep}
                setFormStep={setFormStep}
                onClose={onClose}
                item={item}
                getBanks={getBanks}
              />
            )}
            {item.isForRent && (
              <EditRentForm
                propertyTypes={propertyTypes}
                propertyTitles={propertyTitles}
                propertyTenants={propertyTenants}
                propertyCollection={propertyCollection}
                getBanks={getBanks}
                formStep={formStep}
                setFormStep={setFormStep}
                onClose={onClose}
                item={item}
              />
            )}
          </>
        }
      />
    </>
  );
}

export default EditPropertyModal;
