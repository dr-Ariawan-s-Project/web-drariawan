import DateInfo from '../../components/DateInfo';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

const Appointments = [
  { date: '2023-10-25', time: '15:00' },
  { date: '2023-10-25', time: '10:00' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Dropdown = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-blue-800 shadow-sm ring-1 ring-inset ring-gray-300 hover.bg-gray-50">
          {selectedDoctor ? selectedDoctor : 'Pilih Dokter'}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-blue-800"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus-outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  onClick={() => setSelectedDoctor('dr. Almira Mahsa Spog')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  dr. Almira Mahsa Spog
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Appointment = () => {
  const currentDate = new Date(); 
  const upcomingAppointments = Appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date + ' ' + appointment.time);
    return appointmentDate >= currentDate; 
  });

  if (upcomingAppointments.length === 0) {
    return (
      <div className="overflow-x-auto mx-auto w-full mt-2 sm:mt-20 flex-grow lg:px-20 md:px-10 text-start">
        <div className="relative bg-white px-10">
          <p className="py-20 font-lato-bold text-center">
            There are no new appointments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mx-auto w-full mt-2 sm:mt-20 flex-grow lg:px-20 md:px-10 text-start">
      <div className="relative bg-white shadow-xl rounded-2xl px-10">
        {/* dropdown pilih dokter */}
        <div className="text-right pt-10">
          <Dropdown />
        </div>
        <h1 className="py-10 font-lato-bold">Upcoming Appointments</h1>

        <div className="pb-10">
          {upcomingAppointments.map((appointment, index) => (
            <DateInfo
              key={index}
              date={appointment.date}
              time={appointment.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
