import { IBook } from './types';

export const sampleBooks: IBook[] = [
  {
    id: '8ed029f3-5fda-4091-a493-fca9af233b71',
    booking_code: 'HL0AV14LUPDR',
    patient_id: '00ec7209-de28-4b14-bbd5-3d23ebebd758',
    schedule_id: 20,
    booking_date: '2024-01-15T00:00:00+07:00',
    state: 'confirmed',
    created_at: '2024-01-10T16:09:13+07:00',
    updated_at: '2024-01-10T16:09:13+07:00',
    deleted_at: null,
    patient: {
      patient_id: '00ec7209-de28-4b14-bbd5-3d23ebebd758',
      name: 'Almira Mahsa',
      email: 'almiramahsa9@gmail.com',
    },
    schedule: {
      schedule_id: 20,
      user_id: 12,
      health_care_address: 'Kebayoran Lama, Jakarta',
      day: 'Senin',
      time_start: '13:00',
      time_end: '13:40',
      user: {
        id: 12,
        name: 'dr.Bagas Dhitya Taufiqqi, Sp.OG',
        picture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        specialization: 'Dokter spesialis Obstetri dan Ginekologi',
      },
    },
  },
  {
    id: 'c981284f-6be0-42b7-a2fb-163c87c3e934',
    booking_code: 'JBYWW0OCHEHP',
    patient_id: '237071bb-908a-4f5c-8c7a-922bf7d68715',
    schedule_id: 20,
    booking_date: '2024-01-22T00:00:00+07:00',
    state: 'confirmed',
    created_at: '2024-01-09T13:49:38+07:00',
    updated_at: '2024-01-09T13:49:38+07:00',
    deleted_at: null,
    patient: {
      patient_id: '237071bb-908a-4f5c-8c7a-922bf7d68715',
      name: 'patient 123',
      email: 'patient123@mail.com',
    },
    schedule: {
      schedule_id: 20,
      user_id: 12,
      health_care_address: 'Kebayoran Lama, Jakarta',
      day: 'Senin',
      time_start: '13:00',
      time_end: '13:40',
      user: {
        id: 12,
        name: 'dr.Bagas Dhitya Taufiqqi, Sp.OG',
        picture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        specialization: 'Dokter spesialis Obstetri dan Ginekologi',
      },
    },
  },
  {
    id: '4e34a5cb-112c-4dc8-833f-8a77072e69d9',
    booking_code: 'AUCFUQGCMI8T',
    patient_id: '237071bb-908a-4f5c-8c7a-922bf7d68715',
    schedule_id: 20,
    booking_date: '2024-02-19T00:00:00+07:00',
    state: 'confirmed',
    created_at: '2024-01-09T13:48:32+07:00',
    updated_at: '2024-01-09T13:48:32+07:00',
    deleted_at: null,
    patient: {
      patient_id: '237071bb-908a-4f5c-8c7a-922bf7d68715',
      name: 'patient 123',
      email: 'patient123@mail.com',
    },
    schedule: {
      schedule_id: 20,
      user_id: 12,
      health_care_address: 'Kebayoran Lama, Jakarta',
      day: 'Senin',
      time_start: '13:00',
      time_end: '13:40',
      user: {
        id: 12,
        name: 'dr.Bagas Dhitya Taufiqqi, Sp.OG',
        picture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        specialization: 'Dokter spesialis Obstetri dan Ginekologi',
      },
    },
  },
  {
    id: '95e8564b-a00a-4a8b-9a50-1699b52295e9',
    booking_code: 'EKMKN030RULO',
    patient_id: '237071bb-908a-4f5c-8c7a-922bf7d68715',
    schedule_id: 32,
    booking_date: '2024-01-09T00:00:00+07:00',
    state: 'confirmed',
    created_at: '2024-01-08T19:47:33+07:00',
    updated_at: '2024-01-08T19:47:33+07:00',
    deleted_at: null,
    patient: {
      patient_id: '237071bb-908a-4f5c-8c7a-922bf7d68715',
      name: 'patient 123',
      email: 'patient123@mail.com',
    },
    schedule: {
      schedule_id: 32,
      user_id: 16,
      health_care_address: 'Jalan Tunjungan, Surabaya',
      day: 'Selasa',
      time_start: '19:00',
      time_end: '22:00',
      user: {
        id: 16,
        name: 'dr. Rachman Kamil, Sp.OG',
        picture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        specialization: 'Dokter spesialis Obstetri dan Ginekologi',
      },
    },
  },
  {
    id: 'e77bedfd-aa86-46d7-989a-7bf22cd848e3',
    booking_code: '8Q3RRKZWEPHA',
    patient_id: '637ca7af-66dc-44d0-a3c9-1de0e4f10951',
    schedule_id: 23,
    booking_date: '2024-01-25T00:00:00+07:00',
    state: 'confirmed',
    created_at: '2023-12-18T08:36:30+07:00',
    updated_at: '2023-12-18T08:36:30+07:00',
    deleted_at: null,
    patient: {
      patient_id: '637ca7af-66dc-44d0-a3c9-1de0e4f10951',
      name: 'Jane Doe',
      email: 'janeedoe@mailinator.com',
    },
    schedule: {
      schedule_id: 23,
      user_id: 16,
      health_care_address: 'Jalan Tunjungan, Surabaya',
      day: 'Kamis',
      time_start: '10:00',
      time_end: '12:40',
      user: {
        id: 16,
        name: 'dr. Rachman Kamil, Sp.OG',
        picture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        specialization: 'Dokter spesialis Obstetri dan Ginekologi',
      },
    },
  },
  {
    id: '5e13a0af-e371-4889-993d-650005067b5a',
    booking_code: 'PZAXZUXN8G72',
    patient_id: '637ca7af-66dc-44d0-a3c9-1de0e4f10951',
    schedule_id: 24,
    booking_date: '2023-12-22T00:00:00+07:00',
    state: 'confirmed',
    created_at: '2023-12-18T08:35:07+07:00',
    updated_at: '2023-12-18T08:35:07+07:00',
    deleted_at: null,
    patient: {
      patient_id: '637ca7af-66dc-44d0-a3c9-1de0e4f10951',
      name: 'Jane Doe',
      email: 'janeedoe@mailinator.com',
    },
    schedule: {
      schedule_id: 24,
      user_id: 16,
      health_care_address: 'Jalan Tunjungan, Surabaya',
      day: 'Jumat',
      time_start: '10:00',
      time_end: '14:00',
      user: {
        id: 16,
        name: 'dr. Rachman Kamil, Sp.OG',
        picture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        specialization: 'Dokter spesialis Obstetri dan Ginekologi',
      },
    },
  },
  {
    id: 'be1cb802-d031-4174-8e4a-475b2915e884',
    booking_code: 'ROKC276L3KY4',
    patient_id: '1d599e93-d5e2-4fb9-a566-509be0c1f798',
    schedule_id: 22,
    booking_date: '2023-11-27T00:00:00+07:00',
    state: 'confirmed',
    created_at: '2023-12-05T13:51:54+07:00',
    updated_at: '2023-12-05T13:51:54+07:00',
    deleted_at: null,
    patient: {
      patient_id: '1d599e93-d5e2-4fb9-a566-509be0c1f798',
      name: 'Kamil',
      email: 'b26g232ar@mozmail.com',
    },
    schedule: {
      schedule_id: 22,
      user_id: 16,
      health_care_address: 'Jalan Tunjungan, Surabaya',
      day: 'Rabu',
      time_start: '10:00',
      time_end: '12:40',
      user: {
        id: 16,
        name: 'dr. Rachman Kamil, Sp.OG',
        picture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        specialization: 'Dokter spesialis Obstetri dan Ginekologi',
      },
    },
  },
  {
    id: '5c70df60-d2be-4b1e-88b3-12cbc52263bd',
    booking_code: '0Y5JBD4GT6HI',
    patient_id: '1d599e93-d5e2-4fb9-a566-509be0c1f798',
    schedule_id: 22,
    booking_date: '2023-12-08T00:00:00+07:00',
    state: 'confirmed',
    created_at: '2023-12-05T13:45:31+07:00',
    updated_at: '2023-12-05T13:45:31+07:00',
    deleted_at: null,
    patient: {
      patient_id: '1d599e93-d5e2-4fb9-a566-509be0c1f798',
      name: 'Kamil',
      email: 'b26g232ar@mozmail.com',
    },
    schedule: {
      schedule_id: 22,
      user_id: 16,
      health_care_address: 'Jalan Tunjungan, Surabaya',
      day: 'Rabu',
      time_start: '10:00',
      time_end: '12:40',
      user: {
        id: 16,
        name: 'dr. Rachman Kamil, Sp.OG',
        picture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        specialization: 'Dokter spesialis Obstetri dan Ginekologi',
      },
    },
  },
  {
    id: '6a5d829f-e855-46ec-bd57-06ba5e04f9e2',
    booking_code: 'JDCX6U0IIU87',
    patient_id: '9a2b58a9-2186-439f-9082-b9a8e606e4d1',
    schedule_id: 20,
    booking_date: '2023-12-12T00:00:00+07:00',
    state: 'confirmed',
    created_at: '2023-11-17T10:53:17+07:00',
    updated_at: '2023-12-04T23:23:30+07:00',
    deleted_at: null,
    patient: {
      patient_id: '9a2b58a9-2186-439f-9082-b9a8e606e4d1',
      name: 'John Doee',
      email: 'johndoe21@gmail.com',
    },
    schedule: {
      schedule_id: 20,
      user_id: 12,
      health_care_address: 'Kebayoran Lama, Jakarta',
      day: 'Senin',
      time_start: '13:00',
      time_end: '13:40',
      user: {
        id: 12,
        name: 'dr.Bagas Dhitya Taufiqqi, Sp.OG',
        picture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        specialization: 'Dokter spesialis Obstetri dan Ginekologi',
      },
    },
  },
  {
    id: 'ff2e11c9-e9cf-4fbd-904b-dad1838fab1d',
    booking_code: '0QQD13U2YIDE',
    patient_id: '9a2b58a9-2186-439f-9082-b9a8e606e4d1',
    schedule_id: 14,
    booking_date: '2024-05-08T00:00:00+07:00',
    state: 'confirmed',
    created_at: '2023-11-14T13:24:15+07:00',
    updated_at: '2023-11-14T13:24:15+07:00',
    deleted_at: null,
    patient: {
      patient_id: '9a2b58a9-2186-439f-9082-b9a8e606e4d1',
      name: 'John Doee',
      email: 'johndoe21@gmail.com',
    },
    schedule: {
      schedule_id: 14,
      user_id: 11,
      health_care_address: 'Jalan Tunjungan, Surabaya',
      day: 'Rabu',
      time_start: '10:00',
      time_end: '16:00',
      user: {
        id: 11,
        name: 'Almira Mahsa',
        picture:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        specialization: 'obgyn',
      },
    },
  },
];