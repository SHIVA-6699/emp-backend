import { TAddressAttributes } from "../../address/address.interface";

export type TBasicProfileAttributes = {
  id?: string;
  userId: string;
  first_name: string;
  last_name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile_image_id?: string | any;
  phone_number?: string;
  phone_verified?: boolean;
  current_address_id?: string;
  permanent_address_id?: string;
  current_address?: TAddressAttributes;
  permanent_address?: TAddressAttributes;
  createdAt?: Date;
  updatedAt?: Date;
};
