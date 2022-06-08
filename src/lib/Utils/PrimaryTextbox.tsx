import { 
    FormControl,
    FormLabel,
    Text, 
    Textarea,
 } from '@chakra-ui/react';

 import {FieldError, UseFormRegister, Path} from 'react-hook-form'
 import { Register } from './../../types/api/register';
   
 interface FormInputProps<TFormValues extends Record<string, unknown>>{
     name: Path<TFormValues>;
     placeholder?: string;
     label?: string;
     register: UseFormRegister<TFormValues>;
     error: FieldError | undefined;
     type: string;
     required?: boolean;
     disableLabel?: boolean;
     validate?: any;
     icon?: any;
     variant?: string;
     borderColor?: string;
     borderRadius?: string;
     placeholderColor?: string;
     defaultValue: string | number | undefined;
     format?: string;
     value?: string | number | undefined;
     testId?: string;
     w?: string;
     padding?: string;
     onChange?: any;
 }

 export const PrimaryTextbox = <TFormValues extends Record<string, any>>({
     name,
     required = false,
     label = '',
     register,
     validate = {},
     error,
     disableLabel = false,
     placeholder = '',
     defaultValue, 
} : FormInputProps<TFormValues>) =>{
    return(
        <FormControl>
            <FormLabel
            htmlFor={label}
            textTransform="capitalize"
            pos='relative'
            top={5}
            left={4}
            width='fit-content'
            zIndex={3}
            bg='brand.200'
            >
                {label}
            </FormLabel>
            <Textarea
            placeholder={placeholder}
            variant='outline'
            {...register(name, { required, ...validate })}
            defaultValue={defaultValue}
            disabled={disableLabel}
            />
            <Text fontSize='.7rem' color='red'>
                {(error?.type === 'required' && `${label} is required`) ||
                error?.message}
            </Text>
        </FormControl>
    )
}