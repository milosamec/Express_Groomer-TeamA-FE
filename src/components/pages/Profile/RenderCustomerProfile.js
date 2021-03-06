import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Avatar, Button, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CustomerInfo from './CustomerInfo';
import CustomerEditInfo from './CustomerEditInfo';
import PetCard from './PetCard';
import AppointmentCard from './AppointmentCard';
import CustomerAddPet from './CustomerAddPet';
import convertISODate from '../../../utils/convertiso';
import './profile.css';

// Ant Design
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// Milo
// We're rendering the whole client profile with the customers information, pets and appointments
// So we can display it on the users dashboard and let the client interact with their account, pet and appointment data.

const RenderCustomerProfile = ({ userInfo, pets, appointments }) => {
  // Dummy Data
  const dates = [
    {
      id: 1,
      date: '12-4-2020',
      location: '123 SW Air LN 12345',
      pet: 'Molly',
    },
    {
      id: 2,
      date: '12-5-2020',
      location: '36 Airport Rd',
      pet: 'Rocky',
    },
  ];

  // const pets = [
  //   {
  //     id: 1,
  //     pet_name: 'Rabby',
  //     color: 'Red',
  //     date_of_birth: '2020-11-02',
  //     phone_number: '123456789',
  //     image_url:
  //       'https://i.pinimg.com/originals/29/29/62/292962d64cdc42f9e8295f5ca56ba1ce.jpg',
  //   },
  //   {
  //     id: 2,
  //     pet_name: 'Doggy',
  //     color: 'Beige',
  //     date_of_birth: '2010-11-02',
  //     phone_number: '123456789',
  //     image_url:
  //       'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg',
  //   },
  // ];
  const [displayUserInfoInputs, toggleUserInfoInputs] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [userFormData, setUserFormData] = useState({
    id: null,
    name: null,
    email: null,
  });
  const [currentPetSelected, setCurrentPetSelected] = useState(0);

  useEffect(() => {
    setUserFormData({
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
    });
  }, [userInfo]);

  const onChange = e => {
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
  };

  // Edit User Info Submit Function
  const onSubmit = e => {
    e.preventDefault();
    setUserFormData(userFormData);
  };

  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  return (
    <div>
      {userInfo && (
        <div className="profile-container">
          <Row gutter={[16, 16]}>
            <Col xs={{ span: 24 }} sm={{ span: 8 }} md={{ span: 8 }}>
              {!displayUserInfoInputs ? (
                <CustomerInfo
                  userFormData={userFormData}
                  toggleUserInfoInputs={toggleUserInfoInputs}
                  displayUserInfoInputs={displayUserInfoInputs}
                />
              ) : (
                <CustomerEditInfo
                  userFormData={userFormData}
                  saveChanges={onSubmit}
                  updateForm={onChange}
                  toggleUserInfoInputs={toggleUserInfoInputs}
                  displayUserInfoInputs={displayUserInfoInputs}
                />
              )}
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 16 }}>
              <div className="upcoming-appointments">
                <h2>Upcoming Appointments</h2>
                <div className="upcoming-appointments-content">
                  <Row gutter={[16, 16]}>
                    {appointments.map((appointment, index) => {
                      return (
                        <Col
                          xs={{ span: 24 }}
                          sm={{ span: 24 }}
                          md={{ span: 8 }}
                        >
                          <AppointmentCard
                            key={index}
                            date={convertISODate(appointment.appointment_date)}
                            time={appointment.appointment_time}
                            status={appointment.status}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <div className="pet-container">
            <Row gutter={[16, 16]}>
              {pets.map((pet, index) => (
                <PetCard
                  key={pet.id}
                  showPetModal={showModal1}
                  closePetModal={setIsModalVisible1}
                  pet={pet}
                  petIndex={index}
                  setCurrentPetSelected={setCurrentPetSelected}
                />
              ))}
              <Modal
                title="Pet Info"
                visible={isModalVisible1}
                onOk={handleOk1}
                onCancel={handleCancel1}
              >
                {pets.length && (
                  <>
                    <p>Name: {pets[currentPetSelected].pet_name}</p>
                    {pets[currentPetSelected].color && (
                      <p>Color: {pets[currentPetSelected].color}</p>
                    )}
                    {pets[currentPetSelected].date_of_birth && (
                      <p>
                        DOB:{' '}
                        {convertISODate(pets[currentPetSelected].date_of_birth)}
                      </p>
                    )}
                  </>
                )}
              </Modal>
              <CustomerAddPet />
            </Row>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderCustomerProfile;
