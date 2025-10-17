export interface InitialStateType {
  id: Number;
  name: string;
  username: string;
  email: string;
  address: addressType;
  phone: string;
  website: string;
  company: companyType;
}
export interface addressType {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: geoType;
}

export interface geoType {
  lat: string;
  lng: string;
}

export interface companyType {
  name: string;
  catchPhrase: string;
  bs: string;
}
