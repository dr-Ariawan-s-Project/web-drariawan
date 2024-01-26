import { MyProfile } from "../patient/types";
import { IUser } from "./types";

export const sampleUsers: IUser[] = [
  {
    id: 1,
    name: "john doe",
    email: "jhondoe@email.com",
    phone: "",
    role: "admin",
    picture: "",
    specialization: "admin",
  },
  {
    id: 9,
    name: "super admin",
    email: "superadmin@email.com",
    phone: "0812345",
    role: "superadmin",
    picture: "",
    specialization: "",
  },
  {
    id: 12,
    name: "dr.Bagas Dhitya Taufiqqi, Sp.OG",
    email: "drbagas@mail.com",
    phone: "085646434",
    role: "dokter",
    picture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    specialization: "Dokter spesialis Obstetri dan Ginekologi",
  },
  {
    id: 15,
    name: "fakhry",
    email: "fakhry@mail.com",
    phone: "085646434",
    role: "suster",
    picture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    specialization: "suster",
  },
  {
    id: 16,
    name: "dr. Rachman Kamil, Sp.OG",
    email: "r.kamil@mail.com",
    phone: "085646434719",
    role: "dokter",
    picture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    specialization: "Dokter spesialis Obstetri dan Ginekologi",
  },
];

export const sampleDoctors: IUser[] = [
  {
    id: 12,
    name: "dr.Bagas Dhitya Taufiqqi, Sp.OG",
    email: "drbagas@mail.com",
    phone: "085646434",
    role: "dokter",
    picture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    specialization: "Dokter spesialis Obstetri dan Ginekologi",
  },
  {
    id: 16,
    name: "dr. Rachman Kamil, Sp.OG",
    email: "r.kamil@mail.com",
    phone: "085646434719",
    role: "dokter",
    picture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    specialization: "Dokter spesialis Obstetri dan Ginekologi",
  },
];

export const sampleProfile: IUser = {
  id: 16,
  name: "dr. John Doe, Sp.OG",
  email: "johndoe@mail.com",
  phone: "085646434719",
  role: "dokter",
  picture:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  specialization: "Dokter spesialis Obstetri dan Ginekologi",
};

export const patientProfile: MyProfile = {
  id: "237071bb-908a-4f5c-8c7a-922bf7d68715",
  name: "patient 123",
  email: "patient123@mail.com",
  nik: "zOnYvcDSYVHyBwgknIeyUprbKQsm9Bdn5cwFxAGpf+9o7ZC486NcgA==",
  dob: "2020-01-01",
  phone: "08123456235",
  gender: "male",
  marriage_status: "married",
  nationality: "indonesia",
};
