import React, { useState } from "react";
import HeaderFixed from "../components/Layout/HeaderFixed";
import Footer from "../components/Layout/Footer";
import Facility from "../components/shop-style-five/Facility";
import Details from "../components/Detalis";
import CardAddress from "../components/Cards/Address";
import CardsAdd from "../components/Cards/Add";
import { GetServerSideProps } from "next";
import { getAPIClient } from "../services/api";
import { parseCookies } from "nookies";

const Address = () => {
  const [address, setAddress] = useState([
    {
      id: "1",
      nickname: "Casa",
      address: "Rua são gonçalo do abaeté, 540",
      zipcode: "02870-000",
      district: "Parque Tietê",
      city: "São Paulo",
      state: "SP",
      primary: true,
    },
    {
      id: "2",
      nickname: "Recado",
      address: "Rua ari carineiro fernandes, 138",
      zipcode: "02874-000",
      district: "Jardim dos Francos",
      city: "São Paulo",
      state: "SP",
      primary: false,
    },
    {
      id: "3",
      nickname: "Profissional",
      address: "Rua teste, 123",
      zipcode: "01111-222",
      district: "NextJS",
      city: "São Paulo",
      state: "SP",
      primary: false,
    },
    {
      id: "4",
      nickname: "Casa",
      address: "Rua são gonçalo do abaeté, 540",
      zipcode: "02870-000",
      district: "Parque Tietê",
      city: "São Paulo",
      state: "SP",
      primary: false,
    },
    {
      id: "5",
      nickname: "Recado",
      address: "Rua ari carineiro fernandes, 138",
      zipcode: "02874-000",
      district: "Jardim dos Francos",
      city: "São Paulo",
      state: "SP",
      primary: false,
    },
  ]);

  const handleChangePrimary = (id) => {
    const arrayAdress = address;
    arrayAdress.forEach((add) => {
      add.id === id ? (add.primary = true) : (add.primary = false);
    });
    setAddress([...arrayAdress]);
  };

  return (
    <>
      <HeaderFixed />
      <section className="login-area ptb-60">
        <div
          className="container"
          style={{
            marginTop: -35,
          }}
        >
          <h1>Meus endereços</h1>
          <div className="container-order">
            <div className="container-order-options">
              <Details />
            </div>

            <div className="container-order-content">
              {/* <h5>Endereços</h5> */}

              <div className="container-address-content">
                {address.map((add, index) => {
                  return (
                    <div className="card" key={index}>
                      <CardAddress
                        id={add.id}
                        nickname={add.nickname}
                        address={add.address}
                        zipcode={add.zipcode}
                        district={add.district}
                        city={add.city}
                        state={add.state}
                        primary={add.primary}
                        handleChangePrimary={handleChangePrimary}
                      />
                    </div>
                  );
                })}

                <div className="card">
                  <CardsAdd />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Facility />

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { "nextilooks.auth": auth } = parseCookies(ctx);

  if (!auth) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Address;
